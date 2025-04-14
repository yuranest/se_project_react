import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getWeatherData, getWeatherType } from "../../utils/weatherApi";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";
import avatar from "../../assets/avatar.png";
import "./App.css";

const user = {
  name: "Terrence Tegegne",
  avatar: avatar,
};

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
  };

  const handleDeleteRequest = (item) => {
    setItemToDelete(item);
  };

  const handleCardDelete = (item) => {
    console.log("Deleting item:", item);
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

  const handleSubmit = (formData) => {
    const newItem = {
      ...formData,
      _id: Date.now(),
    };

    addItem(newItem)
      .then((item) => {
        setClothingItems((prev) => [item, ...prev]);
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
                    user={user}
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
                    user={user}
                    onAddClick={handleAddClick}
                    location={weatherData.location}
                    temperature={weatherData.temperature}
                  />
                  <Profile
                    user={user}
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
            <AddItemModal
              isOpen={true}
              onAddItem={handleSubmit}
              onCloseModal={handleModalClose}
            />
          )}
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
