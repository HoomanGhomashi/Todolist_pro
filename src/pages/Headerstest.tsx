import React from 'react';
import { Link } from 'react-router-dom';

const Headers: React.FC = () => {
  return (
    <header>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', padding: 0 }}>
          <Link to="/">Accueil</Link>
          <Link to="/tasks">Ajouter une tâche</Link>
          <Link to="/weather">Météo</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Headers;