import "./SideBar.css";

const SideBar = ({ user, onSignOut }) => {
  if (!user) return null;

  return (
    <aside className="sidebar">
      <img src={user.avatar} alt="User avatar" className="sidebar__avatar" />
      <p className="sidebar__username">{user.name}</p>
      <button className="sidebar__logout" onClick={onSignOut}>
        Log out
      </button>
    </aside>
  );
};

export default SideBar;
