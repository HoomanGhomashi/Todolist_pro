import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import TodoPage from './pages/TodoPage';
import WeatherPage from './pages/WeatherPage';
import Dashboard from './pages/Dashboard';
import Headers from './pages/Headers';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {/* Le header sera affiché en haut de chaque page */}
      <Headers />
      {/* Le contenu principal avec une marge pour la barre du haut et la barre latérale */}
      <main style={{ paddingTop: '70px', marginLeft: '240px', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
          <Route path="/weather" element={<ProtectedRoute><WeatherPage /></ProtectedRoute>} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;