import { expect, test, describe } from 'vitest';

describe("A suite is just a function", function () {
  let a;

  test("and so is a spec", function () {
    a = true;

    expect(a).toBe(true);
  });
});
