import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';

function Voiture() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/cars')
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error('Error fetching cars:', err));
  }, []);

  const handleReservationClick = (car) => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      navigate('/reservation', { state: { car } });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mt-20 mb-10">Our Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <CarCard
            key={car._id}
            car={car}
            handleReservationClick={handleReservationClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Voiture;
