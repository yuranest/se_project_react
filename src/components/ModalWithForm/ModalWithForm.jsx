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
  onSwitchToRegister,
  onSwitchToLogin,
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

        <div className="modal__actions">
          <button
            type="submit"
            className="modal__submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>

          {name === "login" && (
            <span
              className="login__switch-link"
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
            >
              or Register
            </span>
          )}

          {name === "register" && (
            <span
              className="login__switch-link"
              onClick={() => {
                onClose();
                onSwitchToLogin();
              }}
            >
              or Log in
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default ModalWithForm;
