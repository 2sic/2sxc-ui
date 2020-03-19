import { TypeTbD } from '../../plumbing';

/**
 * This describes a button group in a toolbar template.
 * It should only be used for that
 */
export class ToolbarTemplateButtonGroup {
    name: string;
    buttons: string;
    defaults?: HashTable<string> = {};

    static is(thing: TypeTbD): thing is ToolbarTemplateButtonGroup {
        return (thing as ToolbarTemplateButtonGroup).buttons !== undefined;
    }
}
