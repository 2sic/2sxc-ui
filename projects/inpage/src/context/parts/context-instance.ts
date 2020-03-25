import { IDs } from '../../settings/2sxc.consts';
import { AttrJsonEditContext } from '../html-attribute';
import { AttrJsonEntity } from '../html-attribute/parts/parameters-entity';

/**
 * information related to the current DNN module, incl.instanceId,
 */
export class ContextOfInstance {
    id: number; // instance id (aka moduleId)
    isEditable: boolean;
    allowPublish: boolean;
    // sxc
    sxcVersion: string;
    parameters: AttrJsonEntity[] | null;
    sxcRootUrl: string;

    constructor(editCtx: AttrJsonEditContext) {
        if (editCtx.Environment) {
            this.id = editCtx.Environment.InstanceId;
            this.isEditable = editCtx.Environment.IsEditable;
            // sxc
            this.sxcVersion = editCtx.Environment.SxcVersion;
            this.parameters = editCtx.Environment.parameters;
            this.sxcRootUrl = editCtx.Environment.SxcRootUrl;
        }
        if (editCtx.ContentBlock) {
            this.allowPublish = editCtx.ContentBlock.VersioningRequirements === IDs.publishAllowed;
        }
    }
}
