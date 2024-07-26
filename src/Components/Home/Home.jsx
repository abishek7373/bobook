import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [boats, setBoats] = useState([]);
    const [filteredBoats, setFilteredBoats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/boatData')
            .then(response => response.json())
            .then(data => {
                setBoats(data);
                setFilteredBoats(data); // Set both initial boats and filtered boats
            });
    }, []);

    useEffect(() => {
        // Filter boats based on the search term
        const filtered = boats.filter(boat =>
            boat.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBoats(filtered); // Update filtered boats
    }, [searchTerm, boats]);

    const handleCardClick = (id) => {
        navigate(`/boat/${id}`);
    };

    return (
        <div className="home-container">
            <h1>Special Boats</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="boat-grid">
                {filteredBoats.length > 0 ? (
                    filteredBoats.map(boat => (
                        <div key={boat.id} className="boat-card" onClick={() => handleCardClick(boat.id)}>
                            <img src={boat.image} alt={boat.name} className="boat-image" />
                            <h2>{boat.name}</h2>
                            <p>{boat.description}</p>
                            <p className="boat-price">{boat.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No boats found for the selected location.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
