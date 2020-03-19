﻿import { SxcInstanceEngine } from '../../commands';
import { SxcIntanceEditable } from '../../interfaces/sxc-instance-editable';
import { windowInPage as window } from '../../interfaces/window-in-page';
import { getTag } from '../../manage/api';


/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
export class ActionMenuMapper {
  private run: typeof SxcInstanceEngine.prototype.run;
  private tag: HTMLElement;
  private sxc: SxcIntanceEditable;

  constructor(moduleId: number) {
    this.sxc = SxcIntanceEditable.get(moduleId);
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
