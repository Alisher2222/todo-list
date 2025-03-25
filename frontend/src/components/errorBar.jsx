import "./../assets/errorBar.css";
export default function ErrorBar({ error }) {
  return (
    <div className="errorBar-container">
      <p className="error-message">{error}</p>
    </div>
  );
}
