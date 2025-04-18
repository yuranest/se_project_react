import "./ModalWithForm.css";
import closeIcon from "../../assets/form-modal__close.png";
import { useModalClose } from "../../hooks/useModalClose";

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  isFormValid,
  children,
}) {
  useModalClose(true, onClose);

  return (
    <div className={`modal modal_type_${name}`}>
      <form className="modal__form" name={name} onSubmit={onSubmit}>
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close modal" />
        </button>
        <h2 className="modal__title">{title}</h2>

        {children}

        <button type="submit" className="modal__submit" disabled={!isFormValid}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
