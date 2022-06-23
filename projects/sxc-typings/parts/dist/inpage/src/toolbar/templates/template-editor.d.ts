import { ToolbarTemplate, ToolbarTemplateGroup } from '.';
import { HasLog } from '../../core';
import { ToolbarConfigLoader } from '../config-loaders';
/**
 * This object is used to change the structure of a toolbar template.
 * It's only purpose is to assist in the new V10 format for quickly making toolbars.
 * @internal
 */
export declare class TemplateEditor extends HasLog {
    toolbar: ToolbarConfigLoader;
    constructor(toolbar: ToolbarConfigLoader);
    addButton(template: ToolbarTemplate, groupName: string, id: string, name: string, pos: number): void;
    private findInsertPosition;
    private correctPosStartEnd;
    addGroup(template: ToolbarTemplate, groupName: string, pos: number): ToolbarTemplateGroup;
    removeGroup(template: ToolbarTemplate, groupName: string): void;
    private ensureGroups;
    private findGroup;
    private findGroupOrDefault;
}
