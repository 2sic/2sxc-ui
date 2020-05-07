/**
 * params for getAndReload WebAPI
 */
export class ContentListActionParams {
  id?: number;
  part?: string;
  parent?: string;
  fields?: string;
//   sortOrder?: number;

  // temp: new replacement for sortOrder
  index?: number;
  toIndex?: number;
}
