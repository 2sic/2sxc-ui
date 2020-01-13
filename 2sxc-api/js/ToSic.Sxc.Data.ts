import { SxcInstanceWithInternals } from './ToSic.Sxc.Instance';

declare const $2sxc_jQSuperlight: any;


export class SxcDataWithInternals {
    source: any = undefined;

    // in-streams
    "in": any = {};

    // will hold the default stream (["in"]["Default"].List
    List: any = [];

    constructor(
        private controller: SxcInstanceWithInternals,
    ) {

    }

    // source path defaulting to current page + optional params
    sourceUrl(params?: string): string {
        let url = this.controller.resolveServiceUrl('app-sys/appcontent/GetContentBlockData');
        if (typeof params === 'string') // text like 'id=7'
            url += '&' + params;
        return url;
    }


    // load data via ajax
    load(source?: any) {
        // if source is already the data, set it
        if (source && source.List) {
            // 2017-09-05 2dm: discoverd a call to an inexisting function
            // since this is an old API which is being deprecated, please don't fix unless we get active feedback
            // controller.data.setData(source);
            return this.controller.data;
        } else {
            if (!source)
                source = {};
            if (!source.url)
                source.url = this.controller.data.sourceUrl();
            source.origSuccess = source.success;
            source.success = (data: any) => {

                for (const dataSetName in data) {
                    if (data.hasOwnProperty(dataSetName))
                        if (data[dataSetName].List !== null) {
                            this.controller.data.in[dataSetName] = data[dataSetName];
                            this.controller.data.in[dataSetName].name = dataSetName;
                        }
                }

                if (this.controller.data.in.Default)
                    // 2017-09-05 2dm: previously wrote it to controller.List, but this is almost certainly a mistake
                    // since it's an old API which is being deprecated, we won't fix it
                    this.List = this.in.Default.List;

                if (source.origSuccess)
                    source.origSuccess(this);

                this.controller.isLoaded = true;
                this.controller.lastRefresh = new Date();
                (this as any)._triggerLoaded();
            };
            source.error = (request: any) => { alert(request.statusText); };
            source.preventAutoFail = true; // use our fail message
            this.source = source;
            return this.reload();
        }
    }

    reload(): SxcDataWithInternals {
        this.controller.webApi.get(this.source)
            .then(this.source.success, this.source.error);
        return this;
    }

    on(events: Event, callback: () => void): Promise<any> {
        return $2sxc_jQSuperlight(this).on('2scLoad', callback)[0]._triggerLoaded();
    }

// ReSharper disable once InconsistentNaming
    _triggerLoaded(): Promise<any> {
        return this.controller.isLoaded
            ? $2sxc_jQSuperlight(this).trigger('2scLoad', [this])[0]
            : this;
    }

    one(events: Event, callback: (x: any, y: any) => void): SxcDataWithInternals {
        if (!this.controller.isLoaded)
            return $2sxc_jQSuperlight(this).one('2scLoad', callback)[0];
        callback({}, this);
        return this;
    }
}
