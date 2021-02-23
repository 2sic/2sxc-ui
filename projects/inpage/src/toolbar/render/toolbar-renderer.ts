import { C } from '../../constants';
import { ContextBundleToolbar } from '../../context/bundles/context-bundle-toolbar';
import { HtmlTools } from '../../html/dom-tools';
import { HasLog, Insights } from '../../logging';
import { RenderButton } from './render-button';
import { RenderButtonGroups } from './render-groups';

const attrIdentifier = 'toolbar-identifier';
// const attrCustomId = 'toolbar-id';

export class ToolbarRenderer extends HasLog {
    private readonly groups: RenderButtonGroups;
    public readonly button: RenderButton;

    constructor(private context: ContextBundleToolbar) {
        super('Rnd.Toolbr');
        Insights.add('toolbar-render', context.toolbar?.identifier || '', this.log);
        this.groups = new RenderButtonGroups(this);
        this.button = new RenderButton(this);
    }

    render(): string {
        const cl = this.log.call('generate');
        return cl.return(this.generate().outerHTML);
    }

    generate(): HTMLUListElement {
        const cl = this.log.call('generate');
        // render groups of buttons
        const context = this.context;
        cl.data('toolbar config', context.toolbar);
        const groups = this.groups.generate(context);

        // render toolbar
        const tlbTag = document.createElement('ul');
        tlbTag.setAttribute(attrIdentifier, context.toolbar?.identifier);
        // tlbTag.setAttribute(attrCustomId, context.toolbar?.settings?.id);
        tlbTag.classList.add('sc-menu');
        tlbTag.classList.add('group-0'); // IE11 fix, add each class separately

        // add behaviour classes
        const settings = context.toolbar.settings;
        tlbTag.classList.add(`sc-tb-hover-${settings.hover}`);
        tlbTag.classList.add(`sc-tb-show-${settings.show}`);
        if (context.toolbar.params.sortOrder === -1)
            tlbTag.classList.add('listContent');
        if (context.toolbar.params.fields)
            tlbTag.classList.add('sc-sublist');

        HtmlTools.addClasses(tlbTag, settings.class || settings.classes);

        // add button groups to toolbar
        tlbTag.setAttribute('group-count', context.toolbar.groups.length.toString());
        for (let g = 0; g < groups.length; g++)
            tlbTag.appendChild(groups[g]);

        return cl.return(tlbTag, 'done');
    }
}
