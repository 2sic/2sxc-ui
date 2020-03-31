import { TypeTbD } from '../../../plumbing/TypeTbD';

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

    /** index in the list */
    sortOrder?: number;

    /** Experimental in 10.27 */
    modify?: string;

    /** Experimental for 10.30 */
    parent?: string;
    /** Experimental for 10.30 */
    field?: string;

    static hasActions(thing: TypeTbD): thing is InPageCommandJson {
        // check two common signatures - command and action
        return typeof(thing as InPageCommandJson).action === 'string';
    }

    static hasModify(thing: TypeTbD): thing is InPageCommandJson {
        // check two common signatures - command and action
        return !!(thing as InPageCommandJson).modify;
    }

    /** Important for object merging - because otherwise action will be preserved */
    static noAction(thing: InPageCommandJson) {
        // some clean-up
        delete thing.action; // remove the action property
        return thing;
    }


}
