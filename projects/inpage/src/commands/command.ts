import { ContextComplete } from '../context/bundles/context-bundle-button';
import { Button } from '../toolbar/config/button';

export class Command {
    constructor(public name: string) {
    }

    buttonConfig: Partial<Button>;

    protected merge(icon: string, translateKey: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): void {
        //
        // stv: v1 code
        const partialButtonConfig: Partial<Button> = {
            icon: (context: ContextComplete) => `icon-sxc-${icon}`,
            title: (context: ContextComplete) => `Toolbar.${translateKey}`,
            uiActionOnly: (context: ContextComplete) => uiOnly,
            partOfPage: (context: ContextComplete) => partOfPage,
            ...more,
        };

        // O.bject.assign(partialButtonConfig, more);

        this.buttonConfig = partialButtonConfig;
    }

    static build(name: string,
                 translateKey: string,
                 icon: string,
                 uiOnly: boolean,
                 partOfPage: boolean,
                 more: Partial<Button>,
                 ): Command {

        if (typeof (partOfPage) !== 'boolean')
            throw 'partOfPage in commands not provided, order will be wrong!';

        const commandDefinition = new Command(name);

        // Toolbar API v2
        // this.commandDefinition.name = name;
        commandDefinition.merge(icon, translateKey, uiOnly, partOfPage, more);

        return commandDefinition;
    }
}
