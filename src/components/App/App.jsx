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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { register, authorize, checkToken } from "../../utils/auth";
import "./App.css";
import { useNavigate } from "react-router-dom";

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
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token check failed:", err);
        localStorage.removeItem("jwt");
      });
  }, []);

  const handleRegister = (formData) => {
    register(formData)
      .then(() =>
        authorize({ email: formData.email, password: formData.password })
      )
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllModals();
      })
      .catch((err) => console.error("Registration failed:", err));
  };

  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllModals();
      })
      .catch((err) => console.error("Login failed:", err));
  };

  const handleCardClick = (item) => setSelectedCard(item);

  const closeAllModals = () => {
    setSelectedCard(null);
    setItemToDelete(null);
    setActiveModal("");
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    if (!activeModal && !isRegisterModalOpen && !isLoginModalOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeAllModals();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, isRegisterModalOpen, isLoginModalOpen]);

  const handleDeleteRequest = (item) => {
    setItemToDelete(item);
  };

  const handleCardDelete = (item) => {
    deleteItem(item._id)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
        setSelectedCard(null);
        setItemToDelete(null);
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const handleAddClick = () => setActiveModal("add-clothes");

  const handleAddItemFormSubmit = (formData) => {
    const newItem = {
      name: formData.name,
      weather: formData.weather,
      imageUrl: formData.imageUrl,
    };

    addItem(newItem)
      .then((item) => {
        setClothingItems((prev) => [item, ...prev]);
        closeAllModals();
      })
      .catch((err) => console.error("Add item failed:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/"); // Navigator
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
                    user={currentUser}
                    onAddClick={handleAddClick}
                    location={weatherData.location}
                    temperature={weatherData.temperature}
                    onRegisterClick={() => setIsRegisterModalOpen(true)}
                    onLoginClick={() => setIsLoginModalOpen(true)}
                    isLoggedIn={isLoggedIn}
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
                    user={currentUser}
                    onAddClick={handleAddClick}
                    location={weatherData.location}
                    temperature={weatherData.temperature}
                    isLoggedIn={isLoggedIn}
                  />
                  <Profile
                    user={currentUser}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onAddClick={handleAddClick}
                    onSignOut={handleSignOut}
                  />
                  <Footer />
                </>
              }
            />
          </Routes>

          {selectedCard && (
            <ItemModal
              item={selectedCard}
              onClose={closeAllModals}
              onDeleteRequest={handleDeleteRequest}
              isOnlyModalOpen={!itemToDelete}
            />
          )}

          {itemToDelete && (
            <DeleteConfirmationModal
              isOpen={true}
              item={itemToDelete}
              onCancel={handleCancelDelete}
              onConfirm={handleCardDelete}
              isOnlyModalOpen={true}
            />
          )}

          {activeModal === "add-clothes" && (
            <AddItemModal
              isOpen={true}
              onAddItem={handleAddItemFormSubmit}
              onCloseModal={closeAllModals}
            />
          )}

          {isRegisterModalOpen && (
            <RegisterModal
              isOpen={true}
              onClose={closeAllModals}
              onRegister={handleRegister}
            />
          )}

          {isLoginModalOpen && (
            <LoginModal
              isOpen={true}
              onClose={closeAllModals}
              onLogin={handleLogin}
            />
          )}
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
