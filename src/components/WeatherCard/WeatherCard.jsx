function WeatherCard({ temperature }) {
  return (
    <section className="weather">
      <p className="weather__temp">{temperature}°F</p>
    </section>
  );
}

export default WeatherCard;
