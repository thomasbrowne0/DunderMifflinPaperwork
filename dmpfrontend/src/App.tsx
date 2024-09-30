import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Orders from './components/Orders';
import Customers from './components/Customers';

const App: React.FC = () => {
    return (
        <div>
            <nav>
                <Link to="/orders">Orders</Link>
                <Link to="/customers">Customers</Link>
            </nav>
            <Routes>
                <Route path="/orders" element={<Orders />} />
                <Route path="/customers" element={<Customers />} />
            </Routes>
        </div>
    );
}

export default App;