﻿import { ModifierContentBlock } from '.';
import { ContentListActionParams } from '../commands';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { HasLog } from '../logging';
import { ToolbarManager } from '../toolbar/toolbar-manager';
// note: this import must be at the end of the list, for reasons unknown
// otherwise you get an error at runtime, something about constructors
// Object prototype may only be an Object or null: undefined
// not sure why though
// tslint:disable-next-line: ordered-imports
import { translate } from '../i18n';
import { $jq } from '../interfaces/sxc-controller-in-page';

//#region WebApi Endpoints used: 2sxc
const webApiNew = 'cms/block/block';
const webApiMove = 'cms/list/move';
const webApiRemove = 'cms/list/Delete';
//#endregion

/** contains commands to create/move/delete a content-block in an inner-content */
export class ModifierContentBlockInstance extends HasLog {

    constructor(parent: ModifierContentBlock, private sxcInstance: SxcEdit) {
        super('QE.MdCbIn', parent.log);
    }

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
        if (container.length === 0) {
            alert('can\'t add content-block as we couldn\'t find the list');
            return Promise.resolve();
        }
        const cblockList = container.find('div.sc-content-block');
        if (index > cblockList.length) index = cblockList.length; // make sure index is never greater than the amount of items

        const params = {
            parentId: parentId,
            field: fieldName,
            sortOrder: index,
            app: appName,
            guid: newGuid,
        };

        const jqPromise = this.sxcInstance.webApi
            .post({ url: webApiNew, params: params })
            .then((result) => {
                const newTag = $jq(result); // prepare tag for inserting

                // should I add it to a specific position...
                if (cblockList.length > 0 && index > 0)
                $jq(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
                    .after(newTag);
                else // ...or just at the beginning?
                    container.prepend(newTag);

                // ReSharper disable once UnusedLocals
                const sxcNew = SxcEdit.get(newTag);
                ToolbarManager.buildModule(newTag);
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
    move(parent: string, field: string, indexFrom: number, indexTo: number): Promise<void> {

        const params: ContentListActionParams = {
            parent: parent,
            fields: field,
            index: indexFrom,
            toIndex: indexTo,
        };

        const jqPromise = this.sxcInstance.webApi
            .post({ url: webApiMove, params: params })
            .then(() => {
                console.log('done moving!');
                window.location.reload();
            });
        return Promise.resolve(jqPromise);
    }


    /**
     * delete a content-block inside a list of content-blocks
     * @param parent
     * @param field
     * @param index
     */
    delete(parent: string, field: string, index: number): Promise<void> {

        if (!confirm(translate('QuickInsertMenu.ConfirmDelete'))) return null;
        const params: ContentListActionParams = {
            parent: parent,
            fields: field,
            index: index,
        };

        const jqPromise = this.sxcInstance.webApi
            .delete({ url: webApiRemove, params: params })
            .then(() => {
                console.log('done deleting!');
                window.location.reload();
            });
        return Promise.resolve(jqPromise);
    }
}
