import React from "react";
import avatar from "../../assets/avatar.png";
import "./SideBar.css";

const SideBar = ({ user }) => {
  return (
    <aside className="sidebar">
      <img src={user.avatar} alt="User avatar" className="sidebar__avatar" />
      <p className="sidebar__username">{user.name}</p>
    </aside>
  );
};

export default SideBar;
