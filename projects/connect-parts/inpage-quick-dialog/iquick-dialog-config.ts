//
// Note: this interface is copied/shared between this and angular quick-edit
//

import { IContextOfUser } from './icontext-of-user';

/**
 * configuration for quick-dialog, so it can adjust the UI
 */
export interface IQuickDialogConfig {
  appId: number;
  isContent: boolean;
  isInnerContent: boolean;
  hasContent: boolean;
  isList: boolean;
  templateId: number;
  contentTypeId: string;
  user: IContextOfUser; // not part of the interface, which is shared to the angular project
  supportsAjax: boolean;
  debug: boolean;
}
