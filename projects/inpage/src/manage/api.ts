import { DataEditContext } from '../data-edit-context/data-edit-context';

/**
 * get edit-context info of html element or sxc-object
 * @param {SxcInstanceWithInternals} sxc
 * @param {HTMLElement} htmlElement
 * @return {DataEditContext} edit context info
 */
export function getEditContext(sxc: SxcInstanceWithInternals, htmlElement?: HTMLElement): DataEditContext {
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
export function getContainerTag(htmlTag: any): any {
  return $(htmlTag).closest('div[data-edit-context]')[0];
}

/**
 * get a html tag of the sxc instance
 * @param {SxcInstanceWithInternals} sxci
 * @return {jquery} - resulting html
 */
export function getTag(sxci: SxcInstanceWithInternals): any {
  return $(`div[data-cb-id='${sxci.cbid}']`)[0];
}

/**
 * get the edit-context object (a json object) of the current tag/sxc-instance
 * @param {any} htmlTag
 * @return {DataEditContext} edit-context object
 */
export function getEditContextOfTag(htmlTag: any): DataEditContext {
  const attr = htmlTag.getAttribute('data-edit-context');
  return JSON.parse(attr || '{ }') as DataEditContext;
}

