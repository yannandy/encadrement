import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUserId, setUserName }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password });
      setUserName(response.data.first_name);
      setUserId(response.data.user_id); // Store user ID
      alert(`Login successful. Welcome, ${response.data.first_name} ${response.data.last_name}`);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img 
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" 
          alt="Placeholder" 
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-4 bg-sky-100">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full border border-gray-300 rounded-md py-2 px-3" 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border border-gray-300 rounded-md py-2 px-3" 
              autoComplete="off"
            />
          </div>

          <button 
            type="submit" 
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <div className="mt-6 text-green-500 text-center">
          <a href="/register" className="hover:underline">Sign up Here</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
