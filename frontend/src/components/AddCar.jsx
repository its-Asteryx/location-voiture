import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCar() {
  const [form, setForm] = useState({ name: "", type: "", price: "" });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("price", form.price);
      formData.append("image", imageFile);

      const res = await fetch("http://localhost:8000/api/cars", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add car");
      else if (res.status === 201) {
        alert("Car added successfully!");
      }

        
    } catch (err) {
      setError("Could not add car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Car Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Car Type"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          placeholder="Price per day"
          className="w-full p-2 border rounded"
          required
          min="1"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Car"}
        </button>
      </form>
    </div>
  );
}
