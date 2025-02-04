import { createCipheriv, createHash, randomBytes, createDecipheriv, type CipherGCMTypes } from "node:crypto";

const algo: CipherGCMTypes = "aes-256-gcm";

function generateIv(): Buffer {
  return randomBytes(16);
}

function generateKey(password: string): string {
  return createHash("sha256").update(password).digest("hex").substring(0, 32);
}

export function encrypt(data: string, password: string): string {
  const key = generateKey(password);
  const iv = generateIv();

  const cipher = createCipheriv(algo, key, iv);

  const enc = Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);

  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, enc]).toString("hex");
}

export function decrypt(encData: string, password: string): string {
  const bData = Buffer.from(encData, "hex");

  const iv = bData.subarray(0, 16);
  const tag = bData.subarray(16, 32);
  const text = bData.subarray(32);

  const key = generateKey(password);

  const decypher = createDecipheriv(algo, key, iv);
  decypher.setAuthTag(tag);

  return decypher.update(text.toString("binary"), "binary", "utf-8");
}
