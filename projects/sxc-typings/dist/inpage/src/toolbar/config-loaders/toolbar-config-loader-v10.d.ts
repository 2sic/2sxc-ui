import { ToolbarConfigLoader } from '.';
import { ToolbarInitConfig } from '..';
import { ContextComplete } from '../../context';
import { HasLog } from '../../core';
import { Toolbar } from '../config';
import { RuleManager } from '../rules';
/**
 * @internal
 */
export declare class ToolbarConfigLoaderV10 extends HasLog {
    private toolbar;
    rules: RuleManager;
    constructor(toolbar: ToolbarConfigLoader);
    loadV10(context: ContextComplete, config: ToolbarInitConfig, raw: string[]): Toolbar;
}
