import { TypeTbD } from '../../plumbing/TypeTbD';

export interface InPageCommandJsonWithTooMuchInfo extends InPageCommandJson {
    entity?: {
        EntityId: number,
        _2sxcEditInformation: {
            sortOrder?: number,
        },
    };
}

export class InPageCommandJson  {
    /** List of buttons to show */
    action?: string;

    /** The entity id to edit */
    entityId?: number;

    /** the content-type for new items */
    contentType?: string;

    /** determines that we should use a module list */
    useModuleList?: boolean;

    /** index in the module list */
    sortOrder?: number;

    /** Experimental 10.27 */
    parent?: number;
    /** Experimental 10.27 */
    field?: string;

    static hasActions(thing: TypeTbD): thing is InPageCommandJson {
        // check two common signatures - command and action
        return typeof(thing as InPageCommandJson).action === 'string';
    }
}
