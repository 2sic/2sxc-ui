import { TemplateConstants as TC, ToolbarTemplate } from '.';

/**
 * @internal
 */
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
  settings: {},
  _isToolbarTemplate: true,
};
