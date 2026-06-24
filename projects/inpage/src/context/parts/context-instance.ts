import { Sxc } from '../../../../$2sxc/src/sxc/sxc';
import { SxcVersion } from '../../../../core';
import { C } from '../../constants';
import { AttrJsonEditContext } from '../html-attribute';
import { AttrJsonEntity } from '../html-attribute/parts/parameters-entity';

/**
 * information related to the current DNN module, incl.instanceId,
 * @internal
 */
export interface ContextOfInstance {
    id: number; // instance id (aka moduleId)
    isEditable: boolean;
    allowPublish: boolean; // default true;
    // sxc
    sxcVersion: string;
    parameters: AttrJsonEntity[] | null;
    sxcRootUrl: string;

    // constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
    //     if (editCtx.Environment) {
    //         this.id = editCtx.Environment.InstanceId;
    //         this.isEditable = editCtx.Environment.IsEditable ?? false;
    //         // sxc
    //         this.sxcVersion = editCtx.Environment.SxcVersion ?? SxcVersion;
    //         this.parameters = editCtx.Environment.parameters;
    //         this.sxcRootUrl = editCtx.Environment.SxcRootUrl ?? '';
    //     }

    //     if (!this.id)
    //         // if the module isn't known, check the additional context.
    //         // Otherwise give it a real number but an obvious fallback
    //         // This is for integration into other systems which don't need a module-id
    //         this.id = sxc?.ctx?.moduleId ?? -2742;

    //     if (editCtx.contentBlockReference)
    //         this.allowPublish = editCtx.contentBlockReference.publishingMode === C.IDs.publishAllowed;
    // }
}

    export function createContextOfInstance(editCtx: AttrJsonEditContext, sxc: Sxc): ContextOfInstance {
        const env = editCtx.Environment;
        const cbr = editCtx.contentBlockReference;
        const instance: ContextOfInstance = {
            // if the module isn't known, check the additional context.
            // Otherwise give it a real number but an obvious fallback
            // This is for integration into other systems which don't need a module-id
            id: env?.InstanceId || (sxc?.ctx?.moduleId ?? -2742),
            isEditable: env?.IsEditable ?? false,
            // sxc
            sxcVersion: env?.SxcVersion ?? SxcVersion,
            parameters: env?.parameters ?? null,
            sxcRootUrl: env?.SxcRootUrl ?? '',

            allowPublish: cbr ? cbr.publishingMode === C.IDs.publishAllowed : true,
        };
        return instance;
    }
