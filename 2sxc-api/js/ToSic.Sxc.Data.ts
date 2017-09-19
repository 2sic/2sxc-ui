
module ToSic.Sxc {

    export class SxcDataWithInternals {
        source: any = undefined;

        // in-streams
        "in": any = {};

        // Will hold the default stream (["in"]["Default"].List
        List: any = [];

        constructor(
            private controller: SxcInstanceWithInternals
        ) {

        }

        // source path defaulting to current page + optional params
        sourceUrl(params?: string): string {
            let url = this.controller.resolveServiceUrl("app-sys/appcontent/GetContentBlockData");
            if (typeof params == "string") // text like 'id=7'
                url += "&" + params;
            return url;
        }


        // Load data via ajax
        load(source?: any) {
            // If source is already the data, set it
            if (source && source.List) {
                // 2017-09-05 2dm: discoverd a call to an inexisting function
                // since this is an old API which is being deprecated, please don't fix unless we get active feedback
                //controller.data.setData(source);
                return this.controller.data;
            } else {
                if (!source)
                    source = {};
                if (!source.url)
                    source.url = this.controller.data.sourceUrl();
                source.origSuccess = source.success;
                source.success = data => {

                    for (let dataSetName in data) {
                        if (data.hasOwnProperty(dataSetName))
                            if (data[dataSetName].List !== null) {
                                this.controller.data["in"][dataSetName] = data[dataSetName];
                                this.controller.data["in"][dataSetName].name = dataSetName;
                            }
                    }

                    if (this.controller.data["in"].Default)
                        // 2017-09-05 2dm: previously wrote it to controller.List, but this is almost certainly a mistake
                        // since it's an old API which is being deprecated, we won't fix it
                        this.List = this["in"].Default.List;

                    if (source.origSuccess)
                        source.origSuccess(this);

                    this.controller.isLoaded = true;
                    this.controller.lastRefresh = new Date();
                    (<any>this)._triggerLoaded();
                };
                source.error = request => { alert(request.statusText); };
                source.preventAutoFail = true; // use our fail message
                this.source = source;
                return this.reload();
            }
        }

        reload() {
            this.controller.webApi.get(this.source)
                .then(this.source.success, this.source.error);
            return this;

        }

        on(events, callback) {
            return $(this).bind("2scLoad", callback)[0]._triggerLoaded();
        }

        _triggerLoaded() {
            return this.controller.isLoaded
                ? $(this).trigger("2scLoad", [this])[0]
                : this;
        }

        one(events, callback) {
            if (!this.controller.isLoaded)
                return $(this).one("2scLoad", callback)[0];
            callback({}, this);
            return this;
        }
    }



}