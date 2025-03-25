import pool from "../config/db.js";

export const getTodos = async (req, res) => {
  try {
    const id = req.user.id;
    const [todos] = await pool.query("SELECT * FROM todos WHERE user_id = ?", [
      id,
    ]);
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id;

    if (!text || !userId) {
      return res.status(400).json({ error: "Text or userId is required!" });
    }

    const [result] = await pool.query(
      "INSERT INTO todos (text, status, user_id) VALUES (?, ?, ?)",
      [text, 0, userId]
    );
    res.status(201).json({
      message: "Todo successfully added!",
      todo: { id: result.insertId, text: text, status: 0, user_id: userId },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
      return res.status(401).json({ error: "id is invalid!" });
    }
    const [todos] = await pool.query("SELECT id FROM todos WHERE id = ?", [id]);
    if (todos.length !== 1) {
      return res
        .status(401)
        .json({ error: "todos with such id doesn't exist!" });
    }
    await pool.query("DELETE FROM todos WHERE id = ?", [id]);
    res.status(201).json({ message: "successfully deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
      return res.status(401).json({ error: "id is invalid!" });
    }
    const [todos] = await pool.query("SELECT id FROM todos WHERE id = ?", [id]);
    if (todos.length !== 1) {
      return res
        .status(401)
        .json({ error: "todos with such id doesn't exist!" });
    }
    const { text } = req.body;
    const [result] = await pool.query(
      "UPDATE todos SET text = ? WHERE id = ?",
      [text, id]
    );
    const [todo] = await pool.query("SELECT * FROM  todos WHERE id = ?", [id]);
    res.status(201).json({ message: "successfully changed!", todo: todo[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const changeTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
      return res.status(401).json({ error: "id is invalid!" });
    }
    const [todos] = await pool.query("SELECT status FROM todos WHERE id = ?", [
      id,
    ]);
    if (todos.length !== 1) {
      return res
        .status(401)
        .json({ error: "todos with such id doesn't exist!" });
    }
    const newStatus = todos[0].status === 0 ? 1 : 0;
    await pool.query("UPDATE todos SET status = ? WHERE id = ?", [
      newStatus,
      id,
    ]);
    const [todo] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);
    res.status(200).json({ message: "successfully changed!", todo: todo[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
