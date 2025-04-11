import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import avatar from "../../assets/avatar.png";
import "./Profile.css";

const Profile = ({ clothingItems, onCardClick, onAddClick }) => {
  return (
    <main className="profile">
      <div className="profile__sidebar">
        <img className="profile__avatar" src={avatar} alt="User avatar" />
        <p className="profile__name">Terrence Tegegne</p>
      </div>
      <div className="profile__items">
        <div className="profile__items-header">
          <h2>Your Items</h2>
          <button className="profile__add-btn" onClick={onAddClick}>
            + Add new
          </button>
        </div>
        <ul className="profile__card-list">
          {clothingItems.map((item) => (
            <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Profile;
