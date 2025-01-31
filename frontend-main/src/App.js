// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import EncadreurSelection from './components/EncadreurSelection';
import SupervisorRating from './components/SupervisorRating';
import SupervisorList from './components/SupervisorList';
import MasterList from './components/MasterList';
import MasterRating from './components/MasterRating';
import Dashboard from './components/Dashboard';
import Register from './components/Register';

function App() {
  const [userId, setUserId] = useState(null); // To store user ID
  const [userName, setUserName] = useState(null); // To store user Name

  return (
    <Router>
      <div>
        <Routes>
          {/* Redirect to login if not authenticated */}
          <Route
            path="/"
            element={userId ? <Navigate to="/dashboard" /> : <Login setUserId={setUserId} setUserName={setUserName} />}
          />

          <Route path="/logout" element={<Navigate to="/" />} />

          <Route path="/register" element={<Register />} />

          {/* Protected route to dashboard */}
          {userId && (
            <Route path="/dashboard" element={<Dashboard userName={userName} userId={userId} setUserId={setUserId}/>} />
          )}

          {/* Other component routes, these should be inside the dashboard */}
          {userId && (
            <>
              <Route path="/encadreur-selection" element={<EncadreurSelection userId={userId} />} />
              <Route path="/rate-supervisor" element={<SupervisorRating userId={userId}/>} />
              <Route path="/supervisors" element={<SupervisorList />} />
              <Route path="/masters" element={<MasterList />} />
              <Route path="/rate-master" element={<MasterRating userId={userId}/>} />
              
            </>
          )}

          {/* Redirect to login if user tries to access any other route without logging in */}
          {!userId && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
