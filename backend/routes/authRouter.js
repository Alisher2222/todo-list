import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkAuth, logout);

export default router;
