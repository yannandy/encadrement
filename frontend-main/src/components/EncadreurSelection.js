import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EncadreurSelection({ userId }) {
  const [supervisors, setSupervisors] = useState([]);
  const [masters, setMasters] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedMaster, setSelectedMaster] = useState('');

  useEffect(() => {
    // Fetch supervisors and masters with ratings
    async function fetchData() {
      const supervisorsRes = await axios.get('http://localhost:8000/api/supervisors/');
      const mastersRes = await axios.get('http://localhost:8000/api/masters/');
      setSupervisors(supervisorsRes.data);
      setMasters(mastersRes.data);
    }
    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/choose-encadreur/', {
        supervisor_id: selectedSupervisor,
        master_id: selectedMaster,
        user_id: userId,
      });
      alert('Encadreur chosen successfully');
    } catch (err) {
      alert('Error choosing encadreur');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Choose Supervisor and Master</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Supervisor</label>
          <select
            value={selectedSupervisor}
            onChange={(e) => setSelectedSupervisor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
          <label className="block text-gray-600 mb-1">Master</label>
          <select
            value={selectedMaster}
            onChange={(e) => setSelectedMaster(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md "
          >
            <option value="">Select Master</option>
            {masters.map((master) => (
              <option key={master.id} value={master.id}>
                {master.name} (Rating: {master.average_rating || 'N/A'})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Choose Encadreur
        </button>
      </form>
    </div>
  );
}

export default EncadreurSelection;
