import React from "react";
import "./ItemModal.css";

function ItemModal({ item, onClose }) {
  return (
    <div className="modal modal_type_preview">
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onClose} />
        <img src={item.link} alt={item.name} className="modal__image" />
        <p className="modal__caption">{item.name}</p>
        <p className="modal__weather">Weather: {item.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
