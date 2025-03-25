import "./ItemModal.css";
import closeIcon from "../../assets/item-modal__close.png";

function ItemModal({ item, onClose }) {
  return (
    <div className="modal modal_type_preview">
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close button" />
        </button>
        <img src={item.link} alt={item.name} className="modal__image" />
        <ul className="modal__info">
          <li className="modal__caption">{item.name}</li>
          <li className="modal__weather">Weather: {item.weather}</li>
        </ul>
      </div>
    </div>
  );
}

export default ItemModal;
