import { ToolbarTemplate, ToolbarTemplateGroup } from '.';
import { HasLog } from '../../logging';
import { ToolbarConfigLoader } from '../config-loaders';
import { TemplateConstants as TC } from './constants';


export class TemplateEditor extends HasLog {
    constructor(public toolbar: ToolbarConfigLoader) {
        super('Tlb.TplEdt', toolbar.log);
    }

    addButton(template: ToolbarTemplate, groupName: string, id: string, name: string, pos: number, fromStart: boolean): void {
        const cl = this.log.call('addButton', `..., ${groupName}, ${name}`);
        if (!template) return cl.done('no template');
        let group = this.findGroupOrDefault(template, groupName);
        if (!group) group = this.addGroup(template, groupName, 1000, true); // create group at end
        const buttons = group.buttons?.split(TC.ButtonSeparator) ?? [];
        const buttonId = id === name ? name : `${id}=${name}`;
        const posStartEnd = this.correctPosStartEnd(buttons, pos, fromStart);
        const posInsert = fromStart ? this.findGroupInsertPosition(group, posStartEnd) : posStartEnd;
        cl.add(`pos: ${pos}, startEnd: ${posStartEnd}, insert:${posInsert}`);
        buttons.splice(posInsert, 0, buttonId);
        group.buttons = buttons
            .filter((b) => b.length) // drop empty items
            .join(TC.ButtonSeparator);
        cl.done();
    }
    private findGroupInsertPosition(group: ToolbarTemplateGroup, pos: number): number {
        group._insertIndex = group._insertIndex || 0;
        if (pos === 0) {
            group._insertIndex++;
            pos = group._insertIndex;
        }
        return pos;
    }

    private correctPosStartEnd(target: Array<unknown>, pos: number, fromStart: boolean) {
        if (fromStart) return pos;
        pos = target.length - pos;
        return pos >= 0 ? pos : target.length;
    }

    addGroup(template: ToolbarTemplate, groupName: string, pos: number, fromStart: boolean): ToolbarTemplateGroup {
        const cl = this.log.call('addGroup', `..., ${groupName}, ${pos}`);
        this.ensureGroups(template);
        const alreadyExists = this.findGroup(template, groupName);
        if (alreadyExists) return cl.return(alreadyExists, 'already exists');
        const newGroup = new ToolbarTemplateGroup();
        newGroup.name = groupName;
        template.groups.splice(this.correctPosStartEnd(template.groups, pos, fromStart), 0, newGroup);
        return cl.return(newGroup, 'created');
    }

    private ensureGroups = (template: ToolbarTemplate): void => { if (!template.groups) template.groups = []; };
    private findGroup = (template: ToolbarTemplate, name: string): ToolbarTemplateGroup =>
        template.groups.find((t) => t.name === name)

    private findGroupOrDefault(template: ToolbarTemplate, name: string): ToolbarTemplateGroup {
        const cl = this.log.call('findGroup', name);
        this.ensureGroups(template);
        if (template.groups.length === 0) return cl.return(null, 'no groups');
        const found = this.findGroup(template, name);
        if (found) return cl.return(found, 'found');
        return cl.return(template.groups[0], 'not found, return first)');
    }
}
