import { useDispatch } from "react-redux";
import "./../assets/deleteForm.css";
import { deleteTodo } from "../store/todoSlice";
export default function Delete({ id, handleSetId }) {
  const dispatch = useDispatch();
  const deletehandler = () => {
    dispatch(deleteTodo({ id }));
    handleSetId(null);
  };

  return (
    <div className="delete-form-container">
      <h1 className="delete-titile">Are you sure?</h1>
      <div className="delete-buttons-container">
        <button className="delete-button" onClick={deletehandler}>
          Delete
        </button>
        <button className="delete-button" onClick={() => handleSetId(null)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
