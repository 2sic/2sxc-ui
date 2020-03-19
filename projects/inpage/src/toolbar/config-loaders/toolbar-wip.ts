import { CommandParams } from '../../commands/command-params';
import { DictionaryValue } from '../../plumbing/TypeTbD';
import { ButtonGroup, ToolbarSettings } from '../config';
import { ToolbarTemplateButtonGroup } from '../templates/toolbar-templaten-button-group';
import { InPageButtonGroupJson } from './in-page-button-group';


export type ButtonGroupsWip = ButtonGroupWip[];

export type ButtonGroupWip = ButtonGroup | InPageButtonGroupJson | ToolbarTemplateButtonGroup;

/**
 * Runtime configuration of the toolbar.
 * contains a toolbar config + settings + mny groups
 */
export interface ToolbarWip {
    /** The groups of buttons in this toolbar */
    groups: ButtonGroupsWip;

    /** Setttings like floating of toolbar, etc. */
    settings: ToolbarSettings;

    /** Params for the commands, like EntityId, Content - Type - Name */
    params: DictionaryValue | CommandParams;

    /** show more debug info */
    debug?: boolean;

    /**  the button defaults like icon, etc. */
    defaults: DictionaryValue;

}
