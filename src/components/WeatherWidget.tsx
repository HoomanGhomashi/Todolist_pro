import React, { useState, useEffect } from 'react';
import '../styles/WeatherWidget.css';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

interface WeatherWidgetProps {
  city: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const API_KEY = 'ec58aaf4fa80595b8a3fcc0f16c03d2f';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
        if (!response.ok) throw new Error(`Météo pour ${city} non trouvée`);
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Erreur widget météo:", err);
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [city, API_KEY]);

  if (!weatherData) {
    return <div className="weather-widget-placeholder">Météo pour {city}...</div>;
  }

  return (
    <div className="weather-widget">
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="météo" className="weather-widget-icon" />
      <div className="weather-widget-info">
        <div className="weather-widget-city">{weatherData.name}</div>
        <div className="weather-widget-temp">{Math.round(weatherData.main.temp)}°C</div>
      </div>
    </div>
  );
};

export default WeatherWidget;