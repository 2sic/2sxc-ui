import { ContentBlock, ContentBlockIds } from './content-block';
import { Debug } from './debug';
import { DialogPaths } from './dialog-paths';
import { IDs } from './ids';
import { ToolbarConstants } from './toolbar';

/**
 * Attribute Names used in the HTML
 */
const Attributes = {
  InstanceId: 'data-cb-instance',
  Context: 'data-edit-context',
  ContentBlockId: 'data-cb-id',
};

/**
 * @internal
 */
export const C = {
  ContentBlock: ContentBlock,
  DialogPaths: DialogPaths,
  IDs: IDs,
  AttrNames: Attributes,
  ClsNames: {
    UnInitialized: 'sc-uninitialized',
    UnAvailable: 'sc-unavailable',
  },
  Toolbar: ToolbarConstants,
  Cb: ContentBlockIds,
  Debug: Debug,
  Sel: {
    SxcDivs: `div[${Attributes.Context}]`,
  },
};
