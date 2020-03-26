
// tslint:disable-next-line: max-classes-per-file
export class ButtonModifier {
    // operation: '+' | '-' | null = null;

    /** the button name, always lower case */
    name: string;

    add: boolean = false;
    remove: boolean = false;

    constructor(code: string) {
        if (!code || !code.length) return;
        code = code.trim();
        if (!code || !code.length) return;

        if (code[0] === '+') this.add = true; // this.operation = '+';
        if (code[0] === '-') this.remove = true; // this.operation = '-';
        this.name = ((this.add || this.remove) ? code.substring(1) : code)
            .toLocaleLowerCase();
    }

    static findOrCreate(modifiers: ButtonModifier[], name: string): ButtonModifier & { reason: string } {
        if (!name) return { reason: 'no name', ...new ButtonModifier(name)};

        const mod = modifiers.find((m) => m.name === name);
        if (!mod) return {reason: 'not found', ...new ButtonModifier(name)};

        if (mod.add || mod.remove) return { reason: 'found', ...mod};
        return { reason: 'unknown', ...new ButtonModifier(name)};
    }
}
