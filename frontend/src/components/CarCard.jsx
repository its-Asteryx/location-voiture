import React from 'react';

function CarCard({ car, handleReservationClick }) {
  return (
    <div className="rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
      <img src={car.image} alt={car.name} className="w-full h-60 object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{car.name}</h2>
        <p className="text-gray-600">{car.type}</p>
        <p className="text-gray-700 font-medium">Price: DT{car.price} / day</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => handleReservationClick(car)}
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
}

export default CarCard;
