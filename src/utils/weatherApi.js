import { latitude, longitude, weatherApiKey } from "./constants";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export function getWeatherData() {
  return fetch(
    `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  });
}

export function getWeatherType(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
}
