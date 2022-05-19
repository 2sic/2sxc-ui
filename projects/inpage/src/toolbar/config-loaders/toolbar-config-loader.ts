import { ButtonConfigLoader, ButtonGroupConfigLoader, CommandConfigLoader, ToolbarConfigLoaderV09, ToolbarConfigLoaderV10, ToolbarWip } from '.';
import { ToolbarManager } from '..';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { HasLog, LogEntry } from '../../logging';
import { Toolbar } from '../config';
import { InPageToolbarConfigVariations, ToolbarInitConfig } from '../initialize/toolbar-init-config';
import { TemplateEditor, ToolbarTemplate, ToolbarTemplateManager } from '../templates';

// Enable when debugging toolbar creation - will dump all logs to the console
const liveDumpThis = false;

export class ToolbarConfigLoader extends HasLog {

    public toolbarV09: ToolbarConfigLoaderV09;
    public toolbarV10: ToolbarConfigLoaderV10;
    public groups: ButtonGroupConfigLoader;
    public button: ButtonConfigLoader;
    public command: CommandConfigLoader;
    public templates = ToolbarTemplateManager.singleton();
    public templateEditor: TemplateEditor;

    public logs: Array<{ key: string, entries: LogEntry[]}>;

    /** Special constructor that can only be called from the ToolbarManager */
    constructor(_owner: ToolbarManager) {
        // important: always create a new log as it will be stored in insights
        super('Tlb.TlbCnf');
    }

    private setLoggingAndCreateHelpers(toolbarData: InPageToolbarConfigVariations): void {
        // note: could be true, false or 'live'
        let debugLog = toolbarData && (toolbarData as ToolbarTemplate).debug;
        if (debugLog === undefined && Array.isArray(toolbarData) && toolbarData.length)
            debugLog = (toolbarData[0] as ToolbarTemplate).debug;

        debugLog = debugLog || false;

        if (liveDumpThis || debugLog) {
            this.log.keepData = true;
            if (liveDumpThis || debugLog.toString() === 'live')
                this.log.liveDump = true;
            this.log.add(`found debug=${debugLog}, will enable intense logging`);
        }
        this.toolbarV09 = new ToolbarConfigLoaderV09(this);
        this.toolbarV10 = new ToolbarConfigLoaderV10(this);
        this.groups = new ButtonGroupConfigLoader(this);
        this.button = new ButtonConfigLoader(this);
        this.command = new CommandConfigLoader(this);
        this.templateEditor = new TemplateEditor(this);
    }



    load(context: ContextComplete, config: ToolbarInitConfig): Toolbar {
        const cl = this.log.call('load', '', 'expand start', { context: context, config: config });
        // cl.data('initial context', context);
        // cl.data('initial config', config);
        // if null/undefined, use empty object
        const raw = config.toolbar = config.toolbar || {};
        this.setLoggingAndCreateHelpers(raw as InPageToolbarConfigVariations);

        // check if it's a V10 tolbar
        if (Array.isArray(raw) && raw.length >= 0 && typeof raw[0] === 'string')
            return cl.return(this.toolbarV10.loadV10(context, config, raw), 'v10 done');

        // do standard V3 procedures
        return cl.return(this.toolbarV09.loadV9(context, config), 'V9 done');
    }





    public buildTreeAndModifyAccordingToRules(toolbarContext: ContextComplete, configWip: ToolbarWip) {
        const wrapLog = this.log.call('buildFullDefinition');
        const tlbConfig = this.groups.expandButtonGroups(configWip);
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        this.button.removeDisableButtons(toolbarContext, tlbConfig /*, instanceConfig */);
        return wrapLog.return(tlbConfig);
    }


  //#endregion initial toolbar object

}
