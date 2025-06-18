import "./ItemCard.css";
import likeIcon from "../../assets/card__like-button.png";
import likeIconLiked from "../../assets/card__like-button_liked.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Stop open modal when click like
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} className="card__image" />

      <button
        className={`card__like-button ${
          isLiked ? "card__like-button_liked" : ""
        }`}
        onClick={handleLikeClick}
        aria-label="Like button"
      >
        <img
          src={isLiked ? likeIconLiked : likeIcon}
          alt={isLiked ? "Liked" : "Not liked"}
        />
      </button>
    </li>
  );
}

export default ItemCard;
