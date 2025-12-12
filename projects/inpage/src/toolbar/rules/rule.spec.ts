import { expect, test, describe } from 'vitest';
import { BuildRule } from './rule';
import { Log } from '../../../../core/logging/Log';
import { RuleLoadTools } from './rule-load-tools';

describe('BuildRule.loadHeaderAndUi', () => {

  // Example which uses data driven testing to cover multiple cases
  test.each([
    { rule: '', expected: undefined },
    { rule: 'abc', expected: undefined },
    { rule: 'id=abc', expected: 'abc' },
    { rule: 'name=MyButton', expected: undefined },
    { rule: 'id=button1&name=MyButton', expected: 'button1' },
    { rule: 'name=MyButton&id=button2', expected: 'button2' },
  ] satisfies { rule: string; expected: string | undefined; }[])
  (`check id $rule`, (c) => {
    const rule = new BuildRule('', new Log('test'));
    var rest = RuleLoadTools.splitParamsArray(c.rule);
    // This is how to access a private method from a test
    rule['loadHeaderAndUi']('', rest);
    expect(rule.id).toBe(c.expected);
  });

  // TODO: @2rb Create tests for name


  // TODO: @2rb Create tests for group

  // TODO: @2rb Create tests for pos, including -0 case

  // TODO: @2rb Create tests for show

  // TODO: @2rb Create tests for the property ui

});

// TODO: @2rb Create various tests for loadHeader