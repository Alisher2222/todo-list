import { useSelector } from "react-redux";
import AuthForm from "../components/authForm";
import { Navigate } from "react-router-dom";
import ErrorBar from "../components/errorBar";
export default function RegisterPage() {
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return (
    <>
      {error && <ErrorBar error={error.error} />}
      <AuthForm type="register" />
    </>
  );
}
