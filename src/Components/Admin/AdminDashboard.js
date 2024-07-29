import React, { useState } from 'react';
import BoatList from './BoatList';
import UserList from './UserList';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [view, setView] = useState('boats');

  const renderContent = () => {
    switch (view) {
      case 'boats':
        return <BoatList />;
      case 'users':
        return <UserList />;
      default:
        return <BoatList />;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="button-group">
        <button onClick={() => setView('boats')}>Manage Boats</button>
        <button onClick={() => setView('users')}>Manage Users</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
