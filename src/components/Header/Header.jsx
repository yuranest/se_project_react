import "./Header.css";
import logo from "../../assets/logo.svg"; // Logo
import avatar from "../../assets/avatar.png"; // Avatar
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ onAddClick, location, temperature }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="WTWR logo" className="header__logo" />
      <p className="header__date">
        {currentDate}, {location}
      </p>
      <ToggleSwitch />
      <button className="header__button" onClick={onAddClick}>
        + Add clothes
      </button>
      <div className="header__right">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
