import UPDATE from "./../assets/images/update.png";
import DELETE from "./../assets/images/delete.png";
import DeleteForm from "./../components/deleteForm";
import UpdateForm from "./updateForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeTodoStatus } from "../store/todoSlice";

export default function Todo({ text, id, status }) {
  const [deleteId, setDeleteId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const dispatch = useDispatch();

  const handleDeleteClick = (id) => {
    setDeleteId((prevId) => (prevId === id ? null : id));
  };

  const handleUpdateClick = (id) => {
    setUpdateId((prevId) => (prevId === id ? null : id));
  };

  const handleChangeTodoStatus = () => {
    dispatch(changeTodoStatus({ id }));
  };

  return (
    <li className="todo">
      <div className="todo-checkbox-text">
        <input
          type="checkbox"
          className="li-chechbox"
          onChange={handleChangeTodoStatus}
          checked={status}
        />
        <p>{text}</p>
      </div>
      <div className="update-delete">
        <img
          src={UPDATE}
          alt="update"
          className="icons"
          onClick={() => handleUpdateClick(id)}
        />
        <img
          src={DELETE}
          alt="delete"
          className="icons"
          onClick={() => handleDeleteClick(id)}
        />
      </div>

      {deleteId === id && (
        <DeleteForm id={deleteId} handleSetId={setDeleteId} />
      )}
      {updateId === id && (
        <UpdateForm id={updateId} setUpdateState={setUpdateId} />
      )}
    </li>
  );
}
