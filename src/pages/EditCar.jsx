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

  const [formData, setFormData] = useState(() => {
    if (!car) return null;

    return {
      brand: car.name.split(" ")[0],
      model: car.name.split(" ").slice(1).join(" "),
      year: car.year,
      fuel: car.fuel,
      transmission: car.transmission,
      price: car.price,
      city: car.city,
      condition: car.condition,
      description: car.description || "",
    };
  });

  useEffect(() => {
    if (!car) {
      navigate("/");
      return;
    }

    if (!user?.isAdmin) {
      alert("You are not allowed to edit this product.");
      navigate("/");
      return;
    }

  }, [car, user, navigate]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.isAdmin) {
      alert("You are not allowed to edit this product.");
      navigate("/cars");
      return;
    }

    const updatedCar = {
      ...car,
      name: `${formData.brand} ${formData.model}`,
      year: formData.year,
      fuel: formData.fuel,
      transmission: formData.transmission,
      price: formData.price,
      city: formData.city,
      condition: formData.condition,
      description: formData.description,
    };

    try {
      await updateCar(updatedCar);
      navigate(`/cars/${car.id}`);
    } catch (error) {
      alert(error.message || "Product could not be updated.");
    }
  };

  return (
    <section className="sell-car">
      <div className="sell-container" ref={formRef}>
        <h1>Edit Product Details</h1>

        <form className="sell-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Variant or Type</label>
            <input
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Size or Quantity</label>
              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Skincare</option>
                <option>Hand Care</option>
                <option>Bath Care</option>
                <option>Hair Care</option>
                <option>Body Care</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Pack Type</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Bottle</option>
                <option>Pump Bottle</option>
                <option>Tube Pack</option>
                <option>Jar Pack</option>
                <option>Soap Bar</option>
                <option>Dropper</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (Rs.)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Product Status</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="new">New Product</option>
              <option value="used">Best Seller</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Update product description"
            />
          </div>

          <button className="submit-btn">Update Product</button>
        </form>
      </div>
    </section>
  );
}
