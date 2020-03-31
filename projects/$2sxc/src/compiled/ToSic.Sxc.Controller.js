import { SxcInstanceWithInternals } from './ToSic.Sxc.Instance';
import { TotalPopup } from './ToSic.Sxc.TotalPopup';
import { UrlParamManager } from './ToSic.Sxc.Url';
import { Stats } from './Stats';
function SxcController(id, cbid) {
    var $2sxc = window.$2sxc;
    if (!$2sxc._controllers)
        throw new Error('$2sxc not initialized yet');
    if (typeof id === 'object') {
        var idTuple = autoFind(id);
        id = idTuple[0];
        cbid = idTuple[1];
    }
    if (!cbid)
        cbid = id;
    var cacheKey = id + ':' + cbid;
    if ($2sxc._controllers[cacheKey])
        return $2sxc._controllers[cacheKey];
    if (!$2sxc._data[cacheKey])
        $2sxc._data[cacheKey] = {};
    return ($2sxc._controllers[cacheKey]
        = new SxcInstanceWithInternals(id, cbid, cacheKey, $2sxc, $.ServicesFramework));
}
export function buildSxcController() {
    var urlManager = new UrlParamManager();
    var debug = {
        load: (urlManager.get('debug') === 'true'),
        uncache: urlManager.get('sxcver'),
    };
    var stats = new Stats();
    var addOn = {
        _controllers: {},
        sysinfo: {
            version: '09.43.00',
            description: 'The 2sxc Controller object - read more about it on 2sxc.org',
        },
        beta: {},
        _data: {},
        totalPopup: new TotalPopup(),
        urlParams: urlManager,
        debug: debug,
        stats: stats,
        parts: {
            getUrl: function (url, preventUnmin) {
                var r = (preventUnmin || !debug.load) ? url : url.replace('.min', '');
                if (debug.uncache && r.indexOf('sxcver') === -1)
                    r = r + ((r.indexOf('?') === -1) ? '?' : '&') + 'sxcver=' + debug.uncache;
                return r;
            },
        },
    };
    for (var property in addOn)
        if (addOn.hasOwnProperty(property))
            SxcController[property] = addOn[property];
    return SxcController;
}
function autoFind(domElement) {
    var containerTag = $(domElement).closest('.sc-content-block')[0];
    if (!containerTag)
        return null;
    var iid = containerTag.getAttribute('data-cb-instance');
    var cbid = containerTag.getAttribute('data-cb-id');
    if (!iid || !cbid)
        return null;
    return [iid, cbid];
}
//# sourceMappingURL=ToSic.Sxc.Controller.js.map