﻿import { renderer } from '../../contentBlock/render';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ContentListActionParams } from './content-list-action-params';

//#region WebApi Endpoints used: 2sxc
const webApiAdd = 'view/module/additem';
const webApiRemoveFromList = 'view/module/removefromlist';
const webApiReorder = 'view/module/changeorder';
const webApiPublish = 'view/module/publish';
//#endregion

/**
 * These actions make changes to a content-block - like adding, removing or publishing items in the block
 * @class ActionsCatalog
 */
class ContentListActions {
    /**
     * add an item to the list at this position
     * @param {ContextComplete} context
     * @param {number} index
     */
    addItem<T>(context: ContextComplete, index: number) {
        return getAndReload<T>(context, webApiAdd , { index });
    }

    /**
     * remove an item from a list, then reload
     * @param {ContextComplete} context
     * @param {number} sortOrder
     */
    removeFromList(context: ContextComplete) {
        const params = context.button.command.params;
        return getAndReload<void>(context, webApiRemoveFromList, {
            index: params.sortOrder,
            parent: params.parent,
            fields: params.fields,
         });
    }

    /**
     * change the order of an item in a list, then reload
     * @param {ContextComplete} context
     * @param {number} index
     * @param {number} toIndex
     */
    changeOrder(context: ContextComplete, index: number, toIndex: number) {
        const params = context.button.command.params;
        return getAndReload<void>(context, webApiReorder, {
            parent: params.parent,
            fields: params.fields,
            index,
            toIndex,
        });
    }

    /**
     * set a content-item in this block to published, then reload
     * @param {ContextComplete} context
     * @param {string} part
     * @param {number} index
     */
    publish(context: ContextComplete, part: string, index: number) {
        return getAndReload<void>(context, webApiPublish, {
            part,
            index,
        });
    }

    /**
     * publish an item using it's ID
     * @param {ContextComplete} context
     * @param {number} entityId
     */
    publishId(context: ContextComplete, entityId: number) {
        return getAndReload<void>(context, webApiPublish, { id: entityId });
    }
}

export const Actions = new ContentListActions();

/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */

/**
 * internal helper, to do something and reload the content block
 * @param {ContextComplete} context
 * @param {string} url
 * @param {ContentListActionParams} params
 * @returns {void | T}
 */
function getAndReload<T>(
    context: ContextComplete,
    url: string,
    params: ContentListActionParams,
): Promise<void | T> {
    return new Promise<T>((resolve, reject) => {
        context.sxc.webApi
            .get({
                url: url,
                params: params,
            })
            .done((data, textStatus: string, jqXHR) => {
                if (jqXHR.status === 204 || jqXHR.status === 200) {
                    // resolve the promise with the response text
                    resolve(data);
                } else {
                    // otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(textStatus));
                }
            })
            .fail((jqXHR, textStatus: string, errorThrown: string) => {
                reject(Error(errorThrown));
            });
    }).then(() => {
        renderer.reloadAndReInitialize(context);
    });
}
