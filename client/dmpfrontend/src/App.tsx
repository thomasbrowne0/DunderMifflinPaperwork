import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CustomerPage from './pages/CustomerPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/customer/:id" element={<CustomerDetailPage />} />
        </Routes>
    );
};

export default App;