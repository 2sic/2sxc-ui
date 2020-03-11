
export interface InPageCommandConfigurationWithTooMuchInfo extends InPageCommandConfiguration {
    entity?: {
        EntityId: number,
        _2sxcEditInformation: {
            sortOrder?: number,
        },
    };
    sortOrder?: number;
}

export interface InPageCommandConfiguration  {
    action?: string;
    entityId?: number;
    contentType?: string;
    useModuleList?: boolean;
}

export function isInPageCommandConfiguration(thing: any): thing is InPageCommandConfiguration {
  // check two common signatures - command and action
  return typeof(thing as InPageCommandConfiguration).action === 'string';
}
