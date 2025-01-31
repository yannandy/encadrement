import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', formData);
      alert('Registration successful');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img 
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" 
          alt="Register" 
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} method="POST">
          {['username', 'email', 'password', 'first_name', 'last_name'].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-gray-600 capitalize">{field.replace('_', ' ')}</label>
              <input 
                type={field === 'password' ? 'password' : 'text'} 
                id={field}
                name={field} 
                value={formData[field]} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-md py-2 px-3 " 
                autoComplete="off"
              />
            </div>
          ))}

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button 
            type="submit" 
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-green-500 text-center">
          <a href="/" className="hover:underline">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
