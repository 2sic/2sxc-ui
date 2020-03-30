import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { HtmlTools } from '../../html/dom-tools';
import { ButtonCommand, ButtonSafe } from '../config';
import { BuildRule } from '../rules/rule';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';
import { DictionaryValue } from '../../plumbing';


export class RenderButton extends RenderPart {
    constructor(parent: ToolbarRenderer) {
        super(parent, 'Rnd.Button');
    }

    render(ctx: ContextComplete, groupIndex: number): HTMLElement {
        const cl = this.log.call('render', `contex: obj, group: ${groupIndex}, btn: ${ctx.button.id}/${ctx.button.command?.name}`);
        const btn = new ButtonSafe(ctx.button, ctx);

        // check if we have rules to modify it
        const rule = ctx.toolbar?.settings?._rules?.find(ctx.button.id);
        if (rule) cl.data('rule found', rule);

        const group = ctx.toolbar?.groups?.[groupIndex];
        const groupName = group?.name;

        const btnLink = document.createElement('a');

        const disabled = btn.disabled();

        // put call as plain JavaScript to preserve even if DOM is serialized
        if (!disabled) btnLink.setAttribute('onclick', this.generateRunJs(btn.action(), ctx , rule?.params));

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
        if (btn.title)
            btnLink.setAttribute('data-i18n', `[title]${btn.title()}`); // localization support


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



    private generateRunJs(command: ButtonCommand, ctx: ContextComplete, additionalParams: DictionaryValue) {
        const runParams = ButtonCommand.prepareForUsingInLink(command, additionalParams);
        return `$2sxc(${ctx.instance.id}, ${ctx.contentBlock.id}).manage.run(${JSON.stringify(runParams)}, event);`;
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
