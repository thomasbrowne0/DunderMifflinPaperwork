import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        display: 'block',
        width: '100%',
        height: '100%',
        padding: '10px',
        textAlign: 'center'
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#333', color: '#fff' }}>
            <div style={{ flex: 1 }}>
                <Link to="/" style={linkStyle}>Home</Link>
            </div>
        </nav>
    );
};

export default NavBar;