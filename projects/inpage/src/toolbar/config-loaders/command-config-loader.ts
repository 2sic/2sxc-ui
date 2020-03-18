import { ToolbarConfigLoader } from '.';
import { InPageCommandJson, InPageCommandJsonWithTooMuchInfo } from '.';
import { HasLog } from '../../logging';

export class CommandConfigLoader extends HasLog {

    constructor(private toolbar: ToolbarConfigLoader) {
        super('Tlb.CmdLdr', toolbar.log);
    }
    /**
     * entity support (vertical compatibility for pre 2sxc v9.x)
     * does some clean-up work on a button-definition object
     * because the target item could be specified directly, or in a complex internal object called entity
     * @param actDef
     */
    normalizeCommandJson(actDef: InPageCommandJsonWithTooMuchInfo): InPageCommandJson {

        if (!actDef.entity || !actDef.entity._2sxcEditInformation) {
        return actDef as InPageCommandJson;
        }

        const editInfo = actDef.entity._2sxcEditInformation;
        actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list

        if (actDef.entity.EntityId !== undefined) {
        actDef.entityId = actDef.entity.EntityId;
        }

        if (editInfo.sortOrder !== undefined) {
        actDef.sortOrder = editInfo.sortOrder;
        }

        delete actDef.entity; // clean up edit-info
        return actDef;
    }

    removeActionProperty(oldParameters: InPageCommandJson): InPageCommandJson {
        //   const newParams = oldParameters;
        // some clean-up
        delete oldParameters.action; // remove the action property
        return oldParameters;
    }

}

