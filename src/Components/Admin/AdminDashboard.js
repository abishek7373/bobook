import React, { useState } from 'react';
import BoatList from './BoatList';
import UserList from './UserList';
import BookingList from './BookingList';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [view, setView] = useState('boats');

  const renderContent = () => {
    switch (view) {
      case 'boats':
        return <BoatList />;
      case 'users':
        return <UserList />;
      case 'bookings':
        return <BookingList />;
      default:
        return <BoatList />;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="button-group" id='grp'>
        <button onClick={() => setView('boats')}>Manage Boats</button>
        <button onClick={() => setView('users')}>Manage Users</button>
        <button onClick={() => setView('bookings')}>Manage Bookings</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
