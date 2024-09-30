import { Sxc } from '..';
import { C } from '../../../core/constants';
import { InstanceContext } from './instance-context';

/**
 * @internal
 */
export class DomTools {
  /**
   * get edit-context info of html element or sxc-object
   */
  static getContext(sxc: Sxc, htmlElement?: HTMLElement): InstanceContext {
    const editContextTag: HTMLElement = (htmlElement)
      ? DomTools.getContainerTag(htmlElement)
      : DomTools.getTag(sxc);
    return DomTools.getContextOfTag(editContextTag);
  }


  /**
   * get the edit-context object (a json object) of the current tag/sxc-instance
   * @returns edit-context object
   */
  static getContextOfTag(htmlTag: HTMLElement | undefined): InstanceContext {
      const attr = htmlTag?.getAttribute(C.Attributes.Context);
      return JSON.parse(attr || '{ }') as InstanceContext;
  }

  
  /**
   * get nearest html tag of the sxc instance with data-edit-context
   */
  static getContainerTag(htmlTag: HTMLElement): HTMLElement {
    return htmlTag.closest<HTMLElement>(C.Sel.SxcDivs);
  }


  /**
   * get a html tag of the sxc instance
   * @returns resulting html
   */
  static getTag(sxci: Sxc): HTMLElement {
    return document.querySelector<HTMLElement>(`div[${C.Attributes.ContentBlockId}='${sxci.cbid}']`);
  }

}