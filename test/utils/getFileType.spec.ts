import { describe, expect, it } from "bun:test";
import { getFileType } from "../../src/utils/getFileType";

describe("utils", () => {
  describe("getFileType", () => {
    describe("valid file types", () => {
      it('should return "json" for application/json', () => {
        expect(getFileType("application/json")).toBe("json");
      });

      it('should return "yaml" for text/yaml', () => {
        expect(getFileType("text/yaml")).toBe("yaml");
      });

      it('should return "env" for application/octet-stream', () => {
        expect(getFileType("application/octet-stream")).toBe("env");
      });
    });

    describe("Invalid file types", () => {
      it("should throw an error for invalid MIME type", () => {
        expect(() => getFileType("image/png")).toThrow();
      });
    });

    describe("Edge cases", () => {
      it("should throw an error for empty string", () => {
        expect(() => getFileType("")).toThrow();
      });

      it("should throw an error for null input", () => {
        expect(() => getFileType(null as any)).toThrow();
      });

      it("should throw an error for undefined input", () => {
        expect(() => getFileType(undefined as any)).toThrow();
      });
    });

    describe("case insensitivity", () => {
      it("should correctly handle uppercase input", () => {
        expect(getFileType("APPLICATION/JSON")).toBe("json");
      });
    });

    describe("exact matches beyond prefix check", () => {
      it("should not incorrectly match partial strings", () => {
        // This test checks that the function doesn't accept non-file type strings
        // as valid just because they start with a substring of a valid type
        expect(() => getFileType("text/json")).toThrow();
      });
    });
  });
});
