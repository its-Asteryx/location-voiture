import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Categorie() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/cars');
        const cars = await res.json();

        // Group by type and get the first car of each type
        const categoryMap = {};
        cars.forEach(car => {
          if (!categoryMap[car.type]) {
            categoryMap[car.type] = car;
          }
        });

        const categoryList = Object.keys(categoryMap).map(type => ({
          type,
          image: categoryMap[type].image,
        }));

        setCategories(categoryList);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mt-20 mb-20">Browse by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <Link to={`/category/${cat.type}`} key={index}>
            <div className="rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
              <img src={cat.image} alt={cat.type} className="w-full h-40 object-cover" />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold">{cat.type.replace('-', ' ')}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categorie;
