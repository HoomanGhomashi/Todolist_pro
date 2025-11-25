import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import WeatherWidget from '../components/WeatherWidget';

const Dashboard: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const savedCitiesRaw = localStorage.getItem('weatherPageCities');
    const savedCities = savedCitiesRaw ? JSON.parse(savedCitiesRaw) : [];
    setCities(savedCities);
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Votre Dashboard</h1>
      <section className="dashboard-section">
        <h2>Météo des villes suivies</h2>
        <div className="widget-container">
          {cities.length > 0 ? (
            cities.map(city => <WeatherWidget key={city} city={city} />)
          ) : (
            <p className="no-cities-message">Aucune ville enregistrée. Allez sur la page Météo pour en ajouter.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;