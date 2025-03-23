function ItemCard({ item, onCardClick }) {
  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <img src={item.link} alt={item.name} className="card__image" />
      <p className="card__name">{item.name}</p>
    </li>
  );
}

export default ItemCard;
