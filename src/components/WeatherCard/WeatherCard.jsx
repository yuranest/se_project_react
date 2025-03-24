import React from "react";
import "./WeatherCard.css";

function WeatherCard({ temperature, condition, sunrise, sunset }) {
  const currentTime = Math.floor(Date.now() / 1000);
  const isDay = currentTime > sunrise && currentTime < sunset;

  const getBackgroundImage = () => {
    const timeOfDay = isDay ? "day" : "night";
    const conditionMap = {
      clear: "sunny",
      clouds: "cloudy",
      rain: "rain",
      drizzle: "rain",
      thunderstorm: "storm",
      snow: "snow",
      fog: "fog",
      mist: "fog",
      haze: "fog",
    };

    const mappedCondition = conditionMap[condition] || "sunny";

    return new URL(
      `../../assets/${mappedCondition}-${timeOfDay}.png`,
      import.meta.url
    ).href;
  };

  const backgroundImage = getBackgroundImage();

  return (
    <section
      className="weather-card"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <p className="weather__temp">{temperature}°F</p>
    </section>
  );
}

export default WeatherCard;
