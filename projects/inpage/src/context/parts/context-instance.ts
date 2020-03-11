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
}
