import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Réinitialise l'erreur à chaque soumission

    if (isLoginMode) {
      // Logique de connexion (Sign In)
      const users = JSON.parse(localStorage.getItem('app_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        login(user);
        navigate('/'); // Redirige vers le Dashboard
      } else {
        setError('Email ou mot de passe incorrect.');
      }
    } else {
      // Logique d'inscription (Sign Up)
      const newUser = { firstName, lastName, email, password };
      const users = JSON.parse(localStorage.getItem('app_users') || '[]');
      users.push(newUser);
      localStorage.setItem('app_users', JSON.stringify(users));
      login(newUser);
      navigate('/'); // Redirige vers le Dashboard
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>{isLoginMode ? 'Connexion' : 'Inscription'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">Prénom</label>
                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Nom de famille</label>
                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn">{isLoginMode ? 'Se connecter' : 'S\'inscrire'}</button>
        </form>
        <p className="toggle-mode">
          {isLoginMode ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
          <span onClick={toggleMode}>{isLoginMode ? 'Inscrivez-vous' : 'Connectez-vous'}</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;