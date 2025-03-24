import "./ModalWithForm.css";

function ModalWithForm({ title, name, buttonText, onClose, children }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <form className="modal__form" name={name}>
        <button type="button" className="modal__close" onClick={onClose}>
          ✕
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
              defaultChecked
            />
            Hot
          </label>
          <label className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value="warm"
              className="modal__radio"
            />
            Warm
          </label>
          <label className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value="cold"
              className="modal__radio"
            />
            Cold
          </label>
        </fieldset>

        {children}

        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
