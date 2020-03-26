
// tslint:disable-next-line: max-classes-per-file
export class ButtonModifier {
    operation: '+' | '-' | null = null;

    /** the button name, always lower case */
    name: string;

    constructor(code: string) {
        if (!code || !code.length) return;

        if (code[0] === '+') this.operation = '+';
        if (code[0] === '-') this.operation = '-';
        if (this.operation) this.name = code.substring(1).toLocaleLowerCase();
    }

    static check(modifiers: ButtonModifier[], name: string): { add: boolean, remove: boolean, reason: string } {
        if (!name) return { add: false, remove: false, reason: 'no name'};

        const mod = modifiers.find((m) => m.name === name);
        if (!mod) return {add: false, remove: false, reason: 'not found'};

        if (mod.operation === '+') return {add: true, remove: false, reason: 'found'};
        if (mod.operation === '-') return {add: false, remove: true, reason: 'found'};
        return {add: false, remove: false, reason: 'unknown'};
    }
}
