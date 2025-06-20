import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getWeatherData, getWeatherType } from "../../utils/weatherApi";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { register, authorize, checkToken } from "../../utils/auth";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        setLoginError("");
        closeAllModals();
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setLoginError("Incorrect email or password");
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch((err) => console.error("Profile update failed:", err))
      .finally(() => setIsLoading(false));
  };

  const handleCardClick = (item) => setSelectedCard(item);

  const closeAllModals = () => {
    setSelectedCard(null);
    setItemToDelete(null);
    setActiveModal("");
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsEditProfileModalOpen(false);
  };

  useEffect(() => {
    if (
      !activeModal &&
      !isRegisterModalOpen &&
      !isLoginModalOpen &&
      !isEditProfileModalOpen
    )
      return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeAllModals();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [
    activeModal,
    isRegisterModalOpen,
    isLoginModalOpen,
    isEditProfileModalOpen,
  ]);

  const handleDeleteRequest = (item) => {
    setItemToDelete(item);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const handleCardDelete = (item) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.warn("No token — please log in first.");
      return;
    }

    deleteItem(item._id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
        setSelectedCard(null);
        setItemToDelete(null);
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleAddClick = () => setActiveModal("add-clothes");

  const handleSwitchToRegister = () => {
    closeAllModals();
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    closeAllModals();
    setIsLoginModalOpen(true);
  };

  const handleAddItemFormSubmit = (formData) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.warn("No token — please log in first.");
      return;
    }

    const newItem = {
      name: formData.name,
      weather: formData.weather,
      imageUrl: formData.imageUrl,
    };

    setIsLoading(true);
    addItem(newItem, token)
      .then((item) => {
        setClothingItems((prev) => [item, ...prev]);
        closeAllModals();
      })
      .catch((err) => console.error("Add item failed:", err))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    (!isLiked ? addCardLike(id, token) : removeCardLike(id, token))
      .then((updatedCard) => {
        setClothingItems((prev) =>
          prev.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Like update failed:", err));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser }}>
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
                      onRegisterClick={handleSwitchToRegister}
                      onLoginClick={handleSwitchToLogin}
                      isLoggedIn={isLoggedIn}
                    />
                    <Main
                      weatherType={getWeatherType(weatherData.temperature)}
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
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
                      onEditProfile={() => setIsEditProfileModalOpen(true)}
                      onCardLike={handleCardLike}
                    />
                    <Footer />
                  </ProtectedRoute>
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
                isLoading={isLoading}
                onAddItem={handleAddItemFormSubmit}
                onCloseModal={closeAllModals}
              />
            )}
            {isRegisterModalOpen && (
              <RegisterModal
                isOpen={true}
                onClose={closeAllModals}
                onRegister={handleRegister}
                onSwitchToLogin={handleSwitchToLogin}
              />
            )}
            {isLoginModalOpen && (
              <LoginModal
                isOpen={true}
                onClose={closeAllModals}
                onLogin={handleLogin}
                loginError={loginError}
                onSwitchToRegister={handleSwitchToRegister}
              />
            )}
            {isEditProfileModalOpen && (
              <EditProfileModal
                isOpen={true}
                isLoading={isLoading}
                onClose={closeAllModals}
                onUpdateUser={handleUpdateUser}
              />
            )}
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
