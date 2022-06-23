import { Sxc } from '../../../../$2sxc/src';
import { AttrJsonEditContext } from '../html-attribute';
import { ContextOfInstance, ContextOfPage, ContextOfSystem, ContextOfTenant, ContextOfUser } from '../parts';
import { ContextOfApp } from '../parts/context-app';
import { ContextOfUi } from '../parts/context-ui';
/**
 * @internal
 */
export declare class ContextBundleInstance {
    sxc: Sxc;
    instance: ContextOfInstance;
    app: ContextOfApp;
    ui: ContextOfUi;
    page: ContextOfPage;
    system: ContextOfSystem;
    tenant: ContextOfTenant;
    user: ContextOfUser;
    _isContext: boolean;
    constructor(editCtx: AttrJsonEditContext, sxc: Sxc);
    static is(thing: unknown): thing is ContextBundleInstance;
}
