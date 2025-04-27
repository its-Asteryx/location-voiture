import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useLocation } from "react-router-dom";

function VoitureDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/cars/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Car not found");
        }
        return res.json();
      })
      .then((data) => {
        setCar(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching car details:", err);
        setError("Car not found. Please try a different search.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleReserveClick = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    navigate("/reservation", {
      state: { car },
    });
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto mt-20">
      <img src={car.image} alt={car.name} className="w-full h-full object-cover rounded-xl" />
      <h1 className="text-2xl font-bold mt-4">{car.name}</h1>
      <p className="text-gray-600">{car.type}</p>
      <p className="text-blue-600 text-xl font-semibold">${car.price} / day</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleReserveClick}
      >
        Reserve Now
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default VoitureDetail;
