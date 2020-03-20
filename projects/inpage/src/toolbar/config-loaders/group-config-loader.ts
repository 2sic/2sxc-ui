﻿import { ToolbarWip } from '.';
import { CommandParams, Commands } from '../../commands';
import { HasLog, Log } from '../../logging';
import { Button, ButtonCommand, Toolbar, ToolbarSettings } from '../config';
import { ButtonGroup } from '../config';
import { InPageButtonJson } from './in-page-button';
import { InPageCommandJson } from './in-page-command';
import { ToolbarConfigLoader } from './toolbar-config-loader';
import { ButtonGroupWip } from './toolbar-wip';

export class ButtonGroupConfigLoader extends HasLog {

    constructor(public toolbar: ToolbarConfigLoader) {
        super('Tlb.GrpCnf', toolbar.log);
    }

    /**
     * this will traverse a groups-tree and expand each group
     * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
     * @param fullToolbar
     */
    expandButtonGroups(fullToolbar: ToolbarWip, parentLog: Log): Toolbar {
        const log = new Log('Tlb.ExpGrp', parentLog, 'start');

        // by now we should have a structure, let's check/fix the buttons
        log.add(`will expand groups - found ${fullToolbar.groups.length} items`);
        for (let g = 0; g < fullToolbar.groups.length; g++) {
            // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
            const group = fullToolbar.groups[g];
            const btns = this.expandButtonList(group, fullToolbar.settings);
            const buttonConfigs: Button[] = [];

            if (Array.isArray(btns)) {
                log.add(`will process ${btns.length} buttons`);
                for (let b = 0; b < btns.length; b++)
                    buttonConfigs.push(this.convertToButton(btns[b], fullToolbar, group));
            } else
                log.add("no button array found, won't do a.nything");

            // Toolbar API v2 overwrite V1
            group.buttons = buttonConfigs;
        }
        return fullToolbar as Toolbar;
    }



    /**
     * Converts the InPageButtonJson to a Button
     * WARNING: Note that this does the same task as convertToButton in the ButtonConfigLoader - but very differently
     *          I'm not sure why though.
     */
    private convertToButton(btn: InPageButtonJson, fullToolbar: ToolbarWip, group: ButtonGroupWip): Button {
        const btnCommand = (btn as unknown as { command: CommandParams; }).command;

        if (!(Commands.get(btnCommand.action))) {
            this.log.add(`couldn't find action ${btnCommand.action} - show warning`);
            console.warn('warning: toolbar-button with unknown action-name:', btnCommand.action);
        }

        const name = btnCommand.action;
        const contentType = btnCommand.contentType;

        // if the button belongs to a content-item, move the specs up to the item into the settings-object
        this.toolbar.command.normalizeCommandJson(btnCommand);

        // parameters adapter from v1 to v2
        const params = { ...this.toolbar.command.removeActionProperty(btnCommand), ...fullToolbar.params };

        // Toolbar API v2
        const newButtonAction = new ButtonCommand(name, contentType, params);
        let newButtonConfig = new Button(newButtonAction, name);

        // settings adapter from v1 to v2
        newButtonConfig = { ...newButtonConfig, ...Button.normalize(btn) };

        // ensure all buttons have either own settings, or the fallback
        this.toolbar.button.addDefaultBtnSettings(newButtonConfig, group as ButtonGroup, fullToolbar, Commands);
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
        const log = new Log('Tlb.ExpBts', this.log, 'start');

        const buttonsWip = root.buttons;

        let newButtons: InPageButtonJson[] = [];

        // convert compact buttons (with multi-verb action objects) into own button-objects
        // important because an older syntax allowed {action: "new,edit", entityId: 17}
        if (Array.isArray(buttonsWip)) {
            log.add(`detected array of btns (${buttonsWip.length}), will ensure it's an object`);
            for (let b = 0; b < buttonsWip.length; b++) {
                const btn = buttonsWip[b] as InPageButtonJson;
                const actionNames = (btn as InPageCommandJson).action;
                if (typeof actionNames === 'string' && actionNames.indexOf(',') > -1) {
                    this.expandButtonAndAddToList(newButtons, btn, actionNames);
                } else {
                    newButtons.push(btn);
                }
            }
        } else if (typeof buttonsWip === 'string') {
            log.add(`detected that it is a string "${buttonsWip}", will split by "," and ...`);
            this.expandButtonAndAddToList(newButtons, {}, buttonsWip);
        } else {
            log.add('no special case detected, will use the buttons-object as is');
            newButtons = buttonsWip;
        }
        log.add(`after check, found ${newButtons.length} buttons`);

        // optionally add a more-button in each group
        this.addMoreButton(settings, newButtons);

        const result = newButtons.map((x) => this.toolbar.button.normalize(x)); // ensure the internal def is also an array now
        log.add('done');
        return result;
    }


    private expandButtonAndAddToList(list: InPageButtonJson[], btn: InPageButtonJson, names: string): void {
        this.log.add(`button def "${btn} is string of ma.ny names, will expand into array with action-properties"`);
        const actions = names.split(',');
        for (let a = 0; a < actions.length; a++)
            list.push({...btn, ...this.toolbar.button.getFromName(actions[a])} as InPageButtonJson);
    }

    /** Add the "more" button at the end or beginning */
    private addMoreButton(settings: ToolbarSettings, list: InPageButtonJson[]): void {
        const addMore = settings.autoAddMore;
        if (addMore) {
            const moreButton = this.toolbar.button.getFromName('more');
            if ((addMore === 'end') || (addMore.toString() === 'right')) { // fallback for older v1 setting
                this.log.add('will add a more "..." button to end');
                list.push(moreButton); // 'more');
            } else {
                this.log.add('will add a more "..." button to start');
                list.unshift(moreButton); // 'more');
            }
        } else this.log.add('will not add more "..." button');
    }


}