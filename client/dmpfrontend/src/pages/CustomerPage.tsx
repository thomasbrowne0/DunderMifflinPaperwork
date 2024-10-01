import React from 'react';
import NavBar from './components/NavBar';

const CustomerPage: React.FC = () => {
    return (
        <div>
            <NavBar />
            <h1>Customer Page</h1>
            <p>Welcome to the Customer Page!</p>
        </div>
    );
};

export default CustomerPage;