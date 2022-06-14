import { ButtonGroup, ToolbarSettings } from '.';
import { TypeValue } from '../../plumbing';

/**
 * Runtime configuration of the toolbar.
 * contains a toolbar config + settings + mny groups
 * @internal
 */
export class Toolbar {
    /** Toolbar ID to better identify which toolbar we're looking at - has special long name to never confuse with other IDs */
    identifier: string;

    /** The groups of buttons in this toolbar */
    groups: ButtonGroup[] = [];

    /** Setttings like floating of toolbar, etc. */
    settings: ToolbarSettings;

    /** Params for the commands, like EntityId, Content - Type - Name */
    params: Record<string, TypeValue>;

    /** show more debug info */
    debug?: boolean = false;

    /**  the button defaults like icon, etc. */
    defaults: Record<string, TypeValue>;

    constructor() {
        this.identifier = Toolbar.createIdentifier();
    }

    static createIdentifier() {
        return 'Toolbar' + Math.floor(Math.random() * 99999);
    }
}
