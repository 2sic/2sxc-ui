
import { SxcController, SxcControllerWithInternals } from './ToSic.Sxc.Controller';
import { SxcDataWithInternals } from './ToSic.Sxc.Data';
import { SxcWebApiWithInternals } from './ToSic.Sxc.WebApi';
import { Environment } from './Environment';
/**
 * The typical sxc-instance object for a specific DNN module or content-block
 */
export class SxcInstance {
    /**
     * helpers for ajax calls
     */
    webApi: SxcWebApiWithInternals;
    protected serviceRoot: string;
    private readonly serviceScopes = ['app', 'app-sys', 'app-api', 'app-query', 'app-content', 'eav', 'view', 'dnn'];

    constructor(
        /**
         * the sxc-instance ID, which is usually the DNN Module Id
         */
        public id: number,

        /**
         * content-block ID, which is either the module ID, or the content-block definitiion entity ID
         * this is an advanced concept you usually don't care about, otherwise you should research it
         */
        public cbid: number,
        public readonly env: Environment,
    ) {
        this.serviceRoot = env.apiRoot('2sxc'); // env(id).getServiceRoot('2sxc');
        this.webApi = new SxcWebApiWithInternals(this, id, cbid, this.env);
    }

    /**
     * converts a short api-call path like "/app/Blog/query/xyz" to the DNN full path
     * which varies from installation to installation like "/desktopmodules/api/2sxc/app/..."
     * @param virtualPath
     * @returns mapped path
     */
    resolveServiceUrl(virtualPath: string) {
        const scope = virtualPath.split('/')[0].toLowerCase();

        // stop if it's not one of our special paths
        if (this.serviceScopes.indexOf(scope) === -1)
            return virtualPath;

        return this.serviceRoot + scope + '/' + virtualPath.substring(virtualPath.indexOf('/') + 1);
    }


    // Show a nice error with more infos around 2sxc
    showDetailedHttpError(result: any): any {
        if (window.console)
            console.log(result);

        if (result.status === 404 &&
            result.config &&
            result.config.url &&
            result.config.url.indexOf('/dist/i18n/') > -1) {
            if (window.console)
                console.log('just fyi: failed to load language resource; will have to use default');
            return result;
        }


        // if it's an unspecified 0-error, it's probably not an error but a cancelled request,
        // (happens when closing popups containing angularJS)
        if (result.status === 0 || result.status === -1)
            return result;

        // let's try to show good messages in most cases
        let infoText = 'Had an error talking to the server (status ' + result.status + ').';
        const srvResp = result.responseText
            ? JSON.parse(result.responseText) // for jquery ajax errors
            : result.data; // for angular $http
        if (srvResp) {
            const msg = srvResp.Message;
            if (msg) infoText += '\nMessage: ' + msg;
            const msgDet = srvResp.MessageDetail || srvResp.ExceptionMessage;
            if (msgDet) infoText += '\nDetail: ' + msgDet;


            if (msgDet && msgDet.indexOf('No action was found') === 0)
                if (msgDet.indexOf('that matches the name') > 0)
                    infoText += '\n\nTip from 2sxc: you probably got the action-name wrong in your JS.';
                else if (msgDet.indexOf('that matches the request.') > 0)
                    infoText += '\n\nTip from 2sxc: Seems like the parameters are the wrong amount or type.';

            if (msg && msg.indexOf('Controller') === 0 && msg.indexOf('not found') > 0)
                infoText +=
                    // tslint:disable-next-line:max-line-length
                    "\n\nTip from 2sxc: you probably spelled the controller name wrong or forgot to remove the word 'controller' from the call in JS. To call a controller called 'DemoController' only use 'Demo'.";

        }
        // tslint:disable-next-line:max-line-length
        infoText += '\n\nif you are an advanced user you can learn more about what went wrong - discover how on 2sxc.org/help?tag=debug';
        alert(infoText);

        return result;
    }
}

/**
 * Enhanced sxc instance with additional editing functionality
 * Use this, if you intend to run content-management commands like "edit" from your JS directly
 */
export class SxcInstanceWithEditing extends SxcInstance {
    /**
     * manage object which provides access to additional content-management features
     * it only exists if 2sxc is in edit mode (otherwise the JS are not included for these features)
     */
    manage: any = null; // initialize correctly later on

    constructor(
        public id: number,
        public cbid: number,
// ReSharper disable once InconsistentNaming
        protected $2sxc: SxcControllerWithInternals,
        public readonly env: Environment,
    ) {
        super(id, cbid, env);

        // add manage property, but not within initializer, because inside the manage-initializer it may reference 2sxc again
        try { // sometimes the manage can't be built, like before installing
            if ($2sxc._manage) $2sxc._manage.initInstance(this);
        } catch (e) {
            console.error('error in 2sxc - will only log but not throw', e);
            // throw e;
        }

        // this only works when manage exists (not installing) and translator exists too
        if ($2sxc._translateInit && this.manage) $2sxc._translateInit(this.manage);    // init translate, not really nice, but ok for now

    }

    /**
     * checks if we're currently in edit mode
     * @returns {boolean}
     */
    isEditMode() {
        return this.manage && this.manage._isEditMode();
    }

}

export class SxcInstanceWithInternals extends SxcInstanceWithEditing {
    data: SxcDataWithInternals;
    source: any = null;
    isLoaded = false;
    lastRefresh: Date = null;

    constructor(
        public id: number,
        public cbid: number,
        private cacheKey: string,
        protected $2sxc: SxcControllerWithInternals,
        public readonly env: Environment,
    ) {
        super(id, cbid, $2sxc, env);
        this.data = new SxcDataWithInternals(this);
    }

    recreate(resetCache: boolean): SxcInstanceWithInternals {
        if (resetCache) delete this.$2sxc._controllers[this.cacheKey]; // clear cache
        return this.$2sxc(this.id, this.cbid) as any as SxcInstanceWithInternals; // generate new
    }
}
