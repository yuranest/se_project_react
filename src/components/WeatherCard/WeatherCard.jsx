import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

function WeatherCard({ temperature, condition, sunrise, sunset }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const convertedTemperature =
    currentTemperatureUnit === "F"
      ? Math.round((temperature * 9) / 5 + 32)
      : temperature;

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
    <section className="weather-card">
      <img
        src={backgroundImage}
        alt="weather visual"
        className="weather-card__image"
      />
      <p className="weather__temp">
        {convertedTemperature}°{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
