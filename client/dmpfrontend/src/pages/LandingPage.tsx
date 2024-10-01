import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Welcome</h1>
                <button onClick={() => navigate('/admin')} style={{ margin: '10px', padding: '10px 20px' }}>
                    Admin
                </button>
                <button onClick={() => navigate('/customer')} style={{ margin: '10px', padding: '10px 20px' }}>
                    Customer
                </button>
            </div>
        </div>
    );
};

export default LandingPage;