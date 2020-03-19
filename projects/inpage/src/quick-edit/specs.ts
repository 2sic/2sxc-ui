export class Specs {
  /** The parent is either "dnn" or a module information */
  parent: string | number;

  /** The field inside the parent used for this content */
  field: string;

  /**  */
  list: JQuery;
  item: HTMLElement;
  index: number;
  type: string;
}
