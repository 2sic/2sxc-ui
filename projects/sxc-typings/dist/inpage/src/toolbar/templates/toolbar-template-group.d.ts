import { ListWithCursor } from '.';
/**
 * This describes a button group in a toolbar template.
 * It should only be used for that
 * @internal
 */
export declare class ToolbarTemplateGroup implements ListWithCursor {
    name: string;
    buttons: string;
    defaults?: Record<string, string>;
    _insertCursor?: 0;
    static is(thing: unknown): thing is ToolbarTemplateGroup;
}
