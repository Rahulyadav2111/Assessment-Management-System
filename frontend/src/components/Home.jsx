import React from 'react';
import { Link } from 'react-router-dom';

// Home page component
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to AMS</h1>
        <p className="text-gray-600 mb-8">Assessment Management System: Generate detailed health and fitness reports.</p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;