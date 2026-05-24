import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { useAuth } from "../context/AuthContext";
import { useCars } from "../context/CarsContext";

import "./../styles/sellCar.css";

const CLOUD_NAME = "do7fuzdao";
const UPLOAD_PRESET = "carsell_unsigned";
const STORE_WHATSAPP_NUMBER = "7900377204";

export default function SellCar() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { addCar } = useCars();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    fuel: "",
    transmission: "",
    price: "",
    city: "",
    condition: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to add a product.");
      navigate("/login");
      return;
    }

    if (!user.isAdmin) {
      alert("Only the admin can add products.");
      navigate("/cars");
    }
  }, [user, navigate]);

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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
    if (images.length === 0) e.images = "At least one image required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.isAdmin) {
      alert("Only the admin can add products.");
      navigate("/cars");
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    setIsSubmitting(true);

    const newCar = {
      name: `${formData.brand} ${formData.model}`,
      year: formData.year,
      fuel: formData.fuel,
      transmission: formData.transmission,
      price: formData.price,
      city: formData.city,
      condition: formData.condition,
      description: formData.description,
      sellerPhone: STORE_WHATSAPP_NUMBER,
      images,
      seller: user.email,
      sellerName: user.name,
    };

    try {
      await addCar(newCar);
      setSubmitted(true);
    } catch (error) {
      alert(error.message || "Product could not be added.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="sell-car">
        <div className="sell-container success">
          <h1>Product Listed Successfully!</h1>
          <p>Your product is now visible on the platform.</p>

          <button className="submit-btn" onClick={() => navigate("/cars")}>
            View Products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="sell-car">
      <div className="sell-container" ref={formRef}>
        <h1>Add Product</h1>
        <p>Fill product details carefully</p>

        <form className="sell-form" onSubmit={handleSubmit}>
          <input
            name="brand"
            placeholder="Product Name"
            onChange={handleChange}
          />
          {errors.brand && <span className="error-text">{errors.brand}</span>}

          <input
            name="model"
            placeholder="Variant or Type"
            onChange={handleChange}
          />
          {errors.model && <span className="error-text">{errors.model}</span>}

          <input
            name="year"
            placeholder="Size or Quantity"
            onChange={handleChange}
          />
          {errors.year && <span className="error-text">{errors.year}</span>}

          <select name="fuel" onChange={handleChange}>
            <option value="">Select Category</option>
            <option>Skincare</option>
            <option>Hand Care</option>
            <option>Bath Care</option>
            <option>Hair Care</option>
            <option>Body Care</option>
          </select>

          <select name="transmission" onChange={handleChange}>
            <option value="">Select Pack Type</option>
            <option>Bottle</option>
            <option>Pump Bottle</option>
            <option>Tube Pack</option>
            <option>Jar Pack</option>
            <option>Soap Bar</option>
            <option>Dropper</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price in Rs."
            onChange={handleChange}
          />
          <input name="city" placeholder="City" onChange={handleChange} />

          <select name="condition" onChange={handleChange}>
            <option value="">Product Status</option>
            <option value="new">New Product</option>
            <option value="used">Best Seller</option>
          </select>

          <textarea
            name="description"
            rows="4"
            placeholder="Describe ingredients, use, fragrance, size, and benefits."
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

          <button className="submit-btn" disabled={loading || isSubmitting}>
            {isSubmitting ? (
              <span className="submit-progress">
                <span className="submit-spinner"></span>
                Submitting product, please wait...
              </span>
            ) : loading ? (
              "Uploading images..."
            ) : (
              "Submit Product"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
