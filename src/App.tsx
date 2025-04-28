import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Device from './pages/Device';
import WhatsAppWeb from './pages/WhatsAppWeb';
import { useTheme } from './context/ThemeContext';
import { socketService } from './services/socket';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Check if user is logged in (simplified for demo)
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    
    // Initialize socket connection
    socketService.init();
    
    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="h-full bg-gray-50 dark:bg-whatsapp-dark-secondary text-gray-900 dark:text-gray-100">
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="device" element={<Device />} />
          <Route path="whatsapp" element={<WhatsAppWeb />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;