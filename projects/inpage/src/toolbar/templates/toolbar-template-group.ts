import { TemplateConstants } from '.';
import { TypeTbD } from '../../plumbing';

/**
 * This describes a button group in a toolbar template.
 * It should only be used for that
 */
export class ToolbarTemplateGroup {
    name: string = TemplateConstants.GroupUnknown;
    buttons: string = '';
    defaults?: HashTable<string> = {};
    _insertIndex?: 0;

    static is(thing: TypeTbD): thing is ToolbarTemplateGroup {
        return (thing as ToolbarTemplateGroup).buttons !== undefined;
    }
}
