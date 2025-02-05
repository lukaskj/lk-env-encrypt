import { faker } from "@faker-js/faker";
import { describe, expect, it } from "bun:test";
import { dotenvSerializer, fromDotEnv } from "../../src/utils/dotenvSerializer";

describe("utils", () => {
  describe("dotenvSerializer", () => {
    it("should serialize into a valid dotenv format", () => {
      const obj = {
        key1: faker.string.alphanumeric(10),
        child1: {
          childKey1: faker.string.alphanumeric(10),
        },
        key2: faker.string.alphanumeric(10),
      };

      const expected = `KEY1="${obj.key1}"\nCHILDKEY1="${obj.child1.childKey1}"\nKEY2="${obj.key2}"`;

      const result = dotenvSerializer(obj);

      expect(result).toEqual(expected);
    });
  });

  describe("fromDotEnv", () => {
    it("should deserialize dotenv to obj", () => {
      const expected = {
        key1: faker.string.alphanumeric(10),
        key2: faker.string.alphanumeric(10),
      };
      const input = `KEY1="${expected.key1}"\nKEY2="${expected.key2}"`;

      const result = fromDotEnv(input);

      expect(result).toEqual(expected);
    });
  });
});
