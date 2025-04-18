import { latitude, longitude, weatherApiKey } from "./constants";
import { checkResponse } from "./api";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;

export function getWeatherData() {
  return fetch(weatherUrl).then(checkResponse);
}

export function getWeatherType(temp) {
  if (temp >= 30) return "hot";
  if (temp >= 19) return "warm";
  return "cold";
}
