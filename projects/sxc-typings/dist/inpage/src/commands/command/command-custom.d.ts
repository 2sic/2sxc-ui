/**
 * Parameters used for the command `custom` on toolbars.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandCustomParams {
    /**
     * Name of the function to call - must be available in the context.
     * This is usually as a function window. Example:
     * <br>
     * If `call` is `sayHello` you need a `window.sayHello(context, event)`.
     */
    call: string;
    /**
     * **OBSOLETE - avoid using**
     * <br>
     * JavaScript as string containing the code to execute.
     * This is the old V9 name.
     */
    customCode: string;
}
