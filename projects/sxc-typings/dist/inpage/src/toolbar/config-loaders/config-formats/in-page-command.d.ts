import { CommandNames } from '../../../commands';
import { TypeTbD } from '../../../plumbing/TypeTbD';
/**
 * @internal
 */
export interface InPageCommandJsonWithTooMuchInfo extends InPageCommandJson {
    entity?: {
        EntityId: number;
        _2sxcEditInformation: {
            sortOrder?: number;
        };
    };
}
/**
 * @internal
 */
export declare class InPageCommandJson {
    /** List of buttons to show */
    action?: CommandNames;
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
    fields?: string;
    static hasActions(thing: TypeTbD): thing is InPageCommandJson;
    static hasModify(thing: TypeTbD): thing is InPageCommandJson;
    /** Important for object merging - because otherwise action will be preserved */
    static noAction(thing: InPageCommandJson): InPageCommandJson;
}
