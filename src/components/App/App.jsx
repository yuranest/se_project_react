import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import { defaultClothingItems } from "../../utils/constants";
import { getWeatherData, getWeatherType } from "../../utils/weatherApi";

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
  const [activeModal, setActiveModal] = useState("");

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

    setClothingItems(defaultClothingItems);
  }, []);

  const handleCardClick = (item) => setSelectedCard(item);
  const handleModalClose = () => {
    setSelectedCard(null);
    setActiveModal("");
  };

  const handleAddClick = () => {
    setActiveModal("add-clothes");
  };

  return (
    <div className="page">
      <div className="page__content">
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

        {selectedCard && (
          <ItemModal item={selectedCard} onClose={handleModalClose} />
        )}

        {activeModal === "add-clothes" && (
          <ModalWithForm
            name="add-clothes"
            title="New Garment"
            buttonText="Add Garment"
            onClose={handleModalClose}
          >
            {/* Inputs */}
          </ModalWithForm>
        )}
      </div>
    </div>
  );
}

export default App;
