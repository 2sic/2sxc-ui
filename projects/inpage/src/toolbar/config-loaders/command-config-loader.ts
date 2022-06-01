import { ToolbarConfigLoader } from '.';
import { InPageCommandJson, InPageCommandJsonWithTooMuchInfo } from '.';
import { HasLog } from '../../logging';

/**
 * @internal
 */
export class CommandConfigLoader extends HasLog {

    constructor(private toolbar: ToolbarConfigLoader) {
        super('Tlb.CmdLdr', toolbar.log);
    }
    /**
     * entity support (compatibility for pre 2sxc v9.x)
     * does some clean-up work on a button-definition object
     * because the target item could be specified directly, or in a complex internal object called entity
     * @param actDef
     */
    updateToV9(actDef: InPageCommandJsonWithTooMuchInfo): InPageCommandJson {

        // doesn't have the pre-V9 properties, so we're fine
        if (!actDef.entity || !actDef.entity._2sxcEditInformation)
            return actDef as InPageCommandJson;

        const editInfo = actDef.entity._2sxcEditInformation;

        // move up sortOrder property and set useModuleList
        actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
        if (editInfo.sortOrder !== undefined)  actDef.sortOrder = editInfo.sortOrder;

        // move up entityId and clean-up the old 'entity' property
        if (actDef.entity.EntityId !== undefined) actDef.entityId = actDef.entity.EntityId;
        delete actDef.entity;

        return actDef;
    }

}

