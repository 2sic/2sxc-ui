import { describe, expect, test } from 'vitest';
import { CommandNames } from '../../commands';
import { BuildRule } from '../rules/rule';
import { BtnCmdHelpers, CommandWithParams } from './button-command';

function command(name: CommandNames): CommandWithParams {
  return {
    name,
    params: {
      parent: 'a82a0a09-4aee-41a5-930e-63603d0c0687',
      fields: 'Releases',
      sortOrder: 5,
      contentType: 'AppRelease',
    },
    commandDef: { buttonDefaults: {} },
  } as CommandWithParams;
}

const rule = {
  params: { entityId: 910, contentType: 'AppRelease' },
} as BuildRule;

describe('BtnCmdHelpers.mergeParamsWithRulesAndClean', () => {
  test('preserves entity-list context for copy', () => {
    const params = BtnCmdHelpers.mergeParamsWithRulesAndClean(command(CommandNames.copy), rule);

    expect(params).toMatchObject({
      entityId: 910,
      parent: 'a82a0a09-4aee-41a5-930e-63603d0c0687',
      fields: 'Releases',
      sortOrder: 5,
    });
  });

  test('still removes conflicting entity-list context for other commands', () => {
    const params = BtnCmdHelpers.mergeParamsWithRulesAndClean(command(CommandNames.edit), rule);

    expect(params.entityId).toBe(910);
    expect(params.parent).toBeUndefined();
    expect(params.fields).toBeUndefined();
  });
});
