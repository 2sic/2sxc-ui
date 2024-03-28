import { Sxc } from '../../../$2sxc/src/sxc/sxc';
import { AttrJsonEditContext } from '../context/html-attribute';
import { DomTools } from '../../../$2sxc/src/dom/dom-tools';

/**
 * @internal
 */
export class SxcTools {
    /**
     * get edit-context info of html element or sxc-object
     */
    static getEditContext(sxc: Sxc, htmlElement?: HTMLElement): AttrJsonEditContext {
      return DomTools.getContext(sxc, htmlElement) as AttrJsonEditContext;
    }

}
