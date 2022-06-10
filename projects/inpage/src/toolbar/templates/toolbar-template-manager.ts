import { ToolbarTemplate, ToolbarTemplateDefault, ToolbarTemplateEmpty, ToolbarTemplateSublist } from '.';
import { HasLog, Insights } from '../../logging';
import { Obj } from '../../plumbing';

/**
 * The template manager provides toolbar templates to the entire system.
 * It basically keeps a list of predefined templates, and returns the ones needed
 * @internal
 */
export class ToolbarTemplateManager extends HasLog {
    /** Singleton */
    public static singleton(): ToolbarTemplateManager {
        return this._singleton ?? (this._singleton = new ToolbarTemplateManager());
    }
    private static _singleton: ToolbarTemplateManager;

    configTemplateList: ToolbarTemplate[] = [];

    /** hash - table of templates, to be used a list()['template - name'] */
    list: Record<string, ToolbarTemplate> = {};

    constructor() {
        super('Tlb.TmpMan', null, 'build');
        Insights.add('system', 'toolbar-template-manager', this.log);
        this.add(ToolbarTemplateEmpty);
        this.add(ToolbarTemplateDefault);
        // CodeChange #2020-03-20#TemplateToolbarLeftUnused - if no side-effects, delete in June
        // this.add('left', ToolbarTemplateLeft);
        this.add(ToolbarTemplateSublist);
    }

    /**
     * Deep copy toolbar template, so it can be modified without changing the next use
     */
    copy(name: string): ToolbarTemplate {
        return Obj.DeepClone(this.findOrShowError(name));
    }
    private findOrShowError(name: string): ToolbarTemplate {
        const found = this.list[name];
        if (found) return found;
        throw `try to find toolbar template '${name}' but not found`;
    }

    /**
     * adds a template to the list, if it doesn't exist
     */
    private add(template: ToolbarTemplate) {
        this.list[template.name] = template;
    }
}
