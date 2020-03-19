import { SxcInstanceEngine } from '../../commands';
import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { windowInPage as window } from '../../interfaces/window-in-page';


/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
export class ActionMenuMapper {
  private run: typeof SxcInstanceEngine.prototype.run;
  private tag: HTMLElement;
  private sxc: SxcEdit;

  constructor(moduleId: number) {
    this.sxc = SxcEdit.get(moduleId);
    this.tag = SxcEdit.getTag(this.sxc);
    this.run = this.sxc.manage.run;
  }

  changeLayoutOrContent = () => { this.run('layout'); };

  addItem = () => { this.run('add', { useModuleList: true, sortOrder: 0 }); };

  edit = () => { this.run('edit', { useModuleList: true, sortOrder: 0 }); };

  adminApp = () => { this.run('app'); };

  adminZone = () => { this.run('zone'); };

  develop = () => { this.run('template-develop'); };
}

window.$2sxcActionMenuMapper = (moduleId: number) => {
  return new ActionMenuMapper(moduleId);
};
