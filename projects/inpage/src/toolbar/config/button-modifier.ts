
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
}