import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, getTodos } from "../store/todoSlice";
import "./../assets/homePage.css";
import Todo from "../components/todo";
export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  const { items } = useSelector((state) => state.todos);
  const [text, setText] = useState("");

  const handleCreateTodo = async () => {
    if (!text.trim()) {
      alert("The field cannot be empty");
      return;
    }
    try {
      await dispatch(createTodo({ text })).unwrap();
      setText("");
    } catch (error) {
      console.error("an error occurred when creating", error);
    }
  };

  return (
    <div className="todolist-container">
      <div className="todolist-container-upper">
        <h1>Todo List</h1>
        <div className="todolist-container-upper-lower">
          <input
            className="todo-input"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter the todo's text..."
          />
          <button onClick={handleCreateTodo} className="add-todo">
            +
          </button>
        </div>
      </div>

      <ul className="todolist">
        {items.length > 0 ? (
          items.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              text={todo.text}
              status={todo.status}
            />
          ))
        ) : (
          <p>No todos yet🥲</p>
        )}
      </ul>
    </div>
  );
}
