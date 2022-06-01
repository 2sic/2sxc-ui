import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { TypeTbD } from '../../plumbing';
import { AttrJsonEditContext } from '../html-attribute';
import { ContextOfInstance, ContextOfPage, ContextOfSystem, ContextOfTenant, ContextOfUser } from '../parts';
import { ContextOfApp } from '../parts/context-app';
import { ContextOfUi } from '../parts/context-ui';

/**
 * @internal
 */
export class ContextBundleInstance {
    sxc: SxcEdit; // instance of sxc object
    instance: ContextOfInstance; // information related to the current DNN module, incl.instanceId, etc.
    app: ContextOfApp; // this will be about the current app, settings of the app, app - paths, etc.
    ui: ContextOfUi; // ensure that the UI will load the correct assets to enable editing
    page: ContextOfPage; // this will be information related to the current page
    system: ContextOfSystem; // this will be everything about the current system, like system / api -paths etc.
    tenant: ContextOfTenant; // this will be something about the current tenant(the dnn portal)
    user: ContextOfUser; // things about the user

    _isContext = true;

    constructor(editCtx: AttrJsonEditContext, sxc: SxcEdit) {
        // this will be about the current app, settings of the app, app - paths, etc.
        this.app = new ContextOfApp(editCtx, sxc);

        // information related to the current DNN module, incl.instanceId, etc.
        this.instance = new ContextOfInstance(editCtx, sxc);

        // things about the user
        this.user = new ContextOfUser(editCtx);

        // this will be information related to the current page
        this.page = new ContextOfPage(editCtx, sxc);

        // this will be everything about the current system, like system / api -paths etc.
        this.system = new ContextOfSystem(editCtx);

        // this will be something about the current tenant(the dnn portal)
        this.tenant = new ContextOfTenant(editCtx);

        // ensure that the UI will load the correct assets to enable editing
        this.ui = new ContextOfUi(editCtx);

    }

    static is(thing: TypeTbD): thing is ContextBundleInstance {
        const maybeButton = thing as ContextBundleInstance;
        return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
    }
}
