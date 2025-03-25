import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import todosRouter from "./routes/todosRouter.js";
import { checkAuth } from "./middlewares/checkAuth.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/", authRouter);
app.use("/todos", checkAuth, todosRouter);

app.listen(PORT, () => {
  console.log(`server is running on: http://localhost:${PORT}`);
});
