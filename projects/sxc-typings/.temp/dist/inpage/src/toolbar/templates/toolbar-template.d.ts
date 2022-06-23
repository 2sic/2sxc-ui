import { ListWithCursor, ToolbarTemplateGroup } from '.';
import { TypeValue } from '../../plumbing';
import { ToolbarSettings } from '../config/toolbar-settings';
/**
 * This describes a template configuration of a toolbar
 * It's meant to provide type-save templates for what buttons are used where
 * @internal
 */
export declare class ToolbarTemplate implements ListWithCursor {
    name: string;
    groups: ToolbarTemplateGroup[];
    defaults?: Record<string, TypeValue>;
    params?: Record<string, TypeValue>;
    settings?: Partial<ToolbarSettings>;
    debug?: boolean;
    _isToolbarTemplate: true;
    _insertCursor?: 0;
    static is(thing: unknown): thing is ToolbarTemplate;
    static hasGroups(thing: unknown): thing is ToolbarTemplate;
}
