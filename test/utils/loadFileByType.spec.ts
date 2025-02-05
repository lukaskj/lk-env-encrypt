import { faker } from "@faker-js/faker";
import { afterAll, beforeEach, describe, expect, it, mock, spyOn } from "bun:test";
import yaml from "js-yaml";
import * as dotenvSerializer from "../../src/utils/dotenvSerializer";
import { loadFileByType } from "../../src/utils/loadFileByType";

describe("utils", () => {
  describe("loadFileByType", () => {
    afterAll(() => {
      mock.restore();
    });
    const parsedObject = {
      key1: faker.string.uuid(),
    };
    beforeEach(() => {
      spyOn(yaml, "load").mockReturnValue(parsedObject);
      spyOn(dotenvSerializer, "fromDotEnv").mockReturnValue(parsedObject);
      spyOn(JSON, "parse").mockReturnValue(parsedObject);
    });

    describe("valid file types", () => {
      it('should correctly parse YAML files when type is "yaml"', () => {
        const mockYAMLData = "true\nall: false";
        const result = loadFileByType(mockYAMLData, "yaml");

        // Mock the YAML parser
        expect(yaml.load).toHaveBeenCalledWith(mockYAMLData);
        expect(result).toMatchObject(parsedObject);
      });

      it('should correctly parse environment files when type is "env"', () => {
        const mockEnvData = "KEY=VALUE\nFOO=BAR";
        const result = loadFileByType(mockEnvData, "env");

        expect(dotenvSerializer.fromDotEnv).toHaveBeenCalledWith(mockEnvData);
        expect(result).toMatchObject(parsedObject);
      });

      it('should correctly parse environment files when type is "json"', () => {
        const mockData = '{"name": "Test"}';
        const result = loadFileByType(mockData, "json");

        expect(JSON.parse).toHaveBeenCalledWith(mockData);
        expect(result).toMatchObject(parsedObject);
      });

      it("should default to JSON parsing when type is not recognized", () => {
        const mockData = '{"name": "Test"}';
        const result = loadFileByType(mockData, <any>"invalid_type");

        expect(JSON.parse).toHaveBeenCalledWith(mockData);
        expect(result).toMatchObject(parsedObject);
      });
    });

    describe("invalid and edge cases", () => {
      beforeEach(() => {
        spyOn(JSON, "parse").mockImplementation(() => {
          throw new Error("Invalid JSON");
        });
      });

      it("should handle null or undefined data correctly", () => {
        expect(() => loadFileByType(<any>null, "json")).toThrow();
        expect(() => loadFileByType(<any>undefined, "json")).toThrow();
      });

      it("should handle empty string input appropriately", () => {
        const mockData = "";
        expect(() => loadFileByType(mockData, "json")).toThrow();
      });
    });
  });
});
