import { ButtonGroup } from '.';
import { ToolbarSettings } from '.';
import { DictionaryValue } from '../../plumbing/TypeTbD';

/**
 * Runtime configuration of the toolbar.
 * contains a toolbar config + settings + mny groups
 */
export class Toolbar {
    /** The groups of buttons in this toolbar */
    groups: ButtonGroup[] = [];

    /** Setttings like floating of toolbar, etc. */
    settings: ToolbarSettings;

    /** Params for the commands, like EntityId, Content - Type - Name */
    params: DictionaryValue;

    /** show more debug info */
    debug?: boolean = false;

    /**  the button defaults like icon, etc. */
    defaults: DictionaryValue;
}
