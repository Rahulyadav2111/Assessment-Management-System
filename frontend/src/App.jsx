import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ReportGenerator from './components/ReportGenerator';
import './index.css'; // Import Tailwind CSS

// Main App component
function App() {
  // State to track if user is logged in
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Function to handle login
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Function to handle logout
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">AMS</h1>
            {token && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={token ? <Navigate to="/report" /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={token ? <Navigate to="/report" /> : <Signup />} />
          <Route path="/report" element={!token ? <Navigate to="/login" /> : <ReportGenerator token={token} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;