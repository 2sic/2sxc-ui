import { expect, test, describe } from 'vitest';
import { BuildRule } from './rule';
import { Log } from '../../../../core/logging/Log';
import { RuleLoadTools } from './rule-load-tools';
import { BuildSteps } from './build-steps';

describe('BuildRule.loadHeaderAndUi', () => {

  test.each([
    { rule: '', expected: undefined },
    { rule: 'abc', expected: undefined },
    { rule: 'id=abc', expected: 'abc' },
    { rule: 'name=MyButton', expected: undefined },
    { rule: 'id=button1&name=MyButton', expected: 'button1' },
    { rule: 'name=MyButton&id=button2', expected: 'button2' },
  ] satisfies { rule: string; expected: string | undefined }[])
    ('sets id from "$rule"', (c) => {
      const buildRule = new BuildRule('', new Log('test'));
      const rest = RuleLoadTools.splitParamsArray(c.rule);
      buildRule['loadHeaderAndUi']('', rest);
      expect(buildRule.id).toBe(c.expected);
    });

  test.each([
    { rule: '', expected: undefined },
    { rule: 'id=abc', expected: undefined },
    { rule: 'name=MyButton', expected: 'MyButton' },
    { rule: 'id=button1&name=MyButton', expected: 'MyButton' },
    { rule: 'name=MyButton&id=button2', expected: 'MyButton' },
  ] satisfies { rule: string; expected: string | undefined }[])
    ('sets name from "$rule"', (c) => {
      const buildRule = new BuildRule('', new Log('test'));
      const rest = RuleLoadTools.splitParamsArray(c.rule);
      buildRule['loadHeaderAndUi']('', rest);
      expect(buildRule.name).toBe(c.expected);
    });

  test.each([
    { rule: '', expected: undefined },
    { rule: 'group=alpha', expected: 'alpha' },
    { rule: 'group=alpha&id=x', expected: 'alpha' },
    { rule: 'id=x&group=beta', expected: 'beta' },
  ] satisfies { rule: string; expected: string | undefined }[])
    ('sets group from "$rule" and removes it from ui', (c) => {
      const buildRule = new BuildRule('', new Log('test'));
      const defaultGroup = buildRule.group;

      const rest = RuleLoadTools.splitParamsArray(c.rule);
      buildRule['loadHeaderAndUi']('', rest);

      if (c.expected == null) {
        expect(buildRule.group).toBe(defaultGroup);
      } else {
        expect(buildRule.group).toBe(c.expected);
        expect((buildRule.ui as any).group).toBeUndefined();
      }
    });

  test.each([
    { rule: '', expected: undefined },
    { rule: 'pos=0', expected: 0 },
    { rule: 'pos=1', expected: 1 },
    { rule: 'pos=-1', expected: -1 },
    // Special legacy case: -0 must become -1
    { rule: 'pos=-0', expected: -1 },
  ] satisfies { rule: string; expected: number | undefined }[])
    ('sets pos from "$rule" (including -0 fix)', (c) => {
      const buildRule = new BuildRule('', new Log('test'));
      const defaultPos = buildRule.pos;

      const rest = RuleLoadTools.splitParamsArray(c.rule);
      buildRule['loadHeaderAndUi']('', rest);

      if (c.expected == null) {
        expect(buildRule.pos).toBe(defaultPos);
      } else {
        expect(buildRule.pos).toBe(c.expected);
      }
    });

  test.each([
    // show conversion (apparently happens for all forKey values)
    { forKey: BuildSteps.button, rule: 'show=true', expected: true },
    { forKey: BuildSteps.button, rule: 'show=false', expected: false },

    { forKey: BuildSteps.settings, rule: 'show=true', expected: true },
    { forKey: BuildSteps.toolbar, rule: 'show=false', expected: false },
  ] satisfies {
    forKey: string;
    rule: string;
    expected: boolean;
  }[])
    ('converts show correctly for forKey="$forKey" and rule="$rule"', (c) => {
      const buildRule = new BuildRule('', new Log('test'));
      const rest = RuleLoadTools.splitParamsArray(c.rule);

      buildRule['loadHeaderAndUi'](c.forKey, rest);

      expect(buildRule.ui.show).toBe(c.expected);
      expect(typeof buildRule.ui.show).toBe('boolean');
    });

  test('stores remaining parameters inside ui', () => {
    const buildRule = new BuildRule('', new Log('test'));
    const rest = RuleLoadTools.splitParamsArray('icon=edit&color=red');

    buildRule['loadHeaderAndUi']('', rest);

    expect(buildRule.ui).toEqual({
      icon: 'edit',
      color: 'red',
    });
  });

});
