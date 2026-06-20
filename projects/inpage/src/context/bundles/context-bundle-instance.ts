import { Sxc } from '../../../../$2sxc/src/sxc/sxc';
import { AttrJsonEditContext } from '../html-attribute';
import { ContextOfInstance, ContextOfPage, ContextOfSystem, ContextOfUser, createContextOfInstance, createContextOfPage, createContextOfSystem, createContextOfUser } from '../parts';
import { ContextOfApp, createContextOfApp } from '../parts/context-app';
import { ContextOfUi, createContextOfUi } from '../parts/context-ui';

/**
 * @public
 */
export interface ContextBundleInstance {
  /**
   * instance of sxc object
   */
  sxc: Sxc;

  /** @internal */
  instance: ContextOfInstance; // information related to the current DNN module, incl.instanceId, etc.
  /** @internal */
  app: ContextOfApp; // this will be about the current app, settings of the app, app - paths, etc.
  /** @internal */
  ui: ContextOfUi; // ensure that the UI will load the correct assets to enable editing
  /** @internal */
  page: ContextOfPage; // this will be information related to the current page
  /** @internal */
  system: ContextOfSystem; // this will be everything about the current system, like system / api -paths etc.

  // 2026-06-20 2dm - completely unused since 2020-11-28, so removed. If needed again, can be re-added.
  /** @internal */
  // tenant: ContextOfTenant; // this will be something about the current tenant(the dnn portal)

  /** @internal */
  user: ContextOfUser; // things about the user

  _isContext: true;

  /** @internal */
  // constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
  //   // this will be about the current app, settings of the app, app - paths, etc.
  //   this.app = createContextOfApp(editCtx, sxc);

  //   // information related to the current DNN module, incl.instanceId, etc.
  //   this.instance = createContextOfInstance(editCtx, sxc);

  //   // things about the user
  //   this.user = createContextOfUser(editCtx);

  //   // this will be information related to the current page
  //   this.page = createContextOfPage(editCtx, sxc);

  //   // this will be everything about the current system, like system / api -paths etc.
  //   this.system = createContextOfSystem(editCtx);

  //   // this will be something about the current tenant(the dnn portal)
  //   // this.tenant = new ContextOfTenant(editCtx);

  //   // ensure that the UI will load the correct assets to enable editing
  //   this.ui = createContextOfUi(editCtx);
  // }

  // 2026-06-20 2dm - moved to ContextFactory
  /** @internal */
  // static is(thing: unknown): thing is ContextBundleInstance {
  //   const maybeButton = thing as ContextBundleInstance;
  //   return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
  // }
}

/** @internal */
export function createContextBundleInstance(editCtx: AttrJsonEditContext, sxc: Sxc): ContextBundleInstance {
    const result = {
      // special marker
      _isContext: true,
      // 2026-06-20 2dm adding to here, previously it was added a few layers up
      sxc: sxc,

      // this will be about the current app, settings of the app, app - paths, etc.
      app: createContextOfApp(editCtx, sxc),
  
      // information related to the current DNN module, incl.instanceId, etc.
      instance: createContextOfInstance(editCtx, sxc),
  
      // things about the user
      user: createContextOfUser(editCtx),
  
      // this will be information related to the current page
      page: createContextOfPage(editCtx, sxc),
  
      // this will be everything about the current system, like system / api -paths etc.
      system: createContextOfSystem(editCtx),
  
      // this will be something about the current tenant(the dnn portal)
      // tenant: new ContextOfTenant(editCtx),
  
      // ensure that the UI will load the correct assets to enable editing
      ui: createContextOfUi(editCtx),
    } as unknown as ContextBundleInstance;
    return result; // new ContextBundleInstance(editCtx, sxc);
}

/** @internal */
export function isContextBundleInstance(thing: unknown): thing is ContextBundleInstance {
    const maybeButton = thing as ContextBundleInstance;
    return maybeButton.sxc !== undefined && maybeButton.instance !== undefined;
}