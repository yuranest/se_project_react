import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardLike,
}) => {
  return (
    <section className="profile__items">
      <div className="profile__items-header">
        <h2 className="profile__items-header h2">Your items</h2>
        <button className="profile__add-btn" onClick={onAddClick}>
          + Add new
        </button>
      </div>
      <ul className="profile__card-list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
};

export default ClothesSection;
