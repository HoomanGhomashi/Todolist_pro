import React, { useState } from 'react';
import '../styles/WeatherPageStyles.css';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'ec58aaf4fa80595b8a3fcc0f16c03d2f';

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!city) {
      setError("Veuillez entrer un nom de ville.");
      return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
      if (!response.ok) {
        throw new Error('Ville non trouvée. Veuillez vérifier le nom de la ville.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page">
      <h1>Page Météo</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez le nom d'une ville"
        />
        <button type="submit">Rechercher</button>
      </form>

      {loading && <p className="loading-message">Chargement...</p>}
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-card">
          <h2>Météo pour {weatherData.name}</h2>
          <div className="weather-main">
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="icône météo" />
            <div>
              <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
              <p className="description">{weatherData.weather[0].description}</p>
            </div>
          </div>
          <div className="weather-details">
            <p>Humidité: {weatherData.main.humidity}%</p>
            <p>Vent: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;