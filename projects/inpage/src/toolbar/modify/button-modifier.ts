import { Rule } from '.';


// tslint:disable-next-line: max-classes-per-file
export class ButtonModifier {

    /** the button name, always lower case */
    name: string;

    /** if this button should be added / activated */
    add: boolean = false;

    /** if this button should be removed */
    remove: boolean = false;

    /** true if there are really rules that apply */
    found: boolean = false;

    constructor(code: string, public rules?: Rule) {
        // handle the key / code
        if (!code || !code.length) return;
        code = code.trim();
        if (!code || !code.length) return;

        if (code[0] === '+') this.add = true;
        if (code[0] === '-') this.remove = true;
        this.name = ((this.add || this.remove) ? code.substring(1) : code)
            .toLocaleLowerCase();

        this.found = this.add || this.remove || !!rules;
    }

    static findOrCreate(modifiers: ButtonModifier[], name: string): ButtonModifier & { reason: string } {
        if (!name) return { reason: 'no name', ...new ButtonModifier(name)};

        if (!modifiers) return { reason: 'no modifiers', ...new ButtonModifier(name)};

        const mod = modifiers.find((m) => m.name === name);
        if (!mod) return {reason: 'modifier not found', ...new ButtonModifier(name)};

        return { reason: 'modifier found', ...mod};
    }

    // static findDefault()
}
