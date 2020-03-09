import { windowInPage as window } from '../interfaces/window-in-page';
import { getTag } from '../manage/api';
import { getSxcInstance } from '../x-bootstrap/sxc';

/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
export class ActionMenuMapper {
  private run: any;
  private tag: HTMLElement;
  private sxc: SxcInstanceWithInternals;

  constructor(moduleId: number) {
    this.sxc = getSxcInstance(moduleId) as SxcInstanceWithInternals;
    this.tag = getTag(this.sxc);
    this.run = this.sxc.manage.run;
  }

  changeLayoutOrContent = () => { this.run('layout'); };

  addItem = () => { this.run('add', { useModuleList: true, sortOrder: 0 }); };

  edit = () => {
    this.run('edit', { useModuleList: true, sortOrder: 0 });
  };

  adminApp = () => { this.run('app'); };

  adminZone = () => { this.run('zone'); };

  develop = () => { this.run('template-develop'); };
}

window.$2sxcActionMenuMapper = (moduleId: number) => {
  return new ActionMenuMapper(moduleId);
};
