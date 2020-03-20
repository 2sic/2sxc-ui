﻿import { renderer } from '../../contentBlock/render';
import { ContextBundleButton } from '../../context/bundles/context-bundle-button';
import { ContentListActionParams } from './content-list-action-params';

/**
 * These actions make changes to a content-block - like adding, removing or publishing items in the block
 * @class ActionsCatalog
 */
class ContentListActions {
    /**
     * add an item to the list at this position
     * @param {ContextBundleButton} context
     * @param {number} sortOrder
     */
    addItem<T>(context: ContextBundleButton, sortOrder: number) {
        return getAndReload<T>(context, 'view/module/additem', { sortOrder });
    }

    /**
     * remove an item from a list, then reload
     * @param {ContextBundleButton} context
     * @param {number} sortOrder
     */
    removeFromList(context: ContextBundleButton, sortOrder: number) {
        return getAndReload<void>(context, 'view/module/removefromlist', { sortOrder });
    }

    /**
     * change the order of an item in a list, then reload
     * @param {ContextBundleButton} context
     * @param {number} initOrder
     * @param {number} newOrder
     */
    changeOrder(context: ContextBundleButton, initOrder: number, newOrder: number) {
        return getAndReload<void>(context, 'view/module/changeorder', {
            sortOrder: initOrder,
            destinationSortOrder: newOrder,
        });
    }

    /**
     * set a content-item in this block to published, then reload
     * @param {ContextBundleButton} context
     * @param {string} part
     * @param {number} sortOrder
     */
    publish(context: ContextBundleButton, part: string, sortOrder: number) {
        return getAndReload<void>(context, 'view/module/publish', {
            part: part,
            sortOrder,
        });
    }

    /**
     * publish an item using it's ID
     * @param {ContextBundleButton} context
     * @param {number} entityId
     */
    publishId(context: ContextBundleButton, entityId: number) {
        return getAndReload<void>(context, 'view/module/publish', { id: entityId });
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
 * @param {ContextBundleButton} context
 * @param {string} url
 * @param {ContentListActionParams} params
 * @returns {void | T}
 */
function getAndReload<T>(
    context: ContextBundleButton,
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