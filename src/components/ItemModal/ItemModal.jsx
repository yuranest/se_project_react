import "./ItemModal.css";
import closeIcon from "../../assets/item-modal__close.png";
import { useModalClose } from "../../hooks/useModalClose";

function ItemModal({ item, onClose, onDeleteRequest, isOnlyModalOpen }) {
  useModalClose(isOnlyModalOpen, onClose);

  return (
    <div className="modal modal_type_preview">
      <div className="modal__content modal__content_type_preview">
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close button" />
        </button>
        <img
          src={item.imageUrl || item.link}
          alt={item.name}
          className="modal__image"
        />
        <ul className="modal__info">
          <li className="modal__info-row">
            <span className="modal__caption">{item.name}</span>
            <button
              className="modal__delete-button"
              onClick={() => onDeleteRequest(item)}
            >
              Delete item
            </button>
          </li>
          <li className="modal__weather">Weather: {item.weather}</li>
        </ul>
      </div>
    </div>
  );
}

export default ItemModal;
