function ModalWithForm({ title, name, buttonText, onClose, children }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal__title">{title}</h2>
        <form name={name} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
