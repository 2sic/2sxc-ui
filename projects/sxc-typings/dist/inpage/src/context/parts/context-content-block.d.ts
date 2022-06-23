import { AttrJsonEditContext } from '../html-attribute';
/**
 * information related to the current contentBlock, incl
 * @internal
 */
export declare class ContextOfContentBlock {
    isCreated: boolean;
    isList: boolean;
    queryId: number;
    templateId: number;
    contentTypeId: string;
    contentGroupId: string;
    templatePath?: string;
    TemplateIsShared: boolean;
    edition?: string;
    constructor(editCtx: AttrJsonEditContext);
}
