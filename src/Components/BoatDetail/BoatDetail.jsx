import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BoatDetail.css';

const BoatDetail = () => {
    const { id } = useParams();
    const [boat, setBoat] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/boatData`)
            .then(response => response.json())
            .then(data => {
                const selectedBoat = data.find(boat => boat.id === parseInt(id));
                setBoat(selectedBoat);
            });
    }, [id]);

    if (!boat) {
        return <div>Loading...</div>;
    }

    return (
        <div className="boat-detail-container">
            <img src={boat.image} alt={boat.name} className="boat-detail-image" />
            <h1>{boat.name}</h1>
            <p>{boat.description}</p>
            <p className="boat-detail-price">{boat.price}</p>
        </div>
    );
};

export default BoatDetail;
