import { TypeTbD } from '../../plumbing/TypeTbD';

export interface InPageCommandJsonWithTooMuchInfo extends InPageCommandJson {
    entity?: {
        EntityId: number,
        _2sxcEditInformation: {
            sortOrder?: number,
        },
    };
    sortOrder?: number;
}

export class InPageCommandJson  {
    action?: string;
    entityId?: number;
    contentType?: string;
    useModuleList?: boolean;

    static is(thing: TypeTbD): thing is InPageCommandJson {
        // check two common signatures - command and action
        return typeof(thing as InPageCommandJson).action === 'string';
    }
}

// export function isInPageCommandConfiguration(thing: TypeTbD): thing is InPageCommandJson {
//   // check two common signatures - command and action
//   return typeof(thing as InPageCommandJson).action === 'string';
// }
