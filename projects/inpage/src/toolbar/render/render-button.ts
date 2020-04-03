import { CommandParams } from '../../commands';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { HtmlTools } from '../../html/dom-tools';
import { ButtonCommand, ButtonSafe } from '../config';
import { BuildRule } from '../rules/rule';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';


export class RenderButton extends RenderPart {
    constructor(parent: ToolbarRenderer) {
        super(parent, 'Rnd.Button');
    }

    render(ctx: ContextComplete, groupIndex: number): HTMLElement {
        const cl = this.log.call('render', `contex: obj, group: ${groupIndex}, btn: ${ctx.button.id}/${ctx.button.command?.name}`);
        const btn = new ButtonSafe(ctx.button, ctx);

        // check if we have rules and merge params into the button
        const rule = ctx.toolbar?.settings?._rules?.find(ctx.button.id);
        if (rule) cl.data('rule found, will try to merge params', rule);
        const params = ButtonCommand.mergeAdditionalParams(btn.action(), rule?.params);


        const group = ctx.toolbar?.groups?.[groupIndex];
        const groupName = group?.name;

        const btnLink = document.createElement('a');

        const disabled = btn.disabled();

        // put call as plain JavaScript to preserve even if DOM is serialized
        if (!disabled) btnLink.setAttribute('onclick', this.generateRunJs(ctx , params));

        // Add various classes
        const classes = (disabled ? ' disabled' : '')
            + (btn.action() ? ` sc-${btn.action().name}` : '')
            + ` in-group-${groupIndex}`
            + (groupName ? ` in-group-${groupName}` : '')
            + ' ' + rule?.ui.class
            + ' ' + btn.classes()
            + ' ' + btn.dynamicClasses();
        cl.add('classes: ' + classes);
        HtmlTools.addClasses(btnLink, classes);

        // set title for i18n
        const uiTitle = rule?.ui?.title;
        if (uiTitle)
            btnLink.setAttribute('title', uiTitle);
        else {
            const title = btn.title();
            if (title)
                btnLink.setAttribute('data-i18n', `[title]${title}`); // localization support
        }

        const divTag = document.createElement('div');
        divTag.appendChild(this.iconTag(btn, rule));
        btnLink.appendChild(divTag);

        // set color - new in 10.27
        const color = rule?.ui?.color || ctx.toolbar.settings.color;
        if (color && typeof color === 'string') {
            cl.add('color: ' + color);
            const parts = color.split(',');
            if (parts[0]) divTag.style.backgroundColor = correctColorCodes(parts[0]);
            if (parts[1]) divTag.style.color = correctColorCodes(parts[1]);
        }

        return cl.return(btnLink);
    }



    private generateRunJs(ctx: ContextComplete, params: CommandParams) {
        return `$2sxc(${ctx.instance.id}, ${ctx.contentBlock.id}).manage.run(${JSON.stringify(params)}, event);`;
    }

    private iconTag(btn: ButtonSafe, rule: BuildRule) {
        const symbol = document.createElement('i');
        const icon = rule?.ui?.icon || btn.icon();
        HtmlTools.addClasses(symbol, icon);
        symbol.setAttribute('aria-hidden', 'true');
        return symbol;
    }
}

// detect Hex-colors 6-digits or 8 in case transparent
const colorDetect = '^([A-Fa-f0-9]{6,8})$';

function correctColorCodes(color: string) {
    if (color && color.match(colorDetect)) return '#' + color;
    return color;
}
