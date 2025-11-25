import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Headers.css';

const Headers: React.FC = () => {
  return (
    <header className="main-header">
      {/* Barre de navigation horizontale supérieure */}
      <div className="top-bar">
        <div className="app-title">TodoList App</div>
        <div className="login-logout-section">
          <NavLink to="/login" className="login-logout-button">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            Login
          </NavLink>
        </div>
      </div>

      {/* Barre de navigation verticale à gauche */}
      <nav className="sidebar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Accueil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tasks" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
              Tâches
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/weather" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
              Météo
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Headers;