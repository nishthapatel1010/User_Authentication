// src/pages/WelcomePage.js
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to My Webpage</h1>
      <Button 
        type="primary" 
        size="large" 
        onClick={() => navigate('/register')}
        className="bg-white text-blue-600 hover:text-indigo-600 font-semibold"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default WelcomePage;
