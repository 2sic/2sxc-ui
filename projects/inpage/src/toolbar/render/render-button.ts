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
        const btnSafe = new ButtonSafe(ctx.button, ctx);

        // check if we have rules and merge params into the button
        const rule = ctx.toolbar?.settings?._rules?.find(ctx.button.id);
        if (rule) cl.data('rule found, will try to merge params', rule);
        const params = ButtonCommand.mergeAdditionalParams(btnSafe.action(), rule?.params);


        const group = ctx.toolbar?.groups?.[groupIndex];
        const groupName = group?.name;

        const btnLink = document.createElement('a');

        const disabled = btnSafe.disabled();

        // put call as plain JavaScript to preserve even if DOM is serialized
        if (!disabled) btnLink.setAttribute('onclick', this.generateRunJs(rule, ctx , params));

        // Add various classes
        const classes = (disabled ? ' disabled' : '')
            + (btnSafe.action() ? ` sc-${btnSafe.action().name}` : '')
            + ` in-group-${groupIndex}`
            + (groupName ? ` in-group-${groupName}` : '')
            + ' ' + rule?.ui.class
            + ' ' + btnSafe.classes()
            + ' ' + btnSafe.dynamicClasses();
        cl.add('classes: ' + classes);
        HtmlTools.addClasses(btnLink, classes);

        // set title for button, optionally with i18n
        this.setTitle(rule, btnLink, btnSafe);

        const divTag = document.createElement('div');
        divTag.appendChild(this.iconTag(btnSafe, rule));
        btnLink.appendChild(divTag);

        // set color - new in 10.27
        this.processColorRules(rule, ctx, divTag);

        return cl.return(btnLink);
    }



    private setTitle(rule: BuildRule, btnLink: HTMLAnchorElement, btn: ButtonSafe) {
        const callLog = this.log.call('setTitles');
        const uiTitle = rule?.ui?.title;
        if (uiTitle) {
            callLog.add(`uiTitle: ${uiTitle}`);
            btnLink.setAttribute('title', uiTitle);
        } else {
            const i18nTitle = btn.title();
            callLog.add(`i18nTitle: ${i18nTitle}`);
            if (i18nTitle) btnLink.setAttribute('data-i18n', `[title]${i18nTitle}`);
        }
        callLog.done();
    }

    private processColorRules(rule: BuildRule, ctx: ContextComplete, divTag: HTMLDivElement) {
        const callLog = this.log.call('processColorRules');
        let color = rule?.ui?.color || ctx.toolbar.settings.color;

        // catch edge case where the color is something like 808080 - which is treated as a number
        if (color && typeof color === 'number') color = (color as number).toString();
        if (color && typeof color === 'string') {
            const parts = color.split(',');
            if (parts[0]) divTag.style.backgroundColor = correctColorCodes(parts[0]);
            if (parts[1]) divTag.style.color = correctColorCodes(parts[1]);
        }

        return callLog.done(color ?? 'no color');
    }

    private generateRunJs(rule: BuildRule, ctx: ContextComplete, params: CommandParams) {
        // 2022-05-18 2dm: #CustomContext New we can override the context
        let modifyContext = rule?.context;
        if (!modifyContext || Object.keys(modifyContext).length === 0)
            modifyContext = undefined;
        else
            modifyContext = { ...modifyContext, complete: true };
        const targetContext = modifyContext ? JSON.stringify(modifyContext) : `${ctx.instance.id}, ${ctx.contentBlockReference.id}`;
        return `$2sxc(${targetContext}).manage.run(${JSON.stringify(params)}, event);`;
    }

    private iconTag(btn: ButtonSafe, rule: BuildRule) {
        const callLog = this.log.call('iconTag');
        const symbol = document.createElement('i');
        const icon = rule?.ui?.icon || btn.icon();
        HtmlTools.addClasses(symbol, icon);
        symbol.setAttribute('aria-hidden', 'true');
        return callLog.return(symbol, icon);
    }
}

// detect Hex-colors 6-digits or 8 in case transparent
const colorDetect = '^([A-Fa-f0-9]{6,8})$';

function correctColorCodes(color: string) {
    if (color && color.match(colorDetect)) return '#' + color;
    return color;
}
