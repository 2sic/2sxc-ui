import { SxcInstanceEngine } from '../../commands';
import { CmdLayout } from '../../commands/command/layout';
import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { HasLog, Insights } from '../../logging';


/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
export class DnnActionMenu extends HasLog {
    private run: typeof SxcInstanceEngine.prototype.run;
    private sxc: SxcEdit;

    constructor(moduleId: number) {
        super('Dnn.Menu', null, `modId: ${moduleId}`);
        Insights.add('dnn-menu', `mod: ${moduleId}`, this.log);
        this.sxc = SxcEdit.get(moduleId);
        this.run = this.sxc.manage.run;
    }

    changeLayoutOrContent = () => { this.run(CmdLayout); };

    // 2020-04-21 2dm disabled this, as it doesn't make sense to have this in the DNN menu - since add can be used in each position
    // addItem = () => { this.run('new', { useModuleList: true, sortOrder: 0 }); };

    edit = () => { this.run('edit', { useModuleList: true, sortOrder: 0 }); };

    adminApp = () => { this.run('app'); };

    adminZone = () => { this.run('zone'); };

    develop = () => { this.run('template-develop'); };
}

