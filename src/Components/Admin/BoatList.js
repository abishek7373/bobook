import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BoatForm from './BoatForm';
import './BoatList.css';

const BoatList = () => {
  const [boats, setBoats] = useState([]);
  const [editingBoat, setEditingBoat] = useState(null);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchBoats = async () => {
      const response = await axios.get('http://localhost:3001/boatData', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBoats(response.data);
    };
    fetchBoats();
  }, [token]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/boatData/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBoats(boats.filter(boat => boat.id !== id));
  };

  const handleSave = () => {
    setEditingBoat(null);
    const fetchBoats = async () => {
      const response = await axios.get('http://localhost:3001/boatData', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBoats(response.data);
    };
    fetchBoats();
  };

  return (
    <div className="boat-list-container">
      <h2>Boat List</h2>
      {editingBoat ? (
        <BoatForm token={token} boat={editingBoat} onSave={handleSave} />
      ) : (
        <BoatForm token={token} onSave={handleSave} />
      )}
      <ul>
        {boats.map(boat => (
          <li key={boat.id}>
            {boat.name} - {boat.location}
            <button onClick={() => setEditingBoat(boat)}>Edit</button>
            <button onClick={() => handleDelete(boat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoatList;
