import pool from "../config/db.js";
import { createTokens } from "../utils/createTokens.js";
import { hashPassword } from "../utils/hashPassword.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || !email.includes("@")) {
      return res.status(401).json({ error: "data is invalid!" });
    }
    const [users] = await pool.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length > 0) {
      return res
        .status(401)
        .json({ error: "user with such email is already exist!" });
    }
    const hashedPassword = await hashPassword(password);
    const [result] = await pool.query(
      "INSERT INTO users(name, email, password) VALUES(?,?,?)",
      [name, email, hashedPassword]
    );
    const { accessToken, refreshToken } = createTokens(result.insertId, email);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });
    res.status(201).json({
      user: {
        id: result.insertId,
        name: name,
        email: email,
        status: 0,
      },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || !email.includes("@")) {
      return res.status(401).json({ error: "data is invalid" });
    }
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length !== 1) {
      return res
        .status(401)
        .json({ error: "users with such email doesn't exist!" });
    }
    const isEqual = await bcrypt.compare(password, users[0].password);

    if (!isEqual) {
      return res.status(401).json({ error: "password is invalid!" });
    }
    const { accessToken, refreshToken } = createTokens(users[0].id, email);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });
    res.status(201).json({
      user: {
        id: users[0].id,
        name: users[0].name,
        email: users[0].email,
        status: users[0].status,
      },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ message: "you are successfully loged out!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
