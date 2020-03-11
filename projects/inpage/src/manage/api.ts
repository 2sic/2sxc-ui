import { AttrJsonEditContext } from '../context/html-attribute/edit-context-root';
import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';

/**
 * get edit-context info of html element or sxc-object
 * @param {SxcIntanceEditable} sxc
 * @param {HTMLElement} htmlElement
 * @return {AttrJsonEditContext} edit context info
 */
export function getEditContext(sxc: SxcIntanceEditable, htmlElement?: HTMLElement): AttrJsonEditContext {
  let editContextTag: HTMLElement;
  if (htmlElement) {
    editContextTag = getContainerTag(htmlElement);
  } else {
    editContextTag = getTag(sxc);
  }
  return getEditContextOfTag(editContextTag);
}

/**
 * get nearest html tag of the sxc instance with data-edit-context
 * @param htmlTag
 */
export function getContainerTag(htmlTag: HTMLElement): HTMLElement {
  return $(htmlTag).closest('div[data-edit-context]')[0];
}

/**
 * get a html tag of the sxc instance
 * @param {SxcIntanceEditable} sxci
 * @return {jquery} - resulting html
 */
export function getTag(sxci: SxcIntanceEditable): HTMLElement {
  return $(`div[data-cb-id='${sxci.cbid}']`)[0];
}

/**
 * get the edit-context object (a json object) of the current tag/sxc-instance
 * @return {AttrJsonEditContext} edit-context object
 */
function getEditContextOfTag(htmlTag: HTMLElement): AttrJsonEditContext {
  const attr = htmlTag.getAttribute('data-edit-context');
  return JSON.parse(attr || '{ }') as AttrJsonEditContext;
}

