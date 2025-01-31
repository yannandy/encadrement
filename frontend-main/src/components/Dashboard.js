import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import EncadreurSelection from './EncadreurSelection';
import SupervisorRating from './SupervisorRating';
import SupervisorList from './SupervisorList';
import MasterList from './MasterList';
import MasterRating from './MasterRating';

function Dashboard({ userName, userId, setUserId}) {
  const [activeComponent, setActiveComponent] = useState('encadreurSelection');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'encadreurSelection':
        return <EncadreurSelection userId={userId} />;
      case 'logout':
        return <Navigate to="/" />;
      case 'supervisorRating':
        return <SupervisorRating userId={userId}/>;
      case 'supervisorList':
        return <SupervisorList />;
      case 'masterList':
        return <MasterList />;
      case 'masterRating':
        return <MasterRating userId={userId}/>;
      default:
        return <EncadreurSelection userId={userId} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-blue-900 text-white flex flex-col p-6">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveComponent('encadreurSelection')}
            className={`block py-2 px-4 text-left rounded-lg hover:bg-blue-700 transition ${
              activeComponent === 'encadreurSelection' ? 'bg-blue-800' : ''
            }`}
          >
            Encadreur Selection
          </button>
          <button
            onClick={() => setActiveComponent('supervisorRating')}
            className={`block py-2 px-4 text-left rounded-lg hover:bg-blue-700 transition ${
              activeComponent === 'supervisorRating' ? 'bg-blue-800' : ''
            }`}
          >
            Supervisor Rating
          </button>
          <button
            onClick={() => setActiveComponent('supervisorList')}
            className={`block py-2 px-4 text-left rounded-lg hover:bg-blue-700 transition ${
              activeComponent === 'supervisorList' ? 'bg-blue-800' : ''
            }`}
          >
            Supervisor List
          </button>
          <button
            onClick={() => setActiveComponent('masterList')}
            className={`block py-2 px-4 text-left rounded-lg hover:bg-blue-700 transition ${
              activeComponent === 'masterList' ? 'bg-blue-800' : ''
            }`}
          >
            Master List
          </button>
          <button
            onClick={() => setActiveComponent('masterRating')}
            className={`block py-2 px-4 text-left rounded-lg hover:bg-blue-700 transition ${
              activeComponent === 'masterRating' ? 'bg-blue-800' : ''
            }`}
          >
            Rate Master
          </button>
          <button
            onClick={() => setUserId(null)}
            className={`block py-2 px-4 text-left rounded-lg hover:bg-blue-700 transition ${
              activeComponent === 'logout' ? 'bg-blue-800' : ''
            }`}
          >
            LogOut
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-blue-500 text-white py-4 px-8 shadow-md">
          <h1 className="text-2xl font-semibold">Welcome back, {userName}!</h1>
        </div>

        {/* Rendered Component */}
        <div className="flex-1 p-8 overflow-auto bg-white">
          <div className=" rounded-lg  h-full">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
