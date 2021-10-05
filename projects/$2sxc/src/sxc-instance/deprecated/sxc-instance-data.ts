import { SxcInstanceWithInternals } from '..';
import { Window } from '../..';

declare const window: Window;

/**
 * This is a old 2sxc concept from 2sxc ca. V3
 * The idea was that each module could have it's own data and access it.
 * It would hide the internals of WebApis and just provide data. 
 * This model isn't promoted or much in use any more, but included for compatibility
 */
export class SxcInstanceDataDeprecated {
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
        let url = this.controller.root.http.apiUrl('app/auto/InstanceData');
        if (typeof params === 'string') // text like 'id=7'
            url += '&' + params;
        return url;
    }


    // load data via ajax
    load(source?: any) {
        // if source is already the data, set it
        if (source && source.List) {
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
                    this.List = this.in.Default.List;

                if (source.origSuccess)
                    source.origSuccess(this);

                this.controller.isLoaded = true;
                this.controller.lastRefresh = new Date();
                this._triggerLoaded();
            };
            source.error = (request: any) => { alert(request.statusText); };
            source.preventAutoFail = true; // use our fail message
            this.source = source;
            return this.reload();
        }
    }

    reload(): SxcInstanceDataDeprecated {
        this.controller.webApi.get(this.source)
            .then(this.source.success, this.source.error);
        return this;
    }

    on(events: Event, callback: () => void): Promise<any> {
        // debugger; // probably never used. Types are broken
        return (window.$2sxc_jQSuperlight(this) as any).on('2scLoad', callback)[0]._triggerLoaded();
    }

    // ReSharper disable once InconsistentNaming
    _triggerLoaded(): Promise<any> {
        // debugger; // probably never used. Types are broken
        return this.controller.isLoaded
            ? (window.$2sxc_jQSuperlight(this) as any).trigger('2scLoad', [this])[0]
            : this;
    }

    one(events: Event, callback: (x: any, y: any) => void): SxcInstanceDataDeprecated {
        // debugger; // probably never used. Types are broken
        if (!this.controller.isLoaded)
            return (window.$2sxc_jQSuperlight(this) as any).one('2scLoad', callback)[0];
        callback({}, this);
        return this;
    }
}
