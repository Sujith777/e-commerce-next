import crypto from "crypto";

const secretKey =
  process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY || "moyemoyemoyemoye";
const ivLength = 16;
const algorithm = "aes-256-cbc";

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted;
};

export const decrypt = (text: string): string => {
  const iv = Buffer.from(text.slice(0, ivLength * 2), "hex");
  const encryptedText = text.slice(ivLength * 2);
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};
