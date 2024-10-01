import React from 'react';
import NavBar from './components/NavBar';

const AdminPage: React.FC = () => {
    return (
        <div>
            <NavBar />
            <h1>Admin Page</h1>
            <p>Welcome to the Admin Page!</p>
        </div>
    );
};

export default AdminPage;