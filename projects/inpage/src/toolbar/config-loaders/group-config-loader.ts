﻿import { ToolbarWip } from '.';
import { InPageButtonJson, InPageCommandJson } from '.';
import { ButtonGroupWip } from '.';
import { RunParams } from '../../../../$2sxc/src/cms/run-params';
import { CommandNames, CommandParams, Commands } from '../../commands';
import { HasLog } from '../../core';
import { TypeValue } from '../../plumbing';
import { Button, ButtonCommand, Toolbar, ToolbarSettings } from '../config';
import { ButtonGroup } from '../config';
import { TemplateConstants as TC } from '../templates/constants';
import { TLB_MORE_END, TLB_MORE_NEVER } from './../config/toolbar-settings';
import { ToolbarConfigLoader } from './toolbar-config-loader';

/**
 * @internal
 */
export class ButtonGroupConfigLoader extends HasLog {

    constructor(private toolbar: ToolbarConfigLoader) {
        super('Tlb.GrpCnf', toolbar.log);
    }

    /**
     * this will traverse a groups-tree and expand each group
     * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
     * @param fullToolbar
     */
    expandButtonGroups(fullToolbar: ToolbarWip): Toolbar {
        const cl = this.log.call('expandButtonGroups');

        // by now we should have a structure, let's check/fix the buttons
        cl.add(`will expand groups - found ${fullToolbar.groups.length} items`);
        for (let g = 0; g < fullToolbar.groups.length; g++) {
            // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
            const group = fullToolbar.groups[g];
            const groupDefaults = (group as ButtonGroup).defaults;
            const btns = this.expandButtonList(group, fullToolbar.settings);
            const buttonConfigs: Button[] = [];

            if (Array.isArray(btns)) {
                cl.add(`will process ${btns.length} buttons`);
                for (let b = 0; b < btns.length; b++)
                    buttonConfigs.push(this.convertToButton(btns[b], fullToolbar.params, fullToolbar.defaults, groupDefaults));
            } else
                cl.add("no button array found, won't do a.nything");

            // Toolbar API v2 overwrite V1
            group.buttons = buttonConfigs;
        }
        const toolbar = fullToolbar as Toolbar;
        this.dropMoreIfOnlyOneGroup(toolbar);
        return cl.return(toolbar);
    }



    /**
     * Converts the InPageButtonJson to a Button
     * WARNING: Note that this does the same task as convertToButton in the ButtonConfigLoader - but very differently
     *          I'm not sure why though.
     */
    convertToButton(btn: InPageButtonJson,
                    sharedParams: CommandParams | Record<string, TypeValue>,
                    sharedDefaults: Record<string, TypeValue>,
                    groupDefaults: Record<string, TypeValue>,
                    ): Button {
        let btnCommand = (btn as unknown as { command: CommandParams; }).command;
        const identifier = btnCommand.action;
        const name = Button.splitName(identifier).name;

        if (!(Commands.singleton().get(name))) {
            this.log.add(`couldn't find action ${name} - show warning`);
            console.warn('warning: toolbar-button with unknown action-name:', name);
        }

        // first check if we already got params in the object - then we will use those, otherwise the main object
        const realParams = (btnCommand as RunParams).params || InPageCommandJson.noAction(btnCommand);

        // 2dm 2022-07-05 #badContentTypeExtractAndRefill - we seem to extract it, just to put it back on the ButtonCommand
        // const contentType = realParams.contentType;

        // if the button belongs to a content-item, move the specs up to the item into the settings-object
        btnCommand = this.toolbar.command.updateToV9(btnCommand);

        // parameters adapter from v1 to v2
        const params = { ...realParams, ...sharedParams };
        // Toolbar API v2
        const command = new ButtonCommand(name, /* contentType, */ params);
        let newButtonConfig = new Button(command, identifier);

        // settings adapter from v1 to v2
        newButtonConfig = { ...newButtonConfig, ...InPageButtonJson.toButton(btn) };

        // ensure all buttons have either own settings, or the fallback
        this.toolbar.button.addDefaultBtnSettings(newButtonConfig, groupDefaults, sharedDefaults, Commands.singleton());
        return newButtonConfig;
    }

