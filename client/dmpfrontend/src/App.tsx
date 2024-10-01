import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage'; // Import AdminPage

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPage />} /> {/* Use AdminPage */}
            <Route path="/customer" element={<CustomerPage />} />
        </Routes>
    );
};

export default App;