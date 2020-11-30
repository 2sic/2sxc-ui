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

        if (!this.id && sxc?.ctx?.moduleId)
            this.id = sxc.ctx.moduleId;

        if (editCtx.ContentBlock)
            this.allowPublish = editCtx.ContentBlock.VersioningRequirements === C.IDs.publishAllowed;
    }
}
