import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ user, onAddClick, location }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="WTWR logo" className="header__logo" />
      </Link>

      <p className="header__date">
        {currentDate}, {location}
      </p>

      <ToggleSwitch />

      <button className="header__button" onClick={onAddClick}>
        + Add clothes
      </button>

      <Link to="/profile" className="header__profile-link">
        <div className="header__right">
          <p className="header__username">{user.name}</p>
          <img src={user.avatar} alt="User avatar" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
