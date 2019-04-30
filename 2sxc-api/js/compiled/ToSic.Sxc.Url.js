var UrlParamManager = (function () {
    function UrlParamManager() {
    }
    UrlParamManager.prototype.get = function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var searchRx = new RegExp('[\\?&]' + name + '=([^&#]*)', 'i');
        var results = searchRx.exec(location.search);
        var strResult;
        if (results === null) {
            var hashRx = new RegExp('[#&]' + name + '=([^&#]*)', 'i');
            results = hashRx.exec(location.hash);
        }
        if (results === null) {
            var matches = window.location.pathname.match(new RegExp('/' + name + '/([^/]+)', 'i'));
            if (matches && matches.length > 1)
                strResult = matches.reverse()[0];
        }
        else
            strResult = results[1];
        return strResult === null || strResult === undefined
            ? ''
            : decodeURIComponent(strResult.replace(/\+/g, ' '));
    };
    UrlParamManager.prototype.require = function (name) {
        var found = this.get(name);
        if (found === '') {
            var message = "Required parameter (" + name + ") missing from url - cannot continue";
            alert(message);
            throw message;
        }
        return found;
    };
    return UrlParamManager;
}());
export { UrlParamManager };
//# sourceMappingURL=ToSic.Sxc.Url.js.map