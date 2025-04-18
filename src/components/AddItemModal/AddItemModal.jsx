import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  const isFormValid = values.name && values.imageUrl;

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "hot" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
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
          value={values.name}
          onChange={handleChange}
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
          value={values.imageUrl}
          onChange={handleChange}
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
              checked={values.weather === type}
              onChange={handleChange}
            />
            {type}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
