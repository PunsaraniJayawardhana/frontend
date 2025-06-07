import React, { useState, FormEvent, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    // At least 12 characters, one uppercase, one special character (@, #, $, &)
    const re = /^(?=.*[A-Z])(?=.*[@#$&]).{12,}$/;
    return re.test(password);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      alert(
        'Password must be at least 12 characters long, contain at least one uppercase letter and one special character (@, #, $, &).'
      );
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      alert(res.data.message);
      navigate('/login');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              data-testid="username"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              data-testid="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              data-testid="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