    /**
     * take a list of buttons (objects OR strings)
     * and convert to proper array of buttons with actions
     * on the in is a object with buttons, which are either:
     * - a string like "edit" or multi-value "layout,more"
     * - an array of such strings incl. optional complex objects which are
     */
    private expandButtonList(root: ButtonGroupWip, settings: ToolbarSettings): InPageButtonJson[] {
        const wrapLog = this.log.call('expandButtonList'); // new Log('Tlb.ExpBts', this.log, 'start');
        wrapLog.add('initial', root);
        const buttonsWip = root.buttons;

        let newButtons: InPageButtonJson[] = [];

        // convert compact buttons (with multi-verb action objects) into own button-objects
        // important because an older syntax allowed {action: "new,edit", entityId: 17}
        if (Array.isArray(buttonsWip)) {
            wrapLog.add(`detected array of btns (${buttonsWip.length}), will ensure it's an object`);
            for (let b = 0; b < buttonsWip.length; b++) {
                const btn = buttonsWip[b] as InPageButtonJson;
                const actionNames = (btn as InPageCommandJson).action;
                wrapLog.add(`will process actions: '${actionNames}' for `, btn);
                if (typeof actionNames === 'string' && actionNames.indexOf(',') > -1) {
                    wrapLog.add(`actionNames has mult values: '${actionNames}'`);
                    this.expandButtonAndAddToList(newButtons, btn, actionNames);
                } else {
                    wrapLog.add('actionNames has 1 value', btn);
                    newButtons.push(btn);
                }
            }
        } else if (typeof buttonsWip === 'string') {
            wrapLog.add(`detected that it is a string "${buttonsWip}", will split by "," and ...`);
            this.expandButtonAndAddToList(newButtons, {}, buttonsWip);
        } else {
            wrapLog.add('no special case detected, will use the buttons-object as is');
            newButtons = buttonsWip;
        }
        wrapLog.add(`after check, found ${newButtons.length} buttons`, newButtons);

        // optionally add a more-button in each group
        this.addMoreButton(settings, newButtons);

        const result = newButtons.map((x) => this.toolbar.button.normalize(x)); // ensure the internal def is also an array now
        return wrapLog.return(result, 'done');
    }


    private expandButtonAndAddToList(list: InPageButtonJson[], btn: InPageButtonJson, names: string): void {
        const cl = this.log.call('expandButtonAndAddToList', `..., ..., '${names}'`, `button def "${btn} is string of mult names, will expand into array with action-properties"`);
        const actions = names.length ? names.split(TC.ButtonSeparator) : [];
        const params = {...btn} as InPageCommandJson;
        delete params.action;
        for (let a = 0; a < actions.length; a++) {
            const commandPart = this.toolbar.button.btnConfigStructure(actions[a], params);
            cl.data('commandPart', commandPart);
            list.push(commandPart); // {...btn, ...commandPart });
        }
        cl.return(list);
    }

    /** Add the "more" button at the end or beginning */
    private addMoreButton(settings: ToolbarSettings, list: InPageButtonJson[]): void {
        const cl = this.log.call('addMoreButtons');
        const addMore = ToolbarSettings.bestAddMorePos(settings);
        if (addMore && addMore !== TLB_MORE_NEVER) {
            this.log.add(`will add a more "..." button to ${addMore}`);
            const moreButton = this.toolbar.button.btnConfigStructure(CommandNames.more, {});
            if (addMore === TLB_MORE_END)
                list.push(moreButton);
            else
                list.unshift(moreButton);
        } else this.log.add('will not add more "..." button');
        cl.return(list);
    }

    /**
     * If there is only one group, then remove the More button.
     * Note that this has to happen almost at the end, because groups will be removed if empty
     */
    private dropMoreIfOnlyOneGroup(toolbar: Toolbar): void {
        const cl = this.log.call('dropMoreIfOnlyOneGroup');
        if (toolbar.groups.length !== 1) return cl.done('not just 1 group');
        cl.add('exactly one group found, will remove more');
        const buttons = toolbar.groups[0].buttons;
        const index = buttons.findIndex((b) => b.command?.name === CommandNames.more);
        if (index === -1) return cl.done("no 'more' button found");
        buttons.splice(index, 1);
        cl.done('more removed');
    }

}
