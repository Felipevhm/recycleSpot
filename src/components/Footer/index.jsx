import "./style.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-class">
      <Link to="/">Recycle Spot</Link>
      <div className="links">
        <Link to="/register-collect-point">Register Collect Point</Link>
      </div>
    </div>
  );
}

export default Footer;
