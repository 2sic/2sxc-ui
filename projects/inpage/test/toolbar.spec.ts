import { CommandNames } from "../../$2sxc/src/cms/command-names";
import { CommandParams } from "../../$2sxc/src/cms/command-params";
import { TypeValue } from "../../core/plumbing/type-value";
import { CommandDefinition } from "../src/commands/command";
import { Commands } from "../src/commands/commands";
import { CommandWithParams } from "../src/toolbar/config/button-command";


describe("ButtonCommand", function () {
  describe("ButtonCommand", function () {
  let dummyCommand: CommandDefinition;

    beforeEach(function () {
      spyOn(Commands, 'singleton').and.returnValue({
        get: jasmine.createSpy('get').and.returnValue(dummyCommand)
      } as unknown as Commands);
    });

    it("should initialize with default empty params if none provided", function () {
      const commandName: CommandNames = "TestCommand" as CommandNames;
      const buttonCommand = new CommandWithParams(commandName);
      expect(buttonCommand.params).toEqual({});
      expect(buttonCommand.commandDef).toBe(dummyCommand);
    });

    it("should initialize with provided params", function () {
      const commandName: CommandNames = "TestCommand" as CommandNames;
      const initialParams: CommandParams = { key: "value" };
      const buttonCommand = new CommandWithParams(commandName, initialParams);
      expect(buttonCommand.params).toEqual(initialParams);
      expect(buttonCommand.commandDef).toBe(dummyCommand);
    });

    it("should merge additional params correctly", function () {
      const commandName: CommandNames = "MergeTest" as CommandNames;
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
