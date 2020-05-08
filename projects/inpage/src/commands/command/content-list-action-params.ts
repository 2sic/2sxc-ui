/**
 * params for getAndReload WebAPI
 */
export class ContentListActionParams {
  id?: number;

  /** TODO: unclear if this really serves a purpose. it's only used in publish, replace etc., and I assume it must always publish both... */
  part?: string;

  parent?: string;
  fields?: string;

  /** The index for this item */
  index?: number;

  /** target index when re-ordering an item */
  toIndex?: number;
}
