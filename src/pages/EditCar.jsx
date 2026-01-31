import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

import { useCars } from "../context/CarsContext";
import { useAuth } from "../context/AuthContext";

import "./../styles/sellCar.css";

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const { cars, updateCar } = useCars();
  const { user } = useAuth();

  const car = cars.find((c) => c.id === id);

  const [formData, setFormData] = useState(null);

  /* ---------------- SAFETY ---------------- */
  useEffect(() => {
    if (!car) {
      navigate("/");
      return;
    }

    if (car.seller !== user?.email) {
      alert("You are not allowed to edit this car.");
      navigate("/");
      return;
    }

    setFormData({
      brand: car.name.split(" ")[0],
      model: car.name.split(" ").slice(1).join(" "),
      year: car.year,
      fuel: car.fuel,
      transmission: car.transmission,
      price: car.price,
      city: car.city,
      condition: car.condition,
      description: car.description || "", // ✅ NEW
    });
  }, [car, user, navigate]);

  /* ---------------- ANIMATION ---------------- */
  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, []);

  if (!formData) return null;

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCar = {
      ...car,
      name: `${formData.brand} ${formData.model}`,
      year: formData.year,
      fuel: formData.fuel,
      transmission: formData.transmission,
      price: formData.price,
      city: formData.city,
      condition: formData.condition,
      description: formData.description, // ✅ NEW
    };

    updateCar(updatedCar);
    navigate(`/cars/${car.id}`);
  };

  return (
    <section className="sell-car">
      <div className="sell-container" ref={formRef}>
        <h1>Edit Car Details</h1>

        <form className="sell-form" onSubmit={handleSubmit}>
          {/* BRAND */}
          <div className="form-group">
            <label>Brand</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          {/* MODEL */}
          <div className="form-group">
            <label>Model</label>
            <input
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          {/* ROW */}
          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Fuel</label>
              <select
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>CNG</option>
              </select>
            </div>
          </div>

          {/* ROW */}
          <div className="form-row">
            <div className="form-group">
              <label>Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Manual</option>
                <option>Automatic</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* CITY */}
          <div className="form-group">
            <label>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* CONDITION */}
          <div className="form-group">
            <label>Car Type</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="new">New Car</option>
              <option value="used">Used Car</option>
            </select>
          </div>
          {/* DESCRIPTION */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Update car description"
            />
          </div>

          <button className="submit-btn">Update Car</button>
        </form>
      </div>
    </section>
  );
}
