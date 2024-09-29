import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const toggleRole = () => {
    setIsAdmin(!isAdmin);
    navigate(isAdmin ? '/customer' : '/admin');
  };

  return (
      <div className="App">
        <header className="App-header">
          <button onClick={toggleRole}>
            Switch to {isAdmin ? 'Customer' : 'Admin'}
          </button>
            <p>Test</p>
        </header>
      </div>
  );
}

function Customer() {
  return <h2>Customer Page</h2>;
}

function Admin() {
  return <h2>Admin Page</h2>;
}

export default function AppWrapper() {
  return (
      <Router>
        <Routes>
          <Route path="/customer" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
  );
}