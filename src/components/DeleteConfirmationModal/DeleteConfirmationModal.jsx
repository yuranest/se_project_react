import React from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/form-modal__close.png";
import { useModalClose } from "../../hooks/useModalClose";

function DeleteConfirmationModal({
  item,
  onCancel,
  onConfirm,
  isOnlyModalOpen,
}) {
  useModalClose(isOnlyModalOpen, onCancel);

  return (
    <div className="modal modal_type_confirm">
      <div className="modal__content modal__content_type_confirm">
        <button className="modal__close" onClick={onCancel}>
          <img src={closeIcon} alt="Close button" />
        </button>

        <p className="modal__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <div className="modal__buttons">
          <button
            className="modal__delete-confirm"
            onClick={() => onConfirm(item)}
          >
            Yes, delete item
          </button>
          <button className="modal__cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
