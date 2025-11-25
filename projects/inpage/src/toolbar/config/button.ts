import { CommandWithParams } from '.';
import { CommandNames } from '../../commands';
import { ContextComplete } from '../../context/bundles/context-bundle-button';
import { ButtonDefinition } from './button-definition';

/**
 * This is the most common call signature on most ButtonConfig properties
 * @public
 */
export type ButtonPropGen<T> = (context: ContextComplete) => T;

export type ButtonPropGenOrValue<T> = ButtonPropGen<T> | T;

/**
 * The real button configuration as it's used at runtime.
 * It identifies the button by an ID, has the command to run, and
 * gets defaults from the command definition.
 * @internal
 */
export class ButtonConfiguration {
  /** The ID is important for tracking this button and applying modifiers */
  id: string;

  /** The underlying command which will be run */
  command: CommandWithParams;

  /** The definition defaults to use for this button */
  definition: Partial<ButtonDefinition>;

  constructor(nameOrNamePair: string, command: CommandWithParams, public overrides?: Partial<ButtonDefinition>) {
    // super();
    this.command = command;
    // if the name is an identifier like "someId=add", split it
    // note: as of 2025-11 2dm is not sure when this would be used
    const parts = ButtonConfiguration.splitName(nameOrNamePair);
    this.id = parts.id;

    this.definition = command.commandDef?.buttonDefaults || {};
  }

  static splitName(identifier: string): { id: string, name: CommandNames } {
    const parts = identifier.split('=');
    return { id: parts[0], name: (parts[1] || identifier) as CommandNames};
  }

  /** Detect if this is a Button */
  static is(thing: unknown): thing is ButtonConfiguration {
    return (thing as ButtonConfiguration).command !== undefined;
  }

  static isButtonArray(thing: unknown): thing is ButtonConfiguration[] {
    return (thing as ButtonConfiguration[]).length && ButtonConfiguration.is((thing as ButtonConfiguration[])[0]);
  }

}