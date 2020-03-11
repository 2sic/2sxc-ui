
export interface InPageCommandConfiguration  {
    action?: string;
    entityId?: number;
    contentType?: string ;
}

export function isInPageCommandConfiguration(thing: any): thing is InPageCommandConfiguration {
  // check two common signatures - command and action
  return typeof(thing as InPageCommandConfiguration).action === 'string';
}
