/**
 * entity support (vertical compatibility for pre 2sxc v9.x)
 * does some clean-up work on a button-definition object
 * because the target item could be specified directly, or in a complex internal object called entity
 * @param actDef
 */
export function flattenActionDefinition(actDef: any): void {

  if (!actDef.entity || !actDef.entity._2sxcEditInformation) {
    return;
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
}
