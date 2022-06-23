import { ToolbarTemplate } from '.';
import { HasLog } from '../../core';
/**
 * The template manager provides toolbar templates to the entire system.
 * It basically keeps a list of predefined templates, and returns the ones needed
 * @internal
 */
export declare class ToolbarTemplateManager extends HasLog {
    /** Singleton */
    static singleton(): ToolbarTemplateManager;
    private static _singleton;
    configTemplateList: ToolbarTemplate[];
    /** hash - table of templates, to be used a list()['template - name'] */
    list: Record<string, ToolbarTemplate>;
    constructor();
    /**
     * Deep copy toolbar template, so it can be modified without changing the next use
     */
    copy(name: string): ToolbarTemplate;
    private findOrShowError;
    /**
     * adds a template to the list, if it doesn't exist
     */
    private add;
}
