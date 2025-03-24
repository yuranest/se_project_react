import { latitude, longitude, weatherApiKey } from "./constants";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=imperial`;

export function getWeatherData() {
  return fetch(weatherUrl).then((res) => {
    if (!res.ok) {
      throw new Error("Weather fetch failed");
    }
    return res.json();
  });
}

export function getWeatherType(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
}
