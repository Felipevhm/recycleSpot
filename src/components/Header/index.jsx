import "./style.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-class">
      <Link to="/">Home</Link>
      <div className="links">

        <Link to="dashboard">Dashboard</Link>
        <Link to="/list-collect-points">Collect Points List</Link>
      </div>
    </div>
  );
}

export default Header;
