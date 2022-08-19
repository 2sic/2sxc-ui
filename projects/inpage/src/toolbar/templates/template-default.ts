import { TemplateConstants as TC, ToolbarTemplate } from '.';
import { CommandNames as CN } from '../../commands';

/**
 * @internal
 */
// the default / initial buttons in a standard toolbar
export const ToolbarTemplateDefault: ToolbarTemplate = {
  name: TC.NameDefault,
  groups: [
    {
      name: TC.GroupDefault,
      buttons: [CN.edit, CN.new, CN.metadata, CN.publish, CN.layout].join(','),
    }, {
      name: TC.GroupList,
      buttons: [CN.add, CN.addExisting, CN.replace, CN.remove, CN.moveUp, CN.moveDown, CN.list].join(','),
    }, {
      name: TC.GroupEditAdvanced,
      buttons: [CN.delete].join(','),
    }, {
      name: TC.GroupView,
      buttons: [CN.template, CN.view, CN.data, CN.query, CN.fields].join(','),
      defaults: {
        classes: 'group-pro',
      },
    }, {
      name: TC.GroupApp,
      buttons: [CN.app, CN.appSettings, CN.appResources, CN.system, CN.insights].join(','),
      defaults: {
        classes: 'group-pro',
      },
    },
  ],
  defaults: {},
  params: {},
  settings: {
    autoAddMore: 'end',
    // these are defaults, don't set again
    // hover: "right",
  },
  _isToolbarTemplate: true,
};
