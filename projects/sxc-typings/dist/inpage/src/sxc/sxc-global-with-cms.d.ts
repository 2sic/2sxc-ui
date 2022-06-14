import { SxcGlobalCms } from '../cms/sxc-global-cms';
/**
 * $2sxc global interface _extending_ the `SxcGlobal` when the page feature `JsCms` is enabled.
 *
 * If the page feature `2sxc.JsCms` is not enabled, the `window.$2sxc` will be a [SxcGlobal](xref:Api.Js.SxcJs.SxcGlobal)
 */
export interface SxcGlobalWithCms {
    /**
     * Will retrieve a resource in the current language.
     * Mainly used for toolbars etc. to support localization.
     *
     * Only available when edit mode is on meaning the page feature JsCms is enabled
     * @param key the key of the resource to translate
     */
    translate(key: string): string;
    /**
     * Content Management features on the $2sxc
     */
    cms: SxcGlobalCms;
}
