import { TemplateConstants as TC, ToolbarTemplate } from '.';

/**
 * @internal
 */
// the default / initial buttons in a standard toolbar
export const ToolbarTemplateSublist: ToolbarTemplate = {
  name: 'sublist',
  groups: [
    {
      name: TC.GroupDefault,
      buttons: 'edit,new,publish',
      defaults: {
        classes: 'group-inlist',
      },
    }, {
      name: TC.GroupList,
      buttons: 'add-existing,replace,remove,moveup,movedown,instance-list',
      defaults: {
        classes: 'group-inlist',
      },
    }, {
      name: TC.GroupEditAdvanced,
      buttons: 'delete',
      defaults: {
        classes: 'group-inlist',
      },
    },
  ],
  defaults: {},
  params: {},
  settings: {},
  _isToolbarTemplate: true,
};
