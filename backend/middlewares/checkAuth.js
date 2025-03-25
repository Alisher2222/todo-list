import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const checkAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    console.log(header);
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access token is invalid." });
    }

    const accessToken = header.split(" ")[1];
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
