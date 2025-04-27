// src/pages/Search.jsx


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function Search() {
  const [query, setQuery] = useState("");
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      setError(null);
      fetch(`http://localhost:8000/api/cars/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setCars(data);
          if (data.length === 0) {
            setError(`No results found for '${query}'`);
          }
          } else {
            console.error('Unexpected response:', data);
            setCars([]);
          }
        })
        .catch(err => {
          console.error('Search error:', err);
          setError('An error occurred while searching.');
          setCars([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setCars([]);
      setError(null);
    }
  }, [query]);
  
  const handleClick = (carId) => {
    navigate(`/voiture/${carId}`);
  };
  function highlightText(text, highlight) {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 font-semibold">{part}</span>
      ) : (
        part
      )
    );
  }
  
  
  

  return (
    <div className="p-6 max-w-3xl mx-auto mt-20">
      <input
        type="text"
        placeholder="Search cars..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      {loading && (
  <div className="flex justify-center mt-12">
    <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}

      {error && !loading && (
        <p className="text-center mt-6 text-red-500">{error}</p>
      )}

      <div className="mt-4 space-y-4">
        {cars.map((car) => (
          <div key={car._id}
              onClick={() => handleClick(car._id)}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out p-4 border rounded-xl shadow-md flex items-center space-x-4">
            <img src={car.image} alt={car.name} className="w-24 h-16 object-cover rounded" />
            <div>
            <h2 className="text-lg font-semibold">{highlightText(car.name, query)}</h2>

              <p className="text-sm text-gray-500">{car.type}</p>
              <p className="text-blue-600 font-bold">${car.price}/day</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
