import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../store/authSlice";
import { Link } from "react-router-dom";
import "./../assets/authForm.css";
export default function AuthForm({ type }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (type === "register") {
      dispatch(register(userData));
    } else if (type === "login") {
      dispatch(login(userData));
    }
  };

  return (
    <div className="auth-container">
      <div className="login-register-container">
        <h1>{type === "register" ? "Register page" : "Login page"}</h1>
        <div className="inputs">
          {type === "register" && (
            <input
              type="text"
              placeholder="name"
              value={userData.name}
              onChange={(event) =>
                setUserData({ ...userData, name: event.target.value })
              }
            />
          )}
          <input
            type="email"
            placeholder="email"
            value={userData.email}
            onChange={(event) =>
              setUserData({ ...userData, email: event.target.value })
            }
          />
          <input
            type="password"
            placeholder="password"
            value={userData.password}
            onChange={(event) =>
              setUserData({ ...userData, password: event.target.value })
            }
          />
        </div>
        <button className="register-login-button" onClick={handleSubmit}>
          {type === "register" ? "Register" : "Login"}
        </button>
        <p>
          {type === "register" ? (
            <>
              Already have an account? <br />
              <Link to="/login">Login here</Link>
            </>
          ) : (
            <>
              Don't have an account?
              <br /> <Link to="/register">Register here</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
