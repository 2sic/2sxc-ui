import { Command, CommandNames, CommandParams } from '../../commands';
import { TypeValue } from '../../plumbing';
/**
 * @internal
 */
export declare class ButtonCommand {
    name: CommandNames;
    params?: CommandParams;
    readonly command: Command;
    constructor(name: CommandNames, contentType?: string, params?: CommandParams);
    /** make static, as many ButtonCommand signatures are actually not objects */
    static mergeAdditionalParams(command: ButtonCommand, additionalParams: Record<string, TypeValue>): CommandParams;
}
