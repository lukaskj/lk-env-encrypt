import { faker } from "@faker-js/faker";
import { afterAll, beforeEach, describe, expect, it, mock, spyOn } from "bun:test";
import yaml from "js-yaml";
import * as dotenvSerializer from "../../src/utils/dotenvSerializer";
import { serializeObjectToFormat } from "../../src/utils/serializeObjectToFormat";
import type { TExportType } from "../../src/consts";

describe("utils", () => {
  describe("serializeObjectToFormat", () => {
    afterAll(() => {
      mock.restore();
    });

    const outputString = faker.word.words(5);

    beforeEach(() => {
      spyOn(yaml, "dump").mockReturnValue(outputString);
      spyOn(dotenvSerializer, "dotenvSerializer").mockReturnValue(outputString);
      spyOn(JSON, "stringify").mockReturnValue(outputString);
    });

    const sampleObject = {
      [faker.string.uuid()]: faker.string.uuid(),
      [faker.string.uuid()]: faker.string.uuid(),
      [faker.string.uuid()]: faker.string.uuid(),
    };

    it("should call yaml serializer", () => {
      const formatType: TExportType = "yaml";

      serializeObjectToFormat(sampleObject, formatType);

      expect(yaml.dump).toHaveBeenCalled();
    });

    it("should call env serializer", () => {
      const formatType: TExportType = "env";

      serializeObjectToFormat(sampleObject, formatType);

      expect(dotenvSerializer.dotenvSerializer).toHaveBeenCalled();
    });

    it("should call json serializer", () => {
      const formatType: TExportType = "json";

      serializeObjectToFormat(sampleObject, formatType);

      expect(JSON.stringify).toHaveBeenCalled();
    });

    it("should fallback to json serializer", () => {
      const formatType: TExportType = <any>faker.string.alphanumeric(5);

      serializeObjectToFormat(sampleObject, formatType);

      expect(JSON.stringify).toHaveBeenCalled();
    });
  });
});
