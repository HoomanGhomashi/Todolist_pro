import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Headers.css';

const Headers: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Vous avez été déconnecté.');
    navigate('/login');
    window.location.reload(); // Pour forcer la mise à jour de l'état
  };

  return (
    <>
      <div className="top-bar">
        <div className="app-title">Mon Dashboard</div>
        <div className="login-logout-section">
          {user ? (
            <>
              <span className="user-greeting">Bonjour, {user.firstName}</span>
              <button onClick={handleLogout} className="login-logout-button">
                Sign Out
              </button>
            </>
          ) : (
            <NavLink to="/login" className="login-logout-button">
              Sign In
            </NavLink>
          )}
        </div>
      </div>

      <aside className="sidebar">
        <ul className="nav-list">
          <NavLink to="/" className="nav-link">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Accueil
          </NavLink>
          <NavLink to="/tasks" className="nav-link">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
            Tâches
          </NavLink>
          <NavLink to="/weather" className="nav-link">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
            Météo
          </NavLink>
        </ul>
      </aside>
    </>
  );
};

export default Headers;