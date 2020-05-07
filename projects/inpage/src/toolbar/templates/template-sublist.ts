import { TemplateConstants as TC, ToolbarTemplate } from '.';

// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
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
      buttons: /* 'add,' + */ 'add-existing,replace,remove,moveup,movedown,instance-list,item-history',
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
    // {
    //   name: TC.GroupApp,
    //   buttons: 'contentitems,contenttype',
    //   defaults: {
    //     classes: 'group-inlist group-pro',
    //   },
    // },
  ],
  defaults: {},
  params: {},
  settings: {
    autoAddMore: 'end',
  },
  _isToolbarTemplate: true,
};
