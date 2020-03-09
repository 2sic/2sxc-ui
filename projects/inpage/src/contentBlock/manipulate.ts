import { _toolbarManager } from '../toolbar/toolbar-manager';
import { translate } from '../translate/2sxc.translate';
import { getSxcInstance } from '../x-bootstrap/sxc';
import { ManipulateParams } from './manipulate-params';

/** contains commands to create/move/delete a contentBlock in a page */
let sxcInstance: SxcInstanceWithInternals;

/**
 * create content block
 * @param parentId
 * @param fieldName
 * @param index
 * @param appName
 * @param container
 * @param newGuid
 */
function create(parentId: number,
                fieldName: string,
                index: number,
                appName: string,
                container: any,
                newGuid: string): any {
  // the wrapper, into which this will be placed and the list of pre-existing blocks
  const listTag = container;
  if (listTag.length === 0) return alert('can\'t add content-block as we couldn\'t find the list');
  const cblockList = listTag.find('div.sc-content-block');
  if (index > cblockList.length) index = cblockList.length; // make sure index is never greater than the amount of items

  const params: ManipulateParams = {
    parentId: parentId,
    field: fieldName,
    sortOrder: index,
    app: appName,
    guid: newGuid,
  };

  return sxcInstance.webApi.get({ url: 'view/module/generatecontentblock', params: params })
    .then((result: any) => {
      const newTag = $(result); // prepare tag for inserting

      // should I add it to a specific position...
      if (cblockList.length > 0 && index > 0)
        $(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
          .after(newTag);
      else // ...or just at the beginning?
        listTag.prepend(newTag);

      // ReSharper disable once UnusedLocals
      const sxcNew = getSxcInstance(newTag);
      _toolbarManager.buildToolbars(newTag);
    });
}

/**
 * move content block
 * @param parentId
 * @param field
 * @param indexFrom
 * @param indexTo
 */
function move(parentId: number, field: string, indexFrom: number, indexTo: number): any {

  const params: ManipulateParams = {
    parentId: parentId,
    field: field,
    indexFrom: indexFrom,
    indexTo: indexTo,
  };

  return sxcInstance.webApi.get({ url: 'view/module/moveiteminlist', params: params })
    .then(() => {
      console.log('done moving!');
      window.location.reload();
    });
}

/**
 * delete a content-block inside a list of content-blocks
 * @param parentId
 * @param field
 * @param index
 */
function remove(parentId: number, field: string, index: number): any {

  if (!confirm(translate('QuickInsertMenu.ConfirmDelete'))) return null;

  const params: ManipulateParams = {
    parentId: parentId,
    field: field,
    index: index,
  };

  return sxcInstance.webApi.get({ url: 'view/module/RemoveItemInList', params: params })
    .then(() => {
      console.log('done deleting!');
      window.location.reload();
    });
}

export class Manipulator {
  create = create;
  move = move;
  delete = remove;
}

export function manipulator(sxc: SxcInstanceWithInternals): Manipulator {
  sxcInstance = sxc;
  return new Manipulator();
}
