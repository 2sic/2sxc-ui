import { Button } from '../toolbar/config/button';
/**
 * @internal
 */
export declare class Command {
    name: string;
    constructor(name: string);
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
    mergeDefaults(translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): void;
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
    static build(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Partial<Button>): Command;
}
