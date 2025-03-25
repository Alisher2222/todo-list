import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../store/todoSlice";
import "./../assets/updateFrom.css";
export default function UpdateForm({ id, setUpdateState }) {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (!text) {
      alert("The field cannot be empty");
      return;
    } else {
      dispatch(updateTodo({ id, text }));
      setUpdateState(false);
    }
  };
  return (
    <div className="container-update">
      <div className="container-update-upper">
        <h1 className="update-titile ">Edit todo</h1>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="input-update"
          placeholder="enter a new text..."
        />
      </div>
      <div className="container-update-lower">
        <button onClick={handleUpdate} className="button-update">
          Update
        </button>
        <button className="button-cancel" onClick={() => setUpdateState(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
