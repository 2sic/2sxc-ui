﻿import { TotalPopup } from '../tools/total-popup';
import { UrlParams } from '../tools/url-params';
import { Stats } from '../Stats';
import { Debug, SxcGlobal, SxcGlobalEnvironment } from '..';
import { Insights, Log, SxcVersion } from '../../../core';
import { $2sxcGet } from './sxc-global-get';
import { HttpGlobal } from './http-global';


/**
 * Build a SXC Controller for the page. Should only ever be executed once
 * @internal
 */
export function buildSxcRoot(): SxcGlobal {
    const rootApiV2 = getRootPartsV2();

    const urlManager = new UrlParams();
    const debug = new Debug();
    const stats = new Stats();


    const addOn: Partial<SxcGlobal> = {
        get: $2sxcGet,
        _controllers: {} as any,
        beta: {},
        // 2022-06-01 2dm disabled, believe this is for the old .data
        // _data: {},
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

        // 2022-06-01 2dm removed, don't think this is used anywhere
        // mini-helpers to manage 2sxc parts, a bit like a dependency loader
        // which will optimize to load min/max depending on debug state
        // parts: {
        //     getUrl(url: string, preventUnmin: boolean) {
        //         // let r = url;// (preventUnmin || !debug.load) ? url : url.replace('.min', ''); // use min or not
        //         if (debug.uncache && url.indexOf('sxcver') === -1)
        //             return url + ((url.indexOf('?') === -1) ? '?' : '&') + 'sxcver=' + debug.uncache;
        //         return url;
        //     },
        // },
    };

    const merged = Object.assign($2sxcGet, addOn, rootApiV2) as SxcGlobal;
    merged.log.add('sxc controller built');

    console.log(`$2sxc ${SxcVersion} with insights-logging - see https://r.2sxc.org/insights`)

    return merged;
}

/** @internal */
function getRootPartsV2(): Partial<SxcGlobal> {
    const log = new Log('$2sxc', null, 'building');
    var env = new SxcGlobalEnvironment();
    return {
        sysinfo: {
            version: SxcVersion,
            description: 'The 2sxc Controller - read more about it on docs.2sxc.org',
        },
        env: env,
        http: new HttpGlobal(env),
        log: log,
    };
}
