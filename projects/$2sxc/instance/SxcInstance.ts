import * as Public from '../../../typings/index';
import { SxcWebApi } from './SxcWebApi';
import { ToSxcName } from '../constants';
import { SxcRoot } from '../SxcRoot/SxcRoot';
import { HasLog } from '../logging/HasLog';
import { SxcRootInternals } from '../SxcRoot/SxcRootInternals';

const serviceScopes = ['app', 'app-sys', 'app-api', 'app-query', 'app-content', 'eav', 'view', 'dnn'];

/**
 * The typical sxc-instance object for a specific DNN module or content-block
 */
export class SxcInstance extends HasLog implements Public.SxcInstance {
    /**
     * helpers for ajax calls
     */
    webApi: SxcWebApi;

    /**
     * The manage controller for edit/cms actions
     *
     * @type {*}
     * @memberof SxcInstance
     */
    manage: any = null; // initialize correctly later on

    constructor(
        /** the sxc-instance ID, which is usually the DNN Module Id */
        public id: number,
        /** content-block ID, which is either the module ID, or the content-block definitiion entity ID
         * this is an advanced concept you usually don't care about, otherwise you should research it */
        public cbid: number,
        /** The environment information, important for http-calls */
        public readonly root: SxcRoot & SxcRootInternals,
    ) {
        super('SxcInstance', 'Generating for ' + id + ':' + cbid);
        this.webApi = new SxcWebApi(this);

        // add manage property, but not within initializer, because inside the manage-initializer it may reference 2sxc again
        try { // sometimes the manage can't be built, like before installing
        if (root._manage) root._manage.initInstance(this);
        } catch (e) {
            console.error('error in 2sxc - will only log but not throw', e);
        }

        // this only works when manage exists (not installing) and translator exists too
        if (root._translateInit && this.manage) 
            // ensure that we really have a manage context, otherwise we can't initialize i18n and it doesn't make sense
            if(this.manage.context && this.manage.context.app && this.manage.context.app.currentLanguage)
                root._translateInit(this.manage);    // init translate, not really nice, but ok for now
    
    }

    /**
     * converts a short api-call path like "/app/Blog/query/xyz" to the DNN full path
     * which varies from installation to installation like "/desktopmodules/api/2sxc/app/..."
     * @deprecated use http.apiUrl instead
     * @param virtualPath
     * @returns mapped path
     */
    resolveServiceUrl(virtualPath: string) {
        // console.warn('used resolveServiceUrl:' + virtualPath);
        const scope = virtualPath.split('/')[0].toLowerCase();

        // stop if it's not one of our special paths
        if (serviceScopes.indexOf(scope) === -1)
            return virtualPath;

        return this.root.http.apiRoot(ToSxcName) + scope + '/' + virtualPath.substring(virtualPath.indexOf('/') + 1);
    }


    // Show a nice error with more infos around 2sxc
    showDetailedHttpError(result: any): any {
        if (window.console)
            console.log(result);

        // check if the error was just because a language file couldn't be loaded - then don't show a message
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

    /**
     * checks if we're currently in edit mode
     * @returns {boolean}
     */
    isEditMode(): boolean {
        return this.manage && this.manage._isEditMode();
    }
}
