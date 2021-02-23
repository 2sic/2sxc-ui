import { TemplateConstants as TC, ToolbarTemplate } from '.';

// the default / initial buttons in a standard toolbar
export const ToolbarTemplateEmpty: ToolbarTemplate = {
  name: TC.NameEmpty,
  groups: [
    {
      name: TC.GroupDefault,
      buttons: '',
    },
  ],
  defaults: {},
  params: {},
  settings: {
    autoAddMore: 'end',
  },
  _isToolbarTemplate: true,
};
