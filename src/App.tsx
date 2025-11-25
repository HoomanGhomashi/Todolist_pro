import { Routes, Route } from 'react-router-dom';
import './App.css'
import TodoPage from './pages/TodoPage';
import WeatherPage from './pages/WeatherPage';
import Home from './pages/Home';
import Headers from './Headers';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      {/* Le header sera affiché en haut de chaque page */}
      <Headers />
      {/* Le contenu principal avec une marge pour la barre du haut et la barre latérale */}
      <main style={{ paddingTop: '70px', marginLeft: '240px', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TodoPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;