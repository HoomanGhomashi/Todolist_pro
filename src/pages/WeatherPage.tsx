import React, { useState, useEffect, useCallback } from 'react';
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
  const [cityInput, setCityInput] = useState('');
  const [cities, setCities] = useState<string[]>(() => {
    const savedCities = localStorage.getItem('weatherPageCities');
    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData | { error: string } | 'loading'>>({});

  const API_KEY = 'ec58aaf4fa80595b8a3fcc0f16c03d2f';

  const fetchWeatherForCity = useCallback(async (city: string) => {
    // Met à jour l'état pour indiquer le chargement pour cette ville spécifique
    setWeatherData(prev => ({ ...prev, [city.toLowerCase()]: 'loading' }));

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
      if (!response.ok) {
        throw new Error('Ville non trouvée');
      }
      const data = await response.json();
      setWeatherData(prev => ({ ...prev, [city.toLowerCase()]: data }));
    } catch (err: any) {
      setWeatherData(prev => ({ ...prev, [city.toLowerCase()]: { error: err.message } }));
    }
  }, [API_KEY]);

  // Sauvegarde les villes dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('weatherPageCities', JSON.stringify(cities));
  }, [cities]);

  // Charge la météo pour les villes sauvegardées au premier chargement
  useEffect(() => {
    cities.forEach(city => {
      // Ne recharge que si les données ne sont pas déjà là
      if (!weatherData[city.toLowerCase()]) {
        fetchWeatherForCity(city);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // S'exécute une seule fois au montage

  const handleAddCity = (event: React.FormEvent) => {
    event.preventDefault();
    const newCity = cityInput.trim();
    if (newCity && !cities.find(c => c.toLowerCase() === newCity.toLowerCase()) && cities.length < 4) {
      const newCities = [...cities, newCity];
      setCities(newCities);
      fetchWeatherForCity(newCity);
      setCityInput('');
    }
  };

  const handleRemoveCity = (cityToRemove: string) => {
    setCities(cities.filter(city => city.toLowerCase() !== cityToRemove.toLowerCase()));
    setWeatherData(prev => {
      const newState = { ...prev };
      delete newState[cityToRemove.toLowerCase()];
      return newState;
    });
  };

  return (
    <div className="weather-page">
      <h1>Page Météo</h1>
      <form onSubmit={handleAddCity} className="search-form">
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Ajouter une ville (max 4)"
          disabled={cities.length >= 4}
        />
        <button type="submit" disabled={cities.length >= 4}>Ajouter</button>
      </form>

      <div className="multi-weather-container">
        {cities.map(city => {
          const data = weatherData[city.toLowerCase()];
          return (
            <div key={city.toLowerCase()} className="weather-card-wrapper">
              {(!data || data === 'loading') && 
                <div className="weather-card-placeholder">
                  <p>Chargement pour {city}...</p>
                </div>
              }
              {data && typeof data === 'object' && 'error' in data && 
                <div className="weather-card-placeholder error"><p>Erreur pour {city}: {data.error}</p></div>
              }
              {data && typeof data === 'object' && 'name' in data &&

                <div className="weather-card">
                  <button onClick={() => handleRemoveCity(city)} className="remove-city-btn">×</button>
                  <h2>{data.name}</h2>
                  <div className="weather-main">
                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="icône météo" />
                    <div>
                      <p className="temp">{Math.round(data.main.temp)}°C</p>
                      <p className="description">{data.weather[0].description}</p>
                    </div>
                  </div>
                  <div className="weather-details">
                    <p>Humidité: {data.main.humidity}%</p>
                    <p>Vent: {data.wind.speed} m/s</p>
                  </div>
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherPage;