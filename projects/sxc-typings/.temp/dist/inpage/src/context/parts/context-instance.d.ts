import { Sxc } from '../../../../$2sxc/src';
import { AttrJsonEditContext } from '../html-attribute';
import { AttrJsonEntity } from '../html-attribute/parts/parameters-entity';
/**
 * information related to the current DNN module, incl.instanceId,
 * @internal
 */
export declare class ContextOfInstance {
    id: number;
    isEditable: boolean;
    allowPublish: boolean;
    sxcVersion: string;
    parameters: AttrJsonEntity[] | null;
    sxcRootUrl: string;
    constructor(editCtx: AttrJsonEditContext, sxc: Sxc);
}
