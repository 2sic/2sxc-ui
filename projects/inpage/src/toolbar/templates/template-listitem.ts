import { TemplateConstants, ToolbarTemplate } from '.';

// the default / initial buttons in a standard toolbar
// ToDo: refactor to avoid side-effects
export const ToolbarTemplateInListRight: ToolbarTemplate = {
  name: 'listitem',
  groups: [
    {
      name: TemplateConstants.NameDefault,
      buttons: 'edit,new,publish',
      defaults: {
        classes: 'group-inlist',
      },
    }, {
      name: 'list',
      buttons: 'add,remove,moveup,movedown,instance-list,replace,item-history',
      defaults: {
        classes: 'group-inlist',
      },
    }, {
      name: 'data',
      buttons: 'delete',
      defaults: {
        classes: 'group-inlist',
      },
    }, {
      name: 'instance',
      buttons: 'contentitems,contenttype',
      defaults: {
        classes: 'group-inlist group-pro',
      },
    },
  ],
  defaults: {},
  params: {},
  settings: {
    autoAddMore: 'end',
  },
  _isToolbarTemplate: true,
};
