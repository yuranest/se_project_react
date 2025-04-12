import React from "react";
import avatar from "../../assets/avatar.png";
import "./SideBar.css";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <img src={avatar} alt="User avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </aside>
  );
};

export default SideBar;
