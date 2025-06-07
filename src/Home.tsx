import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('Loading...');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Unauthorized. Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setMessage('Welcome to the Home Page! 🎉');
    }
  }, [navigate]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="card p-5 shadow-lg text-center"
        style={{ maxWidth: '600px' }}
      >
        <h2 className="mb-4">{message}</h2>
        {message === 'Welcome to the Home Page! 🎉' && (
          <p className="lead">
            You have successfully logged in. Enjoy exploring the app!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
