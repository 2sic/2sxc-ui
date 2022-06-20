import { Button } from '../toolbar/config/button';

/**
 * @internal
 */
export class Command {
    constructor(public name: string) {
    }

    /** the defaults are important for new buttons that just know this command */
    buttonDefaults: Partial<Button>;

    /**
     * 
     * @param icon 
     * @param translateKey 
     * @param uiOnly 
     * @param partOfPage 
     * @param more 
     * @internal
     */
    mergeDefaults(translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): void {
      if (typeof (partOfPage) !== 'boolean')
        throw 'partOfPage in commands not provided, order will be wrong!';


      this.buttonDefaults = {
            icon: (_) => `icon-sxc-${icon}`,
            title: (_) => `Toolbar.${translateKey}`,
            uiActionOnly: (_) => uiOnly,
            partOfPage: (_) => partOfPage,
            ...more,
        };
    }

    /**
     * 
     * @param name 
     * @param translateKey 
     * @param icon 
     * @param uiOnly 
     * @param partOfPage 
     * @param more 
     * @returns 
     * @internal
     */
    static build(name: string,
                 translateKey: string,
                 icon: string,
                 uiOnly: boolean,
                 partOfPage: boolean,
                 more: Partial<Button>,
                 ): Command {

        const commandDefinition = new Command(name);

        // Toolbar API v2
        commandDefinition.mergeDefaults(translateKey, icon, uiOnly, partOfPage, more);

        return commandDefinition;
    }
}
