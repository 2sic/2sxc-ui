﻿import {
  ModifierBase,
  QeSelectors,
  QuickE,
  QuickEClipboard,
  Selection,
} from ".";
import { ContextForLists } from "./context-for-lists";
import { ModifierContentBlockInstance } from "./modifier-content-block-internal";
import { DomTools } from '../../../$2sxc/src/dom/dom-tools';
import { AttrJsonEditContext } from '../context/html-attribute/edit-context-root';

/**
 * extend the quick edit with the core commands
 * @internal
 */
export class ModifierContentBlock extends ModifierBase {
  constructor() {
    super("QE.CntBlk");
  }

  private getInstanceModifier(tag: HTMLElement) {
    const sxc = window.$2sxc(tag);
    debugger;
    return new ModifierContentBlockInstance(this, sxc);
  }

  /** Delete an inner content-block */
  delete(clip: Selection): Promise<void> {
    return this.getInstanceModifier(clip.list).delete(clip);
  }

  create(
    parent: number,
    field: string,
    listIndex: number,
    appOrContent: string,
    list: HTMLElement,
    newGuid: string
  ): Promise<void> {
    return this.getInstanceModifier(list).create(
      parent,
      field,
      listIndex,
      appOrContent,
      list,
      newGuid
    );
  }

  move(oldClip: Selection, newClip: Selection) {
    const from = this.findClipListIndex(oldClip);
    const to = this.findClipListIndex(newClip);
    this.getInstanceModifier(oldClip.list).move(
      newClip.parentGuid,
      newClip.field,
      from,
      to
    );
  }

  // cb-numbering is a bit different, because the selector is at the bottom
  // only there we should also skip on +1;
  isRealMove(oldClip: Selection, newClip: Selection): boolean {
    return this.findClipListIndex(oldClip) + 1 !== this.findClipListIndex(newClip);
  }

  /**
   * find the real index of this block in the list - may not match the DOM index
   */
  findClipListIndex(clip: Selection): number {
    return this.findListIndex(clip.item, clip.index);
  }

  /**
   * find the real index of a block tag as it may not match the DOM index
   * TODO: @2dm - not really sure what this is, should be documented more clearly
   */
  findListIndex(tag: HTMLElement, fallback: number): number {
    const editContext = DomTools.getContextOfTag(tag) as AttrJsonEditContext;
    const listIndex = editContext?.contentBlockReference?.parentIndex ?? fallback;
    return listIndex;
  }

  /**
   * The button click handler. Must be static, as it will be attached to the buttons
   * So the 'this' is not a ContentBlockModifier, but the html-tag which was clicked
   */
  static onCbButtonClick() {
    const blockTag = QuickE.singleton().main.activeContentBlock;
    const button = this as unknown as HTMLElement;
    const list = QeSelectors.blocks.cb.findClosestList(blockTag);
    const listItems = list.querySelectorAll<HTMLElement>(
      QeSelectors.blocks.cb.selector
    );
    const actionConfig = ContextForLists.getFromDom(list);
    const newGuid: string | null = actionConfig.guid || null;

    // if the target is a content-block, then the list already has items
    // so the domIndex must be based on that. Otherwise use 0
    const domIndex = blockTag.classList.contains(QeSelectors.blocks.cb.class)
      ? Array.from(listItems).indexOf(blockTag) + 1
      : 0;

    // Check if it's a cut/paste action
    const cbAction = button.getAttribute("data-action");
    if (cbAction)
      return QuickEClipboard.singleton().do(
        cbAction,
        list,
        domIndex,
        QeSelectors.blocks.cb.id
      );

    // this is a create-additional block action
    // in this case the clipboard doesn't exist
    // so we'll have to find the dom object and get the list index
    const listIndex =
      QuickEClipboard.singleton().modCb.findListIndex(blockTag, domIndex - 1) +
      1;

    const appOrContent = button.getAttribute("data-type");
    return QuickEClipboard.singleton().modCb.create(
      actionConfig.parent as number,
      actionConfig.field,
      listIndex,
      appOrContent,
      list,
      newGuid
    );
  }
}
