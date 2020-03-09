import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class TemplateQuery extends CommandBase {
  constructor() {
    super();
    this.makeDef('template-query',
      'QueryEdit',
      'filter',
      true,
      false,
      {
        dialog: (context) => 'pipeline-designer',
        params: (context) => {
          return { pipelineId: context.contentBlock.queryId };
        },
        newWindow: (context) =>true,
        disabled: (context) => {
          return context.app.settingsId === null;
        },
        title: (context) => `Toolbar.QueryEdit${context.contentBlock.queryId === null ? 'Disabled' : ''}`,
        showCondition: (context) => {
          return (context.user.canDesign) && (!context.app.isContent);
        },
        dynamicClasses: (context) => {
          return context.contentBlock.queryId ? '' : 'empty'; // if it doesn't have a query, make it less strong
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new TemplateQuery();
