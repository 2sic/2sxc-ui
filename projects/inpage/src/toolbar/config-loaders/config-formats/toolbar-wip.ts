import { InPageButtonGroupJson } from '..';
import { CommandParams } from '../../../commands/command-params';
import { DictionaryValue } from '../../../plumbing';
import { ButtonGroup, ToolbarSettings } from '../../config';
import { ToolbarTemplateGroup } from '../../templates/toolbar-template-group';


export type ButtonGroupsWip = ButtonGroupWip[];

export type ButtonGroupWip = ButtonGroup | InPageButtonGroupJson | ToolbarTemplateGroup;

/**
 * Runtime configuration of the toolbar.
 * contains a toolbar config + settings + mny groups
 */
export interface ToolbarWip {
    /** The groups of buttons in this toolbar */
    groups: ButtonGroupsWip;

    /** Settings like floating of toolbar, etc. */
    settings: ToolbarSettings;

    /** Params for the commands, like EntityId, Content - Type - Name */
    params: DictionaryValue | CommandParams;

    /** show more debug info */
    debug?: boolean;

    /**  the button defaults like icon, etc. */
    defaults: DictionaryValue;

}
