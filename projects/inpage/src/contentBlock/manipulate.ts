import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { getSxc } from '../plumbing';
import { _toolbarManager } from '../toolbar/toolbar-manager';
import { translate } from '../translate/2sxc.translate';
import { ManipulateParams } from './manipulate-params';

/** contains commands to create/move/delete a contentBlock in a page */
export class Manipulator {

    constructor(private sxcInstance: SxcIntanceEditable) {}

  /**
   * create content block
   * @param parentId
   * @param fieldName
   * @param index
   * @param appName
   * @param container
   * @param newGuid
   */
  create(parentId: number,
         fieldName: string,
         index: number,
         appName: string,
         container: JQuery,
         newGuid: string): Promise<void> {
    // the wrapper, into which this will be placed and the list of pre-existing blocks
    const listTag = container;
    if (listTag.length === 0) {
        alert('can\'t add content-block as we couldn\'t find the list');
        return Promise.resolve();
    }
    const cblockList = listTag.find('div.sc-content-block');
    if (index > cblockList.length) index = cblockList.length; // make sure index is never greater than the amount of items

    const params: ManipulateParams = {
      parentId: parentId,
      field: fieldName,
      sortOrder: index,
      app: appName,
      guid: newGuid,
    };

    const jqPromise = this.sxcInstance.webApi.get({ url: 'view/module/generatecontentblock', params: params })
      .then((result) => {
        const newTag = $(result); // prepare tag for inserting

        // should I add it to a specific position...
        if (cblockList.length > 0 && index > 0)
          $(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
            .after(newTag);
        else // ...or just at the beginning?
          listTag.prepend(newTag);

        // ReSharper disable once UnusedLocals
        const sxcNew = getSxc(newTag);
        _toolbarManager.buildToolbars(newTag);
      });
    return Promise.resolve(jqPromise);
  }

  /**
   * move content block
   * @param parentId
   * @param field
   * @param indexFrom
   * @param indexTo
   */
  move(parentId: number, field: string, indexFrom: number, indexTo: number): Promise<void> {

    const params: ManipulateParams = {
      parentId: parentId,
      field: field,
      indexFrom: indexFrom,
      indexTo: indexTo,
    };

    const jqPromise = this.sxcInstance.webApi.get({ url: 'view/module/moveiteminlist', params: params })
      .then(() => {
        console.log('done moving!');
        window.location.reload();
      });
    return Promise.resolve(jqPromise);
  }


  /**
   * delete a content-block inside a list of content-blocks
   * @param parentId
   * @param field
   * @param index
   */
  delete(parentId: number, field: string, index: number): Promise<void> {

    if (!confirm(translate('QuickInsertMenu.ConfirmDelete'))) return null;

    const params: ManipulateParams = {
      parentId: parentId,
      field: field,
      index: index,
    };

    const jqPromise = this.sxcInstance.webApi.get({ url: 'view/module/RemoveItemInList', params: params })
      .then(() => {
        console.log('done deleting!');
        window.location.reload();
      });
    return Promise.resolve(jqPromise);
  }
}

// export function manipulator(sxc: SxcIntanceEditable): Manipulator {
// //   sxcInstance = sxc;
//   return new Manipulator(sxc);
// }
