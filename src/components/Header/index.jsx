import "./style.css";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AppContext } from "./../../context/AppContext";

function Header() {
  const { quitSession } = useContext(AppContext);

  return (
    <div className="header-class">
      <Link to="/">Home</Link>
      <div className="links">
        <Link to="/">Dashboard</Link>
        <Link to="/list-collect-points">Collect Points List</Link>
        <Link
          onClick={() => {
            quitSession();
          }}
          to="/login"
        >
          Exit
        </Link>
      </div>
    </div>
  );
}

export default Header;
