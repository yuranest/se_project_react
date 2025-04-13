import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({
  weatherType,
  clothingItems,
  onCardClick,
  temperature,
  location,
  condition,
  sunrise,
  sunset,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const convertedTemperature =
    currentTemperatureUnit === "F"
      ? Math.round((temperature * 9) / 5 + 32)
      : temperature;

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      <WeatherCard
        temperature={temperature}
        location={location}
        condition={condition}
        sunrise={sunrise}
        sunset={sunset}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {convertedTemperature}°{currentTemperatureUnit} / You may
          want to wear:
        </p>
      </section>
      <ul className="card__list">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
