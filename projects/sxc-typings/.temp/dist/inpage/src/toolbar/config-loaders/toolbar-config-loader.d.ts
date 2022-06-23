import { ButtonConfigLoader, ButtonGroupConfigLoader, CommandConfigLoader, ToolbarConfigLoaderV09, ToolbarConfigLoaderV10, ToolbarWip } from '.';
import { ToolbarManager } from '..';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { HasLog, LogEntry } from '../../core';
import { Toolbar } from '../config';
import { ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { TemplateEditor, ToolbarTemplateManager } from '../templates';
/**
 * @internal
 */
export declare class ToolbarConfigLoader extends HasLog {
    toolbarV09: ToolbarConfigLoaderV09;
    toolbarV10: ToolbarConfigLoaderV10;
    groups: ButtonGroupConfigLoader;
    button: ButtonConfigLoader;
    command: CommandConfigLoader;
    templates: ToolbarTemplateManager;
    templateEditor: TemplateEditor;
    logs: Array<{
        key: string;
        entries: LogEntry[];
    }>;
    /** Special constructor that can only be called from the ToolbarManager */
    constructor(_owner: ToolbarManager);
    private setLoggingAndCreateHelpers;
    load(context: ContextComplete, config: ToolbarInitConfig): Toolbar;
    buildTreeAndModifyAccordingToRules(toolbarContext: ContextComplete, configWip: ToolbarWip): Toolbar;
}
