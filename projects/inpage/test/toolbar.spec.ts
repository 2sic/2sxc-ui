import { expect, test, describe } from 'vitest';
import { CommandNames } from "../../$2sxc/src/cms/command-names";
import { CommandParams } from "../../$2sxc/src/cms/command-params";
import { TypeValue } from "../../core/plumbing/type-value";
import { Commands } from "../src/commands/commands";
import { CommandWithParams } from "../src/toolbar/config/button-command";

const testCommand = "TestCommand" as CommandNames;

describe("ButtonCommand", function () {
  describe("ButtonCommand", function () {

    test("test-command should not exist in commands", function () {
      const def = Commands.singleton().get(testCommand);
      expect(def).toBeUndefined();
    });

    test("should initialize with default empty params if none provided", function () {
      const buttonCommand = new CommandWithParams(testCommand);
      expect(buttonCommand.params).toEqual({});
      expect(buttonCommand.commandDef).toBeUndefined();
    });

    test("should initialize with provided params", function () {
      const initialParams: CommandParams = { key: "value" };
      const buttonCommand = new CommandWithParams(testCommand, initialParams);
      expect(buttonCommand.params).toEqual(initialParams);
      expect(buttonCommand.commandDef).toBeUndefined();
    });

    test("should merge additional params correctly", function () {
      const commandName = "MergeTest" as CommandNames;
      const initialParams: CommandParams = { param1: "value1" };
      const buttonCommand = new CommandWithParams(commandName, initialParams);
      const additional: Record<string, TypeValue> = { param2: "value2" };
      const merged = CommandWithParams.mergeAdditionalParams(buttonCommand, additional);
      
      expect(merged.action).toBe(commandName);
      expect(merged.param1).toBe("value1");
      expect(merged.param2).toBe("value2");
      // Ensure that the buttonCommand.params property is updated to the merged object.
      expect(buttonCommand.params).toEqual(merged);
    });
  });
});
