import React from 'react';
import '../styles/HomePageStyles.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Bienvenue !</h1>
        <p>Gérez vos tâches et consultez la météo simplement.</p>
      </div>
    </div>
  );
};

export default Home;