// BookingList.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './BookingList.css'; // Import CSS

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get('http://localhost:3001/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    };
    fetchBookings();
  }, [token]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/bookings/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  return (
    <div className="booking-list-container">
      <h2>Booking List</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            <div className="booking-details">
              <span><strong>Customer_id:</strong> {booking.id || 'xyxy'}</span>
              <span><strong>Boat:</strong> {booking.boatName}</span>
              <span><strong>Total Price:</strong> ${booking.totalPrice}</span>
              <span><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</span>
            </div>
            <button onClick={() => handleDelete(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
