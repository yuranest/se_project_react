import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  const isFormValid = formValues.name && formValues.imageUrl;

  useEffect(() => {
    if (isOpen) {
      setFormValues({ name: "", imageUrl: "", weather: "hot" });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formValues);
  };

  return (
    <ModalWithForm
      name="add-clothes"
      title="New Garment"
      buttonText="Add Garment"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label className="modal__label">
        Image URL
        <input
          type="url"
          className="modal__input"
          name="imageUrl"
          placeholder="Image URL"
          value={formValues.imageUrl}
          onChange={handleInputChange}
          required
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="modal__radio-label">
            <input
              type="radio"
              className="modal__radio"
              name="weather"
              value={type}
              checked={formValues.weather === type}
              onChange={handleInputChange}
            />
            {type}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
