import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  let [temperature, setTemperature] = useState(null);
  let [city, setCity] = useState(null);
  let [description, setDescription] = useState(null);
  let [windSpeed, setWindSpeed] = useState(null);
  let [humidity, setHumidity] = useState(null);

  let form = (
    <form className="form">
      <input type="search" placeholder="Enter a city" onChange={enterCity} />
      <input type="submit" value="Search" onClick={handleSubmit} />
    </form>
  );

  function enterCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city !== "") {
      let apiKey = `0fe9b540f68c6dd4f5773125bf1b7104`;
      let units = "metric";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
      axios.get(url).then(displayWeather);
    } else {
      alert(`Enter a city`);
    }
  }

  function displayWeather(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].main);
    setWindSpeed(Math.round(response.data.wind.speed));
    setHumidity(response.data.main.humidity);
  }

  if (temperature) {
    return (
      <div>
        {form}
        <ul className="Weather">
          <li>Tempurature : {temperature}°C</li>
          <li>Description : {description}</li>
          <li>Wind : {windSpeed} km/hr </li>
          <li>Humidity : {humidity}% </li>
        </ul>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
