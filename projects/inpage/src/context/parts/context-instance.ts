import { SxcVersion } from '../../../../core';
import { C } from '../../constants';
import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { AttrJsonEditContext } from '../html-attribute';
import { AttrJsonEntity } from '../html-attribute/parts/parameters-entity';

/**
 * information related to the current DNN module, incl.instanceId,
 */
export class ContextOfInstance {
    id: number; // instance id (aka moduleId)
    isEditable: boolean = false;
    allowPublish: boolean = true;
    // sxc
    sxcVersion: string = SxcVersion;
    parameters: AttrJsonEntity[] | null = null;
    sxcRootUrl: string = '';

    constructor(editCtx: AttrJsonEditContext, sxc: SxcEdit) {
        if (editCtx.Environment) {
            this.id = editCtx.Environment.InstanceId;
            this.isEditable = editCtx.Environment.IsEditable ?? false;
            // sxc
            this.sxcVersion = editCtx.Environment.SxcVersion ?? SxcVersion;
            this.parameters = editCtx.Environment.parameters;
            this.sxcRootUrl = editCtx.Environment.SxcRootUrl ?? '';
        }

        if (!this.id)
            // if the module isn't known, check the additional context.
            // Otherwise give it a real number but an obvious fallback
            // This is for integration into other systems which don't need a module-id
            this.id = sxc?.ctx?.moduleId ?? -2742;

        if (editCtx.contentBlockReference)
            this.allowPublish = editCtx.contentBlockReference.publishingMode === C.IDs.publishAllowed;
    }
}
