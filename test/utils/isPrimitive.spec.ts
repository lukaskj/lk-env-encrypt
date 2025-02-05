import { describe, expect, test } from "bun:test";
import { faker } from "@faker-js/faker";
import { isPrimitive } from "../../src/utils/isPrimitive";

describe("utils", () => {
  describe("isPrimitive", () => {
    const testCases: [any, boolean][] = [
      [faker.string.alphanumeric(10), true],
      [faker.number.int(1000), true],
      [faker.datatype.boolean(), true],
      [null, true],
      [[], false],
      [{}, false],
      [undefined, false],
    ];

    test.each(testCases)("if %p is primitive type (should be '%p')", (value, expected) => {
      const result = isPrimitive(value);

      expect(result).toEqual(expected);
    });
  });
});
