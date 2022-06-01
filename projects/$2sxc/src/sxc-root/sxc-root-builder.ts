import { TotalPopup } from '../tools/total-popup';
import { UrlParams } from '../tools/url-param-manager';
import { Stats } from '../Stats';
import { Debug, $2sxcGlobal, Environment, SxcHttp } from '..';
import { Insights, Log, SxcVersion } from '../../../core';
import { $2sxcGet } from './$2sxc-get';


/**
 * Build a SXC Controller for the page. Should only ever be executed once
 * @internal
 */
export function buildSxcRoot(): $2sxcGlobal {
    const rootApiV2 = getRootPartsV2();

    const urlManager = new UrlParams();
    const debug = new Debug();
    //  {
    //     load: (urlManager.get('debug') === 'true'),
    //     uncache: urlManager.get('sxcver'),
    // };
    const stats = new Stats();


    const addOn: Partial<$2sxcGlobal> = {
        get: $2sxcGet,
        _controllers: {} as any,
        beta: {},
        _data: {},
        // this creates a full-screen iframe-popup and provides a close-command to finish the dialog as needed
        totalPopup: new TotalPopup(),
        urlParams: urlManager,
        // note: I would like to remove this from $2sxc, but it's currently
        // used both in the inpage-edit and in the dialogs
        // debug state which is needed in various places
        debug,
        stats: stats,
        insights: (partName: string, index?: number, start?: number, length?: number) => Insights.show(partName, index, start, length),
        _insights: Insights,
        // mini-helpers to manage 2sxc parts, a bit like a dependency loader
        // which will optimize to load min/max depending on debug state
        parts: {
            getUrl(url: string, preventUnmin: boolean) {
                // let r = url;// (preventUnmin || !debug.load) ? url : url.replace('.min', ''); // use min or not
                if (debug.uncache && url.indexOf('sxcver') === -1)
                    return url + ((url.indexOf('?') === -1) ? '?' : '&') + 'sxcver=' + debug.uncache;
                return url;
            },
        },
    };

    const merged = Object.assign($2sxcGet, addOn, rootApiV2) as $2sxcGlobal;
    merged.log.add('sxc controller built');

    console.log(`$2sxc ${SxcVersion} with insights-logging - see https://r.2sxc.org/insights`)

    return merged;
}

/** @internal */
function getRootPartsV2(): Partial<$2sxcGlobal> {
    const log = new Log('$2sxc', null, 'building');
    var env = new Environment();
    return {
        sysinfo: {
            version: SxcVersion,
            description: 'The 2sxc Controller - read more about it on docs.2sxc.org',
        },
        env: env,
        http: new SxcHttp(env),
        log: log,
    };
}
