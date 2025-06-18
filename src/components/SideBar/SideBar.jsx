import React from "react";
import avatar from "../../assets/avatar.png";
import "./SideBar.css";

const SideBar = ({ user, onSignOut, onEditProfile }) => {
  if (!user) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <img src={user.avatar} alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__username">{user.name}</p>
      </div>
      <button className="sidebar__change" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__logout" onClick={onSignOut}>
        Log out
      </button>
    </aside>
  );
};

export default SideBar;
