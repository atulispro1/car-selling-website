import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { useAuth } from "../context/AuthContext";
import { useCars } from "../context/CarsContext";

import "./../styles/sellCar.css";

const CLOUD_NAME = "do7fuzdao";
const UPLOAD_PRESET = "carsell_unsigned";

export default function SellCar() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { addCar } = useCars();

  /* ------------------ STATE ------------------ */
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    fuel: "",
    transmission: "",
    price: "",
    city: "",
    condition: "",
    sellerPhone: "",
    description: "", // ✅ FIX (WAS MISSING)
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ------------------ PROTECT ROUTE ------------------ */
  useEffect(() => {
    if (!user) {
      alert("You must be logged in to sell a car.");
      navigate("/login");
    }
  }, [user, navigate]);

  /* ------------------ ANIMATION ------------------ */
  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  }, []);

  /* ------------------ HANDLERS ------------------ */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* -------- CLOUDINARY IMAGE UPLOAD -------- */
  const handleImages = async (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    setLoading(true);

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", UPLOAD_PRESET);

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: data },
          );

          const json = await res.json();
          return json.secure_url;
        }),
      );

      setImages((prev) => [...prev, ...uploaded]);
    } catch {
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ VALIDATION ------------------ */
  const validate = () => {
    const e = {};
    if (!formData.brand) e.brand = "Required";
    if (!formData.model) e.model = "Required";
    if (!formData.year) e.year = "Required";
    if (!formData.fuel) e.fuel = "Required";
    if (!formData.transmission) e.transmission = "Required";
    if (!formData.price) e.price = "Required";
    if (!formData.city) e.city = "Required";
    if (!formData.condition) e.condition = "Required";
    if (!formData.sellerPhone) e.sellerPhone = "Required";
    if (images.length === 0) e.images = "At least one image required";
    return e;
  };

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    const newCar = {
      name: `${formData.brand} ${formData.model}`,
      year: formData.year,
      fuel: formData.fuel,
      transmission: formData.transmission,
      price: formData.price,
      city: formData.city,
      condition: formData.condition,
      description: formData.description,
      sellerPhone: formData.sellerPhone,
      images,
      seller: user.email,
      sellerName: user.name,
    };

    addCar(newCar);
    setSubmitted(true);
  };

  /* ------------------ SUCCESS ------------------ */
  if (submitted) {
    return (
      <section className="sell-car">
        <div className="sell-container success">
          <h1>🎉 Car Listed Successfully!</h1>
          <p>Your car is now visible on the platform.</p>

          <button className="submit-btn" onClick={() => navigate("/cars")}>
            View Cars
          </button>
        </div>
      </section>
    );
  }

  /* ------------------ FORM ------------------ */
  return (
    <section className="sell-car">
      <div className="sell-container" ref={formRef}>
        <h1>Sell Your Car</h1>
        <p>Fill all details carefully</p>

        <form className="sell-form" onSubmit={handleSubmit}>
          <input name="brand" placeholder="Brand" onChange={handleChange} />
          {errors.brand && <span className="error-text">{errors.brand}</span>}

          <input name="model" placeholder="Model" onChange={handleChange} />
          {errors.model && <span className="error-text">{errors.model}</span>}

          <input
            type="number"
            name="year"
            placeholder="Year"
            onChange={handleChange}
          />
          {errors.year && <span className="error-text">{errors.year}</span>}

          <select name="fuel" onChange={handleChange}>
            <option value="">Select Fuel</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>CNG</option>
          </select>

          <select name="transmission" onChange={handleChange}>
            <option value="">Select Transmission</option>
            <option>Manual</option>
            <option>Automatic</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />
          <input name="city" placeholder="City" onChange={handleChange} />

          <input
            name="sellerPhone"
            placeholder="WhatsApp Number"
            onChange={handleChange}
          />

          <select name="condition" onChange={handleChange}>
            <option value="">Car Type</option>
            <option value="new">New Car</option>
            <option value="used">Used Car</option>
          </select>

          <textarea
            name="description"
            rows="4"
            placeholder="Describe condition, mileage, ownership, etc."
            onChange={handleChange}
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
          />
          {loading && <p>Uploading images...</p>}

          <div className="image-preview">
            {images.map((img, i) => (
              <img key={i} src={img} alt="preview" />
            ))}
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? "Uploading..." : "Submit Car"}
          </button>
        </form>
      </div>
    </section>
  );
}
