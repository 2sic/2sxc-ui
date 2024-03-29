﻿import { ModifierContentBlock, Selection } from ".";
import { Sxc } from "../../../$2sxc/src";
import { ContentListActionParams } from "../commands";
import { HasLog, NoJQ } from "../core";
import { ToolbarManager } from "../toolbar/toolbar-manager";

// note: this import must be at the end of the list, for reasons unknown
// otherwise you get an error at runtime, something about constructors
// Object prototype may only be an Object or null: undefined
// not sure why though
// tslint:disable-next-line: ordered-imports
import { translate } from "../i18n";

//#region WebApi Endpoints used: 2sxc
const webApiNew = "cms/block/block";
const webApiMove = "cms/list/move";
const webApiRemove = "cms/list/Delete";
//#endregion

/**
 * contains commands to create/move/delete a content-block in an inner-content
 * @internal
 */
export class ModifierContentBlockInstance extends HasLog {
  constructor(parent: ModifierContentBlock, private sxcInstance: Sxc) {
    super("QE.MdCbIn", parent.log);
  }

  /**
   * create content block
   */
  create(
    parentId: number,
    field: string,
    index: number,
    app: string, // app name
    container: HTMLElement,
    guid: string // guid of new item
  ): Promise<void> {
    // the wrapper, into which this will be placed and the list of pre-existing blocks
    if (!container) {
      alert("can't add content-block as we couldn't find the list");
      return Promise.resolve();
    }
    const cBlockList = container.querySelectorAll<HTMLElement>(
      "div.sc-content-block"
    );
    if (index > cBlockList.length) index = cBlockList.length; // make sure index is never greater than the amount of items

    const params = { parentId, field, index, app, guid };

    const promise = this.sxcInstance.webApi
      .fetchJson(
        this.sxcInstance.webApi.url(webApiNew, params),
        undefined,
        "POST"
      )
      .then((result) => {
        const newTag = NoJQ.domFromString(result)[0]; // prepare tag for inserting

        // should I add it to a specific position...
        if (cBlockList.length > 0 && index > 0)
          cBlockList[
            cBlockList.length > index - 1 ? index - 1 : cBlockList.length - 1
          ].after(newTag);
        // ...or just at the beginning?
        else container.prepend(newTag);

        // ReSharper disable once UnusedLocals
        const sxcNew = window.$2sxc(newTag);
        ToolbarManager.singleton().buildModule(newTag);
      });
    return Promise.resolve(promise);
  }

  /**
   * move content block
   * @param parentId
   * @param field
   * @param indexFrom
   * @param indexTo
   */
  move(
    parent: string,
    field: string,
    indexFrom: number,
    indexTo: number
  ): Promise<void> {
    const params: ContentListActionParams = {
      parent: parent,
      fields: field,
      index: indexFrom,
      toIndex: indexTo,
    };

    const promise = this.sxcInstance.webApi
      .fetchRaw(
        this.sxcInstance.webApi.url(webApiMove, params),
        undefined,
        "POST"
      )
      .then(() => {
        console.log("done moving!");
        window.location.reload();
      });
    return Promise.resolve(promise);
  }

  /**
   * delete a content-block inside a list of content-blocks
   * @param parent
   * @param field
   * @param index
   */
  delete(selection: Selection): Promise<void> {
    if (!confirm(translate("QuickInsertMenu.ConfirmDelete"))) return null;

    const params: ContentListActionParams = {
      parent: selection.parentGuid,
      fields: selection.field,
      index: selection.index,
    };

    const promise = this.sxcInstance.webApi
      .fetchRaw(
        this.sxcInstance.webApi.url(webApiRemove, params),
        undefined,
        "DELETE"
      )
      .then(() => {
        console.log("done deleting!");
        window.location.reload();
      });
    return Promise.resolve(promise);
  }
}
