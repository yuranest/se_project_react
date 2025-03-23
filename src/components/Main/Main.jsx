import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({
  weatherType,
  clothingItems,
  onCardClick,
  temperature,
  location,
}) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className="main">
      <WeatherCard temperature={temperature} location={location} />
      <ul className="card-list">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
