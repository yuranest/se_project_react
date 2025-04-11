import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import { getWeatherData, getWeatherType } from "../../utils/weatherApi";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    location: "City",
    condition: "",
    sunrise: 0,
    sunset: 0,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };

  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  const isFormValid = formValues.name && formValues.imageUrl;

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData({
          temperature: Math.round(data.main.temp),
          location: data.name,
          condition: data.weather[0].main.toLowerCase(),
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        });
      })
      .catch((err) => console.error("Weather fetch failed:", err));

    getItems()
      .then(setClothingItems)
      .catch((err) => console.error("Items fetch failed:", err));
  }, []);

  const handleCardClick = (item) => setSelectedCard(item);

  const handleModalClose = () => {
    setSelectedCard(null);
    setActiveModal("");
    setFormValues({ name: "", imageUrl: "", weather: "hot" });
  };

  const handleDeleteRequest = (item) => {
    setItemToDelete(item);
  };

  const handleCardDelete = (item) => {
    deleteItem(item.id)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i.id !== item.id));
        setSelectedCard(null);
        setItemToDelete(null);
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const handleAddClick = () => setActiveModal("add-clothes");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: formValues.name,
      weather: formValues.weather,
      imageUrl: formValues.imageUrl,
    };

    addItem(newItem)
      .then((itemWithId) => {
        setClothingItems((prev) => [itemWithId, ...prev]);
        handleModalClose();
      })
      .catch((err) => console.error("Add item failed:", err));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    onAddClick={handleAddClick}
                    location={weatherData.location}
                    temperature={weatherData.temperature}
                  />
                  <Main
                    weatherType={getWeatherType(weatherData.temperature)}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    temperature={weatherData.temperature}
                    location={weatherData.location}
                    condition={weatherData.condition}
                    sunrise={weatherData.sunrise}
                    sunset={weatherData.sunset}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header
                    onAddClick={handleAddClick}
                    location={weatherData.location}
                    temperature={weatherData.temperature}
                  />
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onAddClick={handleAddClick}
                  />
                  <Footer />
                </>
              }
            />
          </Routes>

          {selectedCard && (
            <ItemModal
              item={selectedCard}
              onClose={handleModalClose}
              onDeleteRequest={handleDeleteRequest}
            />
          )}

          {itemToDelete && (
            <DeleteConfirmationModal
              item={itemToDelete}
              onCancel={handleCancelDelete}
              onConfirm={handleCardDelete}
            />
          )}

          {activeModal === "add-clothes" && (
            <ModalWithForm
              name="add-clothes"
              title="New Garment"
              buttonText="Add Garment"
              onClose={handleModalClose}
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
                <legend className="modal__legend">
                  Select the weather type:
                </legend>
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
          )}
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
