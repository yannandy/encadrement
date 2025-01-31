import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SupervisorRating({ userId }) {
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchSupervisors() {
      const response = await axios.get('http://localhost:8000/api/supervisors/');
      setSupervisors(response.data);
    }
    fetchSupervisors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/rate-encadreur/', {
        encadreur_id: selectedSupervisor,
        rating: parseFloat(rating),
        user_id: userId,
      });
      setMessage('Rating submitted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to submit rating');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Rate a Supervisor</h2>

      {message && (
        <div className={`p-4 mb-4 ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Select Supervisor</label>
          <select
            value={selectedSupervisor}
            onChange={(e) => setSelectedSupervisor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md "
          >
            <option value="">Select Supervisor</option>
            {supervisors.map((supervisor) => (
              <option key={supervisor.id} value={supervisor.id}>
                {supervisor.name} (Rating: {supervisor.average_rating || 'N/A'})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
}

export default SupervisorRating;
