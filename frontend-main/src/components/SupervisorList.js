import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SupervisorList() {
  const [supervisors, setSupervisors] = useState([]);

  // Fetch supervisors
  useEffect(() => {
    async function fetchSupervisors() {
      try {
        const response = await axios.get('http://localhost:8000/api/supervisors/');
        setSupervisors(response.data);
      } catch (error) {
        console.error('Failed to fetch supervisors:', error);
      }
    }
    fetchSupervisors();
  }, []);

  return (
    <div className="w-full p-6 text-gray-700 rounded-lg ">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Supervisors List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-300 bg-blue-200">
                <p className="text-sm font-semibold text-gray-700">Name</p>
              </th>
              <th className="p-4 border-b border-gray-300 bg-blue-200">
                <p className="text-sm font-semibold text-gray-700">Specialty</p>
              </th>
              <th className="p-4 border-b border-gray-300 bg-blue-200">
                <p className="text-sm font-semibold text-gray-700">Availability</p>
              </th>
              <th className="p-4 border-b border-gray-300 bg-blue-200">
                <p className="text-sm font-semibold text-gray-700">Rating</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {supervisors.map((supervisor) => (
              <tr key={supervisor.id} className="hover:bg-blue-50">
                <td className="p-4 border-b border-gray-200">
                  <p className="text-sm text-gray-800 font-semibold">{supervisor.name}</p>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">{supervisor.specialty}</p>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">
                    {supervisor.available ? 'Available' : 'Not Available'}
                  </p>
                </td>
                <td className="p-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">{supervisor.average_rating || 'N/A'}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupervisorList;
