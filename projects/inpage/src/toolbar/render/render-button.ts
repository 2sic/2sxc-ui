﻿import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { HtmlTools } from '../../html/dom-tools';
import { ButtonCommand, ButtonSafe } from '../config';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';


export class RenderButton extends RenderPart {
    constructor(parent: ToolbarRenderer) {
        super(parent, 'Rnd.Button');
    }

    render(ctx: ContextComplete, groupIndex: number): HTMLElement {
        const cl = this.log.call('render', `contex: obj, group: ${groupIndex}, btn: ${ctx.button.id}/${ctx.button.name}`);
        const btn = new ButtonSafe(ctx.button, ctx);

        // check if we have rules to modify it
        const rule = ctx.toolbar?.settings?._rules?.find(ctx.button.id);
        if (rule) cl.data('rule found', rule);

        const btnLink = document.createElement('a');

        const disabled = btn.disabled();

        // put call as plain JavaScript to preserve even if DOM is serialized
        if (!disabled) btnLink.setAttribute('onclick', this.generateRunJs(btn, ctx));

        // Add various classes
        const classes = (disabled ? ' disabled' : '')
            + (btn.action() ? ` sc-${btn.action().name}` : '')
            + ` group-${groupIndex}`
            + ' ' + btn.classes()
            + ' ' + btn.dynamicClasses();
        cl.add('classes: ' + classes);
        HtmlTools.addClasses(btnLink, classes);

        // set title for i18n
        if (btn.title)
            btnLink.setAttribute('data-i18n', `[title]${btn.title()}`); // localization support


        const divTag = document.createElement('div');
        divTag.appendChild(this.iconTag(btn, ctx));
        btnLink.appendChild(divTag);

        // set color - new in 10.27
        const color = rule?.button?.color || ctx.toolbar.settings.color;
        if (color && typeof color === 'string') {
            cl.add('color: ' + color);
            const parts = color.split(',');
            if (parts[0]) divTag.style.backgroundColor = correctColorCodes(parts[0]);
            if (parts[1]) divTag.style.color = correctColorCodes(parts[1]);
        }

        return cl.return(btnLink);
    }



    private generateRunJs(btn: ButtonSafe, ctx: ContextComplete) {
        const runParams = ButtonCommand.prepareForUsingInLink(btn.action());
        return `$2sxc(${ctx.instance.id}, ${ctx.contentBlock.id}).manage.run(${JSON.stringify(runParams)}, event);`;
    }

    private iconTag(btn: ButtonSafe, context: ContextComplete) {
        const symbol = document.createElement('i');
        HtmlTools.addClasses(symbol, btn.icon());
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
