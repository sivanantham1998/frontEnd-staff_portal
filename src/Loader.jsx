import logo from "./assets/logo.png";
import "./loader.css";

export default function Loader({ size = 100, arcWidth = 6 }) {
  return (
    <div className="loader-overlay">
      <div
        className="spinner"
        style={{ "--size": `${size}px`, "--arcWidth": `${arcWidth}px` }}
      >
        <img src={logo} alt="logo" className="spinner-logo" />
      </div>
    </div>
  );
}
