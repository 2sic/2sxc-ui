import { ContextBundleToolbar } from '../../context/bundles/context-bundle-toolbar';
import { HtmlTools } from '../../html/dom-tools';
import { HasLog, Insights } from '../../logging';
import { RenderButton } from './render-button';
import { RenderButtonGroups } from './render-groups';


export class ToolbarRenderer extends HasLog {
    private readonly groups: RenderButtonGroups;
    public readonly button: RenderButton;

    constructor(private context: ContextBundleToolbar) {
        super('Rnd.Toolbr');
        Insights.add('toolbar-render', '', this.log);
        this.groups = new RenderButtonGroups(this);
        this.button = new RenderButton(this);
    }

    render(): string {
        const cl = this.log.call('render');
        // render groups of buttons
        const context = this.context;
        const groups = this.groups.render(context);

        // render toolbar
        const tlbTag = document.createElement('ul');
        tlbTag.classList.add('sc-menu');
        tlbTag.classList.add('group-0'); // IE11 fix, add each class separately

        // add behaviour classes
        tlbTag.classList.add(`sc-tb-hover-${context.toolbar.settings.hover}`);
        tlbTag.classList.add(`sc-tb-show-${context.toolbar.settings.show}`);
        if (context.toolbar.params.sortOrder === -1)
            tlbTag.classList.add('listContent');

        HtmlTools.addClasses(tlbTag, context.toolbar.settings.classes);

        // add button groups to toolbar
        tlbTag.setAttribute('group-count', context.toolbar.groups.length.toString());
        for (let g = 0; g < groups.length; g++)
            tlbTag.appendChild(groups[g]);

        return cl.return(tlbTag.outerHTML, 'done');
    }

    // /**
    //  * Add html classes to a DOM element
    //  */
    // addClasses(element: HTMLElement, classes: string, spliter: string) {
    //     if (!classes) return;
    //     const classessArray = classes.split(spliter);
    //     for (let c = 0; c < classessArray.length; c++)
    //         if (classessArray[c])
    //             element.classList.add(classessArray[c]);
    // }
}
