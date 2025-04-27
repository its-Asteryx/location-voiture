import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { useAuth } from '../context/authContext';

function CategoryDetail() {
  const { type } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/cars?type=${type}`)        ;
        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [type]);

  const handleReservationClick = (car) => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      navigate('/reservation', { state: { car } });
    }
  };

  return (
    <div className="p-2">
      <h3 className="text-5xl font-bold text-center mt-20 mb-10">
        {type ? type.replace('-', ' ') : 'Category'}
      </h3>
      {loading ? (
        <p className="text-center text-gray-500">Loading cars...</p>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              handleReservationClick={handleReservationClick}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No cars available in this category.</p>
      )}
    </div>
  );
}

export default CategoryDetail;
