import React, { useContext } from 'react';
import AuthContext from '../../context/authContext';

const Dashboard = () => {

    const { username } = useContext(AuthContext);
    console.log(username);

    return (
        <div style={{
            padding: '20px',
            maxWidth: '400px',
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '16px'
            }}>Dashboard</h2>
            {username == null ? (
                <p style={{
                    fontSize: '18px'
                }}>Please log in!</p>
            ) : (
                <p style={{
                    fontSize: '18px'
                }}>Welcome, <span style={{ fontWeight: 'bold' }}>{username}</span>!</p>
            )}
        </div>
    );
};

export default Dashboard;