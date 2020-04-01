import { CommandParams } from '..';
import { ContextComplete } from '../../context';


export class SharedLogic {
    static paramsPreferListParamsToId(context: ContextComplete): CommandParams {
        const params = context.button.command.params;
        if (params.useModuleList)
            return {
                useModuleList: true,
                sortOrder: params.sortOrder,
            };
        return params;
    }
}
