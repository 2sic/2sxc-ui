import { Command } from '../../commands/command';
import { CommandParams } from '../../commands/command-params';
import { Commands } from '../../commands/commands';

export class ButtonCommand {
    readonly commandDefinition: Command; // reference to action to be run

    customCode: string; // custom code if used

    constructor(
        public name: string,
        contentType?: string,
        public params?: CommandParams,
    ) {
        if (!params) this.params = {};

        if (contentType) this.params.contentType = contentType;

        // activate command for this
        this.commandDefinition = Commands.get(name);
    }

    static normalize(action: ButtonCommand): CommandParams {
        let params: CommandParams = {};
        if (action) {
            if (action.name) params.action = action.name;
            if (action.params) params = {...params, ...action.params}; // O.bject.assign(params, action.params);
        }
        return params;
    }
}
