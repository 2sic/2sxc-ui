import { ListWithCursor, TemplateConstants } from '.';

/**
 * This describes a button group in a toolbar template.
 * It should only be used for that
 * @internal
 */
export class ToolbarTemplateGroup implements ListWithCursor {
    name: string = TemplateConstants.GroupUnknown;
    buttons: string = '';
    defaults?: Record<string, string> = {};
    _insertCursor?: 0;

    static is(thing: unknown): thing is ToolbarTemplateGroup {
        return (thing as ToolbarTemplateGroup).buttons !== undefined;
    }
}
