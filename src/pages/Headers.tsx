import React from 'react';
import { Link } from 'react-router-dom';

const Headers: React.FC = () => {
  return (
    <header>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', padding: 0 }}>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/tasks">Ajouter une tâche</Link>
          </li>
          <li>
            <Link to="/weather">Météo</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Headers;