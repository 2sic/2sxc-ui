import { CommandNames, CommandParams } from '../../commands';
import { Debug } from '../../constants/debug';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { HtmlTools } from '../../html/dom-tools';
import { CommandWithParams, ButtonSafe } from '../config';
import { BuildRule } from '../rules/rule';
import { RenderPart } from './render-part-base';
import { ToolbarRenderer } from './toolbar-renderer';

/**
 * @internal
 */
export class RenderButton extends RenderPart {
  constructor(parent: ToolbarRenderer) {
    super(parent, "Rnd.Button");
  }

  render(ctx: ContextComplete, groupIndex: number): HTMLElement {
    const cl = this.log.call(
      "render",
      `context: obj, group: ${groupIndex}, btn: ${ctx.button.id}/${ctx.button.command?.name}`
    );
    const btnSafe = new ButtonSafe(ctx.button, ctx);

    // check if we have rules and merge params into the button
    const rule = ContextComplete.getRule(ctx);
    if (rule) cl.data("rule found, will try to merge params", rule);
    let params = CommandWithParams.mergeAdditionalParams(
      btnSafe.btnCommand(),
      rule?.params
    );

    if (rule?.settings)
      params = { ...params, settings: rule.settings };

    const group = ctx.toolbar?.groups?.[groupIndex];
    const groupName = group?.name;

    const btnLink = document.createElement("a");

    const disabled = btnSafe.disabledSafe();

    // put call as plain JavaScript to preserve even if DOM is serialized
    if (!disabled) {
      const runJs = this.generateRunJs(rule, ctx, params);
      btnLink.setAttribute("onclick", runJs);
    }

    // Add various classes
    const classes =
      (disabled ? " disabled" : "") +
      (btnSafe.btnCommand() ? ` sc-${btnSafe.btnCommand().name}` : "") +
      ` in-group-${groupIndex}` +
      (groupName ? ` in-group-${groupName}` : "") +
      " " +
      (rule?.ui.class ?? "") +
      " " +
      (rule?.ui.classes ?? "") +
      " " +
      btnSafe.classes() +
      " " +
      btnSafe.dynClassesSafe();
    cl.add("classes: " + classes);
    HtmlTools.addClasses(btnLink, classes);

    // set title for button, optionally with i18n
    this.setTitle(rule, btnLink, btnSafe);

    const divTag = document.createElement("div");
    divTag.appendChild(this.iconTag(btnSafe, rule));
    btnLink.appendChild(divTag);

    // set color - new in 10.27
    this.processColorRules(btnSafe, rule, ctx, divTag);

    // add tippy new 15.04
    btnSafe.tippySafe(ctx, btnLink);

    return cl.return(btnLink);
  }

  private setTitle(
    rule: BuildRule,
    btnLink: HTMLAnchorElement,
    btn: ButtonSafe
  ) {
    const callLog = this.log.call("setTitles");
    const uiTitle = rule?.ui?.title;
    if (uiTitle) {
      if (uiTitle.indexOf("i18n:") === 0) {
        const i18nTitle = uiTitle.substring(5);
        callLog.add(`i18nTitle: ${i18nTitle}`);
        btnLink.setAttribute("data-i18n", `[title]${i18nTitle}`);
      } else {
        callLog.add(`uiTitle: ${uiTitle}`);
        btnLink.setAttribute("title", uiTitle);
      }
    } else {
      const i18nTitle = btn.titleSafe();
      callLog.add(`i18nTitle: ${i18nTitle}`);
      if (i18nTitle) btnLink.setAttribute("data-i18n", `[title]${i18nTitle}`);
    }
    callLog.done();
  }

  private processColorRules(
    btn: ButtonSafe,
    rule: BuildRule,
    ctx: ContextComplete,
    divTag: HTMLDivElement
  ) {
    const callLog = this.log.call("processColorRules");
    let color = rule?.ui?.color ?? btn.colorSafe() ?? ctx.toolbar.settings.color;

    // catch edge case where the color is something like 808080 - which is treated as a number
    if (color && typeof color === "number")
      color = (color as number).toString();
    if (color && typeof color === "string") {
      const parts = color.split(",");
      if (parts[0])
        divTag.style.background = correctColorCodes(parts[0]);
      if (parts[1])
        divTag.style.color = correctColorCodes(parts[1]);
    }

    return callLog.done(color ?? "no color");
  }

  private generateRunJs(
    rule: BuildRule,
    ctx: ContextComplete,
    params: CommandParams
  ) {
    // 2022-05-18 2dm: #CustomContext New we can override the context
    let modifyContext = rule?.context;
    modifyContext = (!modifyContext || Object.keys(modifyContext).length === 0)
      ? undefined
      : { ...modifyContext, complete: true };
    const targetContext = modifyContext
      ? JSON.stringify(modifyContext)
      : `${ctx.instance.id}, ${ctx.contentBlockReference.id}`;

    // Placing real JS on each button
    if (params?.action === CommandNames.code) {
      const { action, ...cleanParams } = params;
      const newP = { action: params.action, params: cleanParams };
      return `$2sxc(${targetContext}).cms.run(${JSON.stringify(newP)}, event);`;
    }
    return `$2sxc(${targetContext}).manage.run(${JSON.stringify(
      params
    )}, event);`;
  }

  private iconTag(btn: ButtonSafe, rule: BuildRule) {
    const callLog = this.log.call("iconTag");
    const icon = rule?.ui?.icon || btn.iconSafe();
    if (icon.indexOf("<svg") > -1) {
      // Temporary dom element
      const symbol = document.createElement("template");
      symbol.innerHTML = icon;
      // Note: It would be tempting to set the viewBox here, but it's not possible
      // because we cannot calculate the size before rendering
      return callLog.return(symbol.content.firstChild, icon);
    } else {
      const symbol = document.createElement("i");
      HtmlTools.addClasses(symbol, icon);
      symbol.setAttribute("aria-hidden", "true");
      return callLog.return(symbol, icon);
    }
  }
}

// detect Hex-colors 6-digits or 8 in case transparent
const colorDetect = '^([A-Fa-f0-9]{6,8})$';

function correctColorCodes(color: string) {
    if (color && color.match(colorDetect)) return '#' + color;
    return color;
}
