import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCars } from "../context/CarsContext";
import { useAuth } from "../context/AuthContext";
import ContactModal from "../components/ContactModal";

import "./../styles/carDetails.css";

function formatPostedDate(value) {
  if (!value) return "Recently added";

  const date =
    typeof value.toDate === "function" ? value.toDate() : new Date(value);

  if (Number.isNaN(date.getTime())) return "Recently added";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    cars,
    deleteCar,
    addComment,
    listenComments,
    setRating,
    listenRatings,
  } = useCars();
  const { user } = useAuth();

  const car = cars.find((c) => c.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [ratingPulse, setRatingPulse] = useState(0);

  useEffect(() => {
    if (!id) return undefined;

    return listenComments(id, setComments);
  }, [id, listenComments]);

  useEffect(() => {
    if (!id) return undefined;

    return listenRatings(id, (nextRatings) => {
      setRatings(nextRatings);
      setUserRating(0);
    });
  }, [id, listenRatings]);

  if (!car) {
    return (
      <section className="car-details">
        <h2 style={{ padding: "4rem", textAlign: "center" }}>
          Product not found
        </h2>
      </section>
    );
  }

  const canManageProduct = Boolean(user?.isAdmin);

  /* ---------------- SIMILAR PRODUCTS ---------------- */
  const similarCars = cars.filter(
    (c) => c.id !== car.id && c.condition === car.condition,
  );

  /* ---------------- DELETE ---------------- */
  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirm) return;

    deleteCar(car.id)
      .then(() => navigate("/cars"))
      .catch((error) => {
        alert(error.message || "Product could not be deleted.");
      });
  };

  /* ---------------- RATING ---------------- */
  const handleRating = async (value) => {
    setUserRating(value);
    setRatingPulse(value);

    window.setTimeout(() => {
      setRatingPulse(0);
    }, 420);

    try {
      await setRating(car.id, value);
    } catch (error) {
      alert(
        error.message?.includes("permission")
          ? "Firebase is blocking public ratings. Please publish the updated Firestore rules."
          : error.message || "Rating could not be saved.",
      );
    }
  };

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length).toFixed(
          1,
        )
      : "No ratings";

  /* ---------------- COMMENT ---------------- */
  const submitComment = async () => {
    if (!commentText.trim()) return;

    setCommentSubmitting(true);

    try {
      await addComment(car.id, commentName, commentText);
      setCommentName("");
      setCommentText("");
    } catch (error) {
      alert(error.message || "Comment could not be posted.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  return (
    <section className="car-details">
      {/* ================= MAIN DETAILS ================= */}
      <div className="details-wrapper">
        {/* IMAGE GALLERY */}
        <div className="details-gallery">
          <img
            src={car.images?.[activeImage] || "/no-image.png"}
            alt={car.name}
            className="main-image"
          />

          {car.images?.length > 1 && (
            <div className="thumbnail-row">
              {car.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumbnail-${index}`}
                  className={index === activeImage ? "thumb active" : "thumb"}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="details-info">
          <h1>{car.name}</h1>
          <p className="price">Rs. {car.price}</p>

          <ul className="specs">
            <li>
              <strong>Size:</strong> {car.year}
            </li>
            <li>
              <strong>Category:</strong> {car.fuel}
            </li>
            <li>
              <strong>Pack Type:</strong> {car.transmission}
            </li>
            <li>
              <strong>Status:</strong>{" "}
              {car.condition === "used" ? "Best Seller" : "New Product"}
            </li>
            <li>
              <strong>City:</strong> {car.city}
            </li>
            <br />
            <li>
              <strong>Description:</strong>
              {car.description && (
                <p className="description">{car.description}</p>
              )}
            </li>
          </ul>

          <div style={{ marginTop: "1rem", color: "#555" }}>
            <p>
              <strong>Store:</strong> yusieorganics
            </p>
            <p>
              <strong>Posted on:</strong> {formatPostedDate(car.createdAt)}
            </p>
          </div>

          {/* OWNER ACTIONS */}
          {canManageProduct && (
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              <button
                className="contact-btn"
                onClick={() => navigate(`/edit/${car.id}`)}
              >
                Edit
              </button>

              <button
                className="contact-btn"
                style={{ background: "#333" }}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}

          {!user?.isAdmin && (
            <button
              className="contact-btn"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Contact Store
            </button>
          )}
        </div>
      </div>

      {/* ================= RATING ================= */}
      <div className="similar-section">
        <h2>Rating</h2>
        <p>Average: {averageRating} stars</p>

        <div className="rating-stars" aria-label="Product rating">
          {[1, 2, 3, 4, 5].map((v) => (
            <span
              key={v}
              className={`rating-star ${v <= userRating ? "active" : ""} ${
                v === ratingPulse ? "pulse" : ""
              }`}
              onClick={() => handleRating(v)}
            >
              <span className="rating-star-shape">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= COMMENTS ================= */}
      <div className="similar-section">
        <h2>Comments</h2>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            placeholder="Your name"
            style={{ width: "100%", padding: "10px", marginBottom: "0.6rem" }}
          />
          <textarea
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            style={{ width: "100%", padding: "10px" }}
          />
          <button
            className="contact-btn"
            style={{ marginTop: "0.6rem" }}
            onClick={submitComment}
            disabled={commentSubmitting}
          >
            {commentSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>

        {comments.length === 0 && <p>No comments yet.</p>}

        {comments.map((c) => {
          return (
            <div
              key={c.id}
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem 0",
                borderBottom: "1px solid #eee",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#ff3d3d",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {(c.name || "Guest").charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <strong>{c.name || "Guest"}</strong>
                <p style={{ margin: "4px 0" }}>{c.text}</p>
                <small style={{ color: "#777" }}>
                  {formatPostedDate(c.createdAt)}
                </small>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= SIMILAR PRODUCTS ================= */}
      {similarCars.length > 0 && (
        <div className="similar-section">
          <h2>Similar Products</h2>

          <div className="similar-grid">
            {similarCars.map((c) => (
              <Link key={c.id} to={`/cars/${c.id}`} className="similar-card">
                <img src={c.images?.[0] || "/no-image.png"} alt={c.name} />
                <div className="similar-info">
                  <h4>{c.name}</h4>
                  <span>Rs. {c.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <ContactModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        car={car}
      />
    </section>
  );
}
