import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useEffect } from "react";
import "./LoginModal.css";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  loginError,
  onSwitchToRegister,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "" }, {}, false);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      name="login"
      title="Log In"
      buttonText="Log In"
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
      onSwitchToRegister={onSwitchToRegister}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        {loginError ? (
          <span className="modal__label_error">
            Incorrect email or password
          </span>
        ) : (
          "Password"
        )}
        <input
          className={`modal__input ${loginError ? "modal__input_error" : ""}`}
          type="password"
          name="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
