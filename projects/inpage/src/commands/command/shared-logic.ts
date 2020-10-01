import { ContextComplete } from '../../context';

/**
 * TODO: place shared logic like for deciding if we show list buttons
 * here
 */
export class SharedLogic {
    // static paramsPreferListParamsToId(context: ContextComplete): CommandParams {
    //     const params = context.button.command.params;
    //     if (params.useModuleList)
    //         return {
    //             useModuleList: true,
    //             sortOrder: params.sortOrder,
    //         };
    //     return params;
    // }

    static isBlockList(context: ContextComplete) {
        return !!(context.contentBlock.isList &&
            context.button.command.params.useModuleList &&
            context.button.command.params.sortOrder !== -1);    // -1 is the header item
    }

    static isFieldList(context: ContextComplete) {
        const params = context.button?.command.params;
        return !!(params?.fields && params?.parent);
    }

    static isList(context: ContextComplete) {
        return this.isBlockList(context) || this.isFieldList(context);
    }
}
