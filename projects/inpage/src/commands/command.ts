import { Button } from '../toolbar/config/button';

export class Command {
    constructor(public name: string) {
    }

    /** the defaults are important for new buttons that just know this command */
    buttonDefaults: Partial<Button>;

    protected merge(icon: string, translateKey: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): void {
        this.buttonDefaults = {
            icon: (_) => `icon-sxc-${icon}`,
            title: (_) => `Toolbar.${translateKey}`,
            uiActionOnly: (_) => uiOnly,
            partOfPage: (_) => partOfPage,
            ...more,
        };
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
        commandDefinition.merge(icon, translateKey, uiOnly, partOfPage, more);

        return commandDefinition;
    }
}
