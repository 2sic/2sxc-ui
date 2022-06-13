import { Sxc } from '../../../../$2sxc/src';
import { CmdLayout } from '../../commands/command/layout';
import { HasLog, Insights } from '../../logging';
import { EditManager } from '../../manage/edit-manager';


/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 * @internal
 */
export class DnnActionMenu extends HasLog {
    private run: typeof EditManager.prototype.run;
    private sxc: Sxc;

    constructor(moduleId: number) {
        super('Dnn.Menu', null, `modId: ${moduleId}`);
        Insights.add('dnn-menu', `mod: ${moduleId}`, this.log);
        this.sxc = window.$2sxc(moduleId);
        this.run = (this.sxc.manage as EditManager).run;
    }

    changeLayoutOrContent = () => { this.run(CmdLayout); };

    // 2020-04-21 2dm disabled this, as it doesn't make sense to have this in the DNN menu - since add can be used in each position
    // addItem = () => { this.run('new', { useModuleList: true, sortOrder: 0 }); };

    edit = () => { this.run('edit', { useModuleList: true, sortOrder: 0 }); };

    adminApp = () => { this.run('app'); };

    adminZone = () => { this.run('zone'); };

    develop = () => { this.run('template-develop'); };
}

