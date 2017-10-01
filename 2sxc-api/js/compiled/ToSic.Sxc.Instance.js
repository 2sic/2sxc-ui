var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { SxcDataWithInternals } from "./ToSic.Sxc.Data";
import { SxcWebApiWithInternals } from "./ToSic.Sxc.WebApi";
var SxcInstance = (function () {
    function SxcInstance(id, cbid, dnnSf) {
        this.id = id;
        this.cbid = cbid;
        this.dnnSf = dnnSf;
        this.serviceScopes = ["app", "app-sys", "app-api", "app-query", "app-content", "eav", "view", "dnn"];
        this.serviceRoot = dnnSf(id).getServiceRoot("2sxc");
        this.webApi = new SxcWebApiWithInternals(this, id, cbid);
    }
    SxcInstance.prototype.resolveServiceUrl = function (virtualPath) {
        var scope = virtualPath.split("/")[0].toLowerCase();
        if (this.serviceScopes.indexOf(scope) === -1)
            return virtualPath;
        return this.serviceRoot + scope + "/" + virtualPath.substring(virtualPath.indexOf("/") + 1);
    };
    SxcInstance.prototype.showDetailedHttpError = function (result) {
        if (window.console)
            console.log(result);
        if (result.status === 404 &&
            result.config &&
            result.config.url &&
            result.config.url.indexOf("/dist/i18n/") > -1) {
            if (window.console)
                console.log("just fyi: failed to load language resource; will have to use default");
            return result;
        }
        if (result.status === 0 || result.status === -1)
            return result;
        var infoText = "Had an error talking to the server (status " + result.status + ").";
        var srvResp = result.responseText
            ? JSON.parse(result.responseText)
            : result.data;
        if (srvResp) {
            var msg = srvResp.Message;
            if (msg)
                infoText += "\nMessage: " + msg;
            var msgDet = srvResp.MessageDetail || srvResp.ExceptionMessage;
            if (msgDet)
                infoText += "\nDetail: " + msgDet;
            if (msgDet && msgDet.indexOf("No action was found") === 0)
                if (msgDet.indexOf("that matches the name") > 0)
                    infoText += "\n\nTip from 2sxc: you probably got the action-name wrong in your JS.";
                else if (msgDet.indexOf("that matches the request.") > 0)
                    infoText += "\n\nTip from 2sxc: Seems like the parameters are the wrong amount or type.";
            if (msg && msg.indexOf("Controller") === 0 && msg.indexOf("not found") > 0)
                infoText +=
                    "\n\nTip from 2sxc: you probably spelled the controller name wrong or forgot to remove the word 'controller' from the call in JS. To call a controller called 'DemoController' only use 'Demo'.";
        }
        infoText += "\n\nif you are an advanced user you can learn more about what went wrong - discover how on 2sxc.org/help?tag=debug";
        alert(infoText);
        return result;
    };
    return SxcInstance;
}());
export { SxcInstance };
var SxcInstanceWithEditing = (function (_super) {
    __extends(SxcInstanceWithEditing, _super);
    function SxcInstanceWithEditing(id, cbid, $2sxc, dnnSf) {
        var _this = _super.call(this, id, cbid, dnnSf) || this;
        _this.id = id;
        _this.cbid = cbid;
        _this.$2sxc = $2sxc;
        _this.dnnSf = dnnSf;
        _this.manage = null;
        try {
            if ($2sxc._manage)
                $2sxc._manage.initInstance(_this);
        }
        catch (e) {
            console.error('error in 2sxc - will only log but not throw', e);
        }
        if ($2sxc._translateInit && _this.manage)
            $2sxc._translateInit(_this.manage);
        return _this;
    }
    SxcInstanceWithEditing.prototype.isEditMode = function () {
        return this.manage && this.manage._isEditMode();
    };
    return SxcInstanceWithEditing;
}(SxcInstance));
export { SxcInstanceWithEditing };
var SxcInstanceWithInternals = (function (_super) {
    __extends(SxcInstanceWithInternals, _super);
    function SxcInstanceWithInternals(id, cbid, cacheKey, $2sxc, dnnSf) {
        var _this = _super.call(this, id, cbid, $2sxc, dnnSf) || this;
        _this.id = id;
        _this.cbid = cbid;
        _this.cacheKey = cacheKey;
        _this.$2sxc = $2sxc;
        _this.dnnSf = dnnSf;
        _this.source = null;
        _this.isLoaded = false;
        _this.lastRefresh = null;
        _this.data = new SxcDataWithInternals(_this);
        return _this;
    }
    SxcInstanceWithInternals.prototype.recreate = function (resetCache) {
        if (resetCache)
            delete this.$2sxc._controllers[this.cacheKey];
        return this.$2sxc(this.id, this.cbid);
    };
    return SxcInstanceWithInternals;
}(SxcInstanceWithEditing));
export { SxcInstanceWithInternals };
//# sourceMappingURL=ToSic.Sxc.Instance.js.map