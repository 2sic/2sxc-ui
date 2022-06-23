import { InPageCommandJson } from '.';
import { InPageButtonJson } from '.';
import { ToolbarConfigLoader } from '.';
import { Commands } from '../../commands';
import { ContextComplete } from '../../context/bundles';
import { HasLog } from '../../core';
import { TypeValue } from '../../plumbing';
import { Button, Toolbar } from '../config';
/**
 * This is a system to build button configurations
 * @internal
 */
export declare class ButtonConfigLoader extends HasLog {
    private toolbar;
    constructor(toolbar: ToolbarConfigLoader);
    /**
     * takes an object like "actionname" or { action: "actionname", ... }
     * and changes it to a { command: { action: "actionname" }, ... }
     */
    normalize(original: InPageButtonJson | InPageCommandJson | string): InPageButtonJson;
    btnConfigStructure(name: string, params: {}): InPageButtonJson;
    /**
     * remove buttons which are not valid based on add condition
     * @param {ContextComplete} context
     * @param {Toolbar} full
     * @param {InstanceConfig} config
     * @memberof ButtonConfigurationBuilder
     */
    removeDisableButtons(context: ContextComplete, full: Toolbar): void;
    /**
     * enhance button-object with default icons, etc.
     * @param btn
     * @param group
     * @param fullToolbarConfig
     * @param actions
     */
    addDefaultBtnSettings(btn: Button, groupDefaults: Record<string, TypeValue> | null, tlbDefaults: Record<string, TypeValue> | null | undefined, actions: Commands): void;
    private removeUnfitButtons;
}
