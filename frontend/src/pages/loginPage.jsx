import { useSelector } from "react-redux";
import AuthForm from "../components/authForm";
import ErrorBar from "../components/errorBar";

export default function LoginPage() {
  const error = useSelector((state) => state.auth.error);
  return (
    <>
      {error && <ErrorBar error={error.error} />}
      <AuthForm type="login" />
    </>
  );
}
