﻿import { Commands } from '..';

export const CmdTemplateQuery = 'template-query';
/**
 * import this module to commands.ts
 */
Commands.add(CmdTemplateQuery, 'QueryEdit', 'filter', true, false, {
    dialog: (_) => 'pipeline-designer',

    addParamsToLink: (ctx) => ({ pipelineId: ctx.contentBlock.queryId }),

    newWindow: (_) => true,

    disabled: (ctx) => ctx.app.settingsId === null || !ctx.contentBlock.queryId,

    title: (ctx) => `Toolbar.QueryEdit${ctx.contentBlock.queryId === null ? 'Disabled' : ''}`,

    showCondition: (ctx) => !!ctx.user.canDesign && !ctx.app.isContent,

    // if it doesn't have a query, make it less strong
    dynamicClasses: (ctx) => ctx.contentBlock.queryId ? '' : 'empty',
});
