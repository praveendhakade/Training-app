import crypto from "node:crypto";

export const hashUserPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto.scryptSync(password, salt, 64);
  return hashedPassword.toString("hex") + ":" + salt;
};

export const verifyPassword = (
  storedPassword: string,
  suppliedPasword: string
) => {
  const [hashedPassword, salt] = storedPassword.split(":");
  const hashedPaswordBuf = Buffer.from(hashedPassword, "hex");
  const suppliedPaswordBuf = crypto.scryptSync(suppliedPasword, salt, 64);
  return crypto.timingSafeEqual(hashedPaswordBuf, suppliedPaswordBuf);
};
