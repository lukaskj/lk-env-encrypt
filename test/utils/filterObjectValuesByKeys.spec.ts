import { faker } from "@faker-js/faker";
import { describe, expect, it } from "bun:test";
import { filterObjectValuesByKeys } from "../../src/utils/filterObjectValuesByKeys";
import { IDENTIFIER } from "../../src/encryption/consts";

describe("utils", () => {
  describe("filterObjectValuesByKeys", () => {
    const obj = {
      key1: faker.string.uuid(),
      key2: faker.string.uuid(),
      key3: faker.string.uuid(),
    };

    it("should return all unchanged object if keys arg is undefined", () => {
      const expectedKeys = Object.keys(obj);

      const result = filterObjectValuesByKeys(obj);
      const resultKeys = Object.keys(result);

      expect(resultKeys).toEqual(expectedKeys);
      expect(result).toMatchObject(obj);
    });

    it("should return unchanged object if keys arg is empty", () => {
      const expectedKeys = Object.keys(obj);
      const keysToExport: string[] = [];

      const result = filterObjectValuesByKeys(obj, keysToExport);
      const resultKeys = Object.keys(result);

      expect(resultKeys).toEqual(expectedKeys);
      expect(result).toMatchObject(obj);
    });

    it("should return unchanged object if keys arg is empty", () => {
      const expectedKeys = Object.keys(obj);
      const keysToExport: string[] = [];

      const result = filterObjectValuesByKeys(obj, keysToExport);
      const resultKeys = Object.keys(result);

      expect(resultKeys).toEqual(expectedKeys);
      expect(result).toMatchObject(obj);
    });

    it("should return an object with only specified keys", () => {
      const keysToExport: (keyof typeof obj)[] = ["key1"];
      const expectedKeys = keysToExport;
      const expectedObject = {
        key1: obj["key1"],
      };

      const result = filterObjectValuesByKeys(obj, keysToExport);
      const resultKeys = Object.keys(result);

      expect(resultKeys).toEqual(expectedKeys);
      expect(result).toMatchObject(expectedObject);
    });

    it("should return an object with only identifier key if present", () => {
      const objWithIdentifier = {
        ...obj,
        [IDENTIFIER.KEY]: faker.string.sample(10),
      };
      const keysToExport: (keyof typeof objWithIdentifier)[] = ["key1"];
      const expectedKeys = [...keysToExport, IDENTIFIER.KEY];
      const expectedObject = {
        key1: obj["key1"],
        [IDENTIFIER.KEY]: objWithIdentifier[IDENTIFIER.KEY as keyof typeof objWithIdentifier],
      };

      const result = filterObjectValuesByKeys(objWithIdentifier, keysToExport);
      const resultKeys = Object.keys(result);

      expect(resultKeys).toEqual(expectedKeys);
      expect(result).toMatchObject(expectedObject);
    });
  });
});
