import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import WeatherWidget from '../components/WeatherWidget';
import { useAuth } from '../context/AuthContext';

interface Task {
  id: number;
  title: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Charger les villes depuis le localStorage de l'utilisateur
      const citiesKey = `weatherPageCities_${user.email}`;
      const savedCitiesRaw = localStorage.getItem(citiesKey);
      const savedCities = savedCitiesRaw ? JSON.parse(savedCitiesRaw) : [];
      setCities(savedCities);

      // Charger les tâches depuis le localStorage de l'utilisateur
      const tasksKey = `todoPageTasks_${user.email}`;
      const savedTasksRaw = localStorage.getItem(tasksKey);
      const savedTasks = savedTasksRaw ? JSON.parse(savedTasksRaw) : [];
      setTasks(savedTasks);
    }
  }, [user]);

  return (
    <div className="dashboard-page">
      <h1>Votre Dashboard</h1>

      <section className="dashboard-section">
        <h2>Météo des villes suivies</h2>
        <div className="widget-container">
          {cities.length > 0 ? (
            cities.map(city => (
              <Link to="/weather" key={city} className="widget-link">
                <WeatherWidget city={city} />
              </Link>
            ))
          ) : (
            <p className="no-cities-message">Aucune ville enregistrée. Allez sur la page Météo pour en ajouter.</p>
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Prochaines tâches</h2>
        <div className="task-summary-container">
          {tasks.length > 0 ? (
            tasks.slice(0, 5).map(task => (
              <Link to="/tasks" key={task.id} className="task-link">
                <div className="task-summary-item">
                  <span className="task-title">{task.title}</span>
                  <span className="task-date">Pour le: {task.date}</span>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-tasks-message">Aucune tâche pour le moment. Allez sur la page Tâches pour en créer.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;