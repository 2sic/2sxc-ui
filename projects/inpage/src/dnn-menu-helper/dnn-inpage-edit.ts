import { InstanceEngine } from '../commands/instance-engine';
import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { windowInPage as window } from '../interfaces/window-in-page';
import { getTag } from '../manage/api';
import { getSxc } from '../plumbing/getSxc';

/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
export class ActionMenuMapper {
  private run: typeof InstanceEngine.prototype.run;
  private tag: HTMLElement;
  private sxc: SxcIntanceEditable;

  constructor(moduleId: number) {
    this.sxc = getSxc(moduleId);
    this.tag = getTag(this.sxc);
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
