import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  user,
  onAddClick,
  location,
  onRegisterClick,
  onLoginClick,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>

        <p className="header__date">
          {currentDate}, {location}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch className="header__toggleswitch" />
        {isLoggedIn ? (
          <>
            <button className="header__button" onClick={onAddClick}>
              + Add clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <p className="header__username">{user?.name}</p>
              <img
                src={user?.avatar}
                alt="User avatar"
                className="header__avatar"
              />
            </Link>
          </>
        ) : (
          <>
            <button className="header__button" onClick={onLoginClick}>
              Log In
            </button>
            <button className="header__button" onClick={onRegisterClick}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
