import { ToolbarWip } from '.';
import { InPageButtonJson } from '.';
import { CommandParams } from '../../commands';
import { HasLog } from '../../core';
import { TypeValue } from '../../plumbing';
import { Button, Toolbar } from '../config';
import { ToolbarConfigLoader } from './toolbar-config-loader';
/**
 * @internal
 */
export declare class ButtonGroupConfigLoader extends HasLog {
    private toolbar;
    constructor(toolbar: ToolbarConfigLoader);
    /**
     * this will traverse a groups-tree and expand each group
     * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
     * @param fullToolbar
     */
    expandButtonGroups(fullToolbar: ToolbarWip): Toolbar;
    /**
     * Converts the InPageButtonJson to a Button
     * WARNING: Note that this does the same task as convertToButton in the ButtonConfigLoader - but very differently
     *          I'm not sure why though.
     */
    convertToButton(btn: InPageButtonJson, sharedParams: CommandParams | Record<string, TypeValue>, sharedDefaults: Record<string, TypeValue>, groupDefaults: Record<string, TypeValue>): Button;
    /**
     * take a list of buttons (objects OR strings)
     * and convert to proper array of buttons with actions
     * on the in is a object with buttons, which are either:
     * - a string like "edit" or multi-value "layout,more"
     * - an array of such strings incl. optional complex objects which are
     */
    private expandButtonList;
    private expandButtonAndAddToList;
    /** Add the "more" button at the end or beginning */
    private addMoreButton;
    /**
     * If there is only one group, then remove the More button.
     * Note that this has to happen almost at the end, because groups will be removed if empty
     */
    private dropMoreIfOnlyOneGroup;
}
