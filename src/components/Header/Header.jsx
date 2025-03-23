import "./Header.css";
import logo from "../../assets/logo.png"; // Logo
import avatar from "../../assets/avatar.jpg"; // Avatar

function Header({ onAddClick, location, temperature }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR logo" className="header__logo" />
        <p className="header__date">
          {currentDate}, {location}
        </p>
      </div>
      <div className="header__right">
        <button className="header__button" onClick={onAddClick}>
          + Add clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
