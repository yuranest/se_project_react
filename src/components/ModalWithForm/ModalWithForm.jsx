import { useState } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/form-modal__close.png";

function ModalWithForm({ title, name, buttonText, onClose, children }) {
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  const isFormValid = formValues.name && formValues.imageUrl;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`modal modal_type_${name}`}>
      <form className="modal__form" name={name}>
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close button" />
        </button>
        <h2 className="modal__title">{title}</h2>

        <label className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            name="name"
            placeholder="Name"
            required
            value={formValues.name}
            onChange={handleChange}
          />
        </label>

        <label className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            name="imageUrl"
            placeholder="Image URL"
            required
            value={formValues.imageUrl}
            onChange={handleChange}
          />
        </label>

        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value="hot"
              className="modal__radio"
              checked={formValues.weather === "hot"}
              onChange={handleChange}
            />
            Hot
          </label>
          <label className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value="warm"
              className="modal__radio"
              checked={formValues.weather === "warm"}
              onChange={handleChange}
            />
            Warm
          </label>
          <label className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value="cold"
              className="modal__radio"
              checked={formValues.weather === "cold"}
              onChange={handleChange}
            />
            Cold
          </label>
        </fieldset>

        {children}

        <button type="submit" className="modal__submit" disabled={!isFormValid}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
