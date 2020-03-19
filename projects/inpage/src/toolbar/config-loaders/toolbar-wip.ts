import { DictionaryValue } from '../../plumbing/TypeTbD';
import { ButtonGroup, ToolbarSettings } from '../config';
import { InPageButtonJson } from './in-page-button';
import { CommandParams } from '../../commands/command-params';

/**
 * Runtime configuration of the toolbar.
 * contains a toolbar config + settings + mny groups
 */
export interface ToolbarWip {
    /** The groups of buttons in this toolbar */
    groups: Array<ButtonGroup | InPageButtonJson>;

    /** Setttings like floating of toolbar, etc. */
    settings: ToolbarSettings;

    /** Params for the commands, like EntityId, Content - Type - Name */
    params: DictionaryValue | CommandParams;

    /** show more debug info */
    debug?: boolean;

    /**  the button defaults like icon, etc. */
    defaults: DictionaryValue;

}
