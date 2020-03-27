﻿import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { HtmlTools } from '../../html/dom-tools';
import { ButtonCommand, ButtonModifier, ButtonSafe } from '../config';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';


export class RenderButton extends RenderPart {
    constructor(parent: ToolbarRenderer) {
        super(parent, 'Rnd.Button');
    }

    render(ctx: ContextComplete, groupIndex: number): HTMLElement {
        const cl = this.log.call('render', `contex: obj, group: ${groupIndex}, btn: ${ctx.button.name}`);
        const btn = new ButtonSafe(ctx.button, ctx);

        // check if we have modifiers
        const modifier = ButtonModifier.findOrCreate(ctx.toolbar?.settings?._modifiers, ctx.button.name);
        cl.data('modifier' + modifier.reason, modifier);
        if (modifier.found) cl.data('modifier found', modifier);

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
        const color = modifier.rules?.color || ctx.toolbar.settings.color;
        if (color) {
            cl.add('color: ' + color);
            const split = color.split(',');
            if (split[0]) divTag.style.backgroundColor = split[0];
            if (split[1]) divTag.style.color = split[1];
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
