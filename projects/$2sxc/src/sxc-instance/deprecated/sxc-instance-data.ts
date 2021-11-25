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
        // debugger; // this part of the code probably never runs and has other stuff here that depends on jquery
        this.controller.webApi.get(this.source)
            .then(this.source.success, this.source.error);
        return this;
    }

    on(event: string, callback: () => void): SxcInstanceDataDeprecated {
        // debugger;
        // this is a hack to attach 2scLoad event listener to SxcInstanceDataDeprecated (not HTMLElement)
        // and run callback when SxcInstanceDataDeprecated.load() runs
        // dates since beginning of time:
        // https://github.com/2sic/2sxc-ui/blob/e98383f8cf06cd973cf28fa37dc6332af80e9a51/Js/2sxc.api.js
        return (window.$(this).on('2scLoad', callback)[0] as unknown as SxcInstanceDataDeprecated)._triggerLoaded();
    }

    // ReSharper disable once InconsistentNaming
    _triggerLoaded(): SxcInstanceDataDeprecated {
        // debugger;
        // this is a hack to trigger 2scLoad event on SxcInstanceDataDeprecated (not HTMLElement)
        // when SxcInstanceDataDeprecated.load() runs
        // dates since beginning of time:
        // https://github.com/2sic/2sxc-ui/blob/e98383f8cf06cd973cf28fa37dc6332af80e9a51/Js/2sxc.api.js
        return this.controller.isLoaded
            ? window.$(this).trigger('2scLoad', [this])[0] as unknown as SxcInstanceDataDeprecated
            : this;
    }

    one(event: string, callback: (x: any, y: any) => void): SxcInstanceDataDeprecated {
        // debugger;
        // this basically just runs callback if controller is loaded. Really complicated looking line below doesn't do anything.
        // It probably attached 2scLoad event listener with .on, not .one, a long time ago, but oldest github version is from 2014 and it was already broken there:
        // https://github.com/2sic/2sxc-ui/blob/e98383f8cf06cd973cf28fa37dc6332af80e9a51/Js/2sxc.api.js
        if (!this.controller.isLoaded)
            return (window.$(this) as JQuery & { one: (event: string, callback: (x: any, y: any) => void) => JQuery }).one('2scLoad', callback)[0] as unknown as SxcInstanceDataDeprecated;
        callback({}, this);
        return this;
    }
}
