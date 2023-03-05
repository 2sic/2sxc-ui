﻿import { Button } from '../toolbar/config/button';

export const iconPrefix = 'icon-sxc-';
export const tlbI18nPrefix = 'Toolbar.';

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
     * @internal
     */
    mergeDefaults(translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): void {
      if (typeof (partOfPage) !== 'boolean')
        throw 'partOfPage in commands not provided, order will be wrong!';


      this.buttonDefaults = {
            icon: (_) => `${iconPrefix}${icon}`,
            title: (_) => `${tlbI18nPrefix}${translateKey}`,
            uiActionOnly: (_) => uiOnly,
            partOfPage: (_) => partOfPage,
            color: (_) => undefined,
            ...more,
        };
    }

    /**
     * 
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

        const cmd = new Command(name);

        // Toolbar API v2
        cmd.mergeDefaults(translateKey, icon, uiOnly, partOfPage, more);

        return cmd;
    }

    /**
     * @internal
     */
    static clone(command: Command, name: string) {
      const clone = new Command(name);
      clone.buttonDefaults = command.buttonDefaults;
      return clone;
    }
}
