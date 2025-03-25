import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const createTokens = (id, email) => {
  console.error("id:", id, "email:", email);
  const accessToken = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "1d" });
  const refreshToken = jwt.sign({ id, email }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
