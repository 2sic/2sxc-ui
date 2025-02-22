﻿import { CmdParHlp } from '..';
import { renderer } from '../../contentBlock/render';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ContentListActionParams } from './content-list-action-params';

//#region WebApi Endpoints used: 2sxc
const webApiAdd = 'cms/block/item';
const webApiRemoveFromList = 'cms/list/delete';
const webApiReorder = 'cms/list/move';
const webApiItemPublish = 'cms/edit/publish';
const webApiBlockPublish = 'cms/block/publish';
//#endregion

/**
 * These actions make changes to a content-block - like adding, removing or publishing items in the block
 * @internal
 */
class ContentListActions {
  /**
   * add an item to the list at this position
   * @param {ContextComplete} context
   * @param {number} index
   */
  addItem<T>(context: ContextComplete, index: number) {
    return doAndReload<T>(context, webApiAdd, { index }, 'post');
  }

  /**
   * remove an item from a list, then reload
   */
  removeFromList(context: ContextComplete) {
    const params = context.button.command.params;
    return doAndReload<void>(context, webApiRemoveFromList, {
      index: CmdParHlp.getIndex(params),
      parent: params.parent,
      fields: params.fields,
    }, 'delete');
  }

  /**
   * change the order of an item in a list, then reload
   */
  changeOrder(context: ContextComplete, index: number, toIndex: number) {
    const params = context.button.command.params;
    return doAndReload<void>(context, webApiReorder, {
      parent: params.parent,
      fields: params.fields,
      index,
      toIndex,
    }, 'post');
  }

  /**
   * set a content-item in this block to published, then reload
   */
  publish(context: ContextComplete, part: string, index: number) {
    return doAndReload<void>(context, webApiBlockPublish, {
      part,
      index,
    }, 'post');
  }

  /**
   * publish an item using it's ID
   */
  publishId(context: ContextComplete, entityId: number) {
    return doAndReload<void>(context, webApiItemPublish,
      { id: entityId },
      'post');
    }
}

/**
 * @internal
 */
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
 */
function doAndReload<T>(
  context: ContextComplete,
  url: string,
  params: ContentListActionParams,
  verb: 'get' | 'post' | 'delete' = 'get',
): Promise<void | T> {
  return (verb === 'post'
    ? context.sxc.webApi.fetchRaw(context.sxc.webApi.url(url, params), null, 'POST')
    : verb === 'delete'
      ? context.sxc.webApi.fetchRaw(context.sxc.webApi.url(url, params), undefined, 'DELETE')
      : context.sxc.webApi.fetchJson(context.sxc.webApi.url(url, params)))
    .then(() => {
      renderer.reloadAndReInitialize(context, 'doAndReload');
    });
}
