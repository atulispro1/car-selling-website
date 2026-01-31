import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useCars } from "../context/CarsContext";
import { useAuth } from "../context/AuthContext";
import ContactModal from "../components/ContactModal";

import "./../styles/carDetails.css";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { cars, deleteCar } = useCars();
  const { user } = useAuth();

  const car = cars.find((c) => c.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  /* ---------------- SOCIAL STATE ---------------- */
  const storageKey = `car-social-${id}`;
  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState("");

  /* ---------------- LOAD SOCIAL DATA ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || {
      ratings: [],
      comments: [],
    };

    setRatings(saved.ratings);
    setComments(saved.comments);

    if (user) {
      const existing = saved.ratings.find((r) => r.email === user.email);
      if (existing) setUserRating(existing.value);
    }
  }, [id, user]);

  /* ---------------- SAVE SOCIAL DATA ---------------- */
  const persistSocial = (newRatings, newComments) => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ ratings: newRatings, comments: newComments }),
    );
  };

  if (!car) {
    return (
      <section className="car-details">
        <h2 style={{ padding: "4rem", textAlign: "center" }}>Car not found</h2>
      </section>
    );
  }

  /* ✅ OWNERSHIP CHECK */
  const isOwner = user && car.seller === user.email;

  /* ---------------- SIMILAR CARS ---------------- */
  const similarCars = cars.filter(
    (c) => c.id !== car.id && c.condition === car.condition,
  );

  /* ---------------- DELETE ---------------- */
  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (!confirm) return;

    deleteCar(car.id);
    navigate("/cars");
  };

  /* ---------------- RATING ---------------- */
  const handleRating = (value) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const filtered = ratings.filter((r) => r.email !== user.email);
    const updated = [...filtered, { email: user.email, value }];

    setRatings(updated);
    setUserRating(value);
    persistSocial(updated, comments);
  };

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length).toFixed(
          1,
        )
      : "No ratings";

  /* ---------------- COMMENT ---------------- */
  const submitComment = () => {
    if (!user || !commentText.trim()) return;

    const newComment = {
      email: user.email,
      name: user.name,
      text: commentText,
      date: new Date().toLocaleDateString(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    setCommentText("");

    persistSocial(ratings, updatedComments);
  };
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  /* ---------------- EDIT COMMENT ---------------- */
  const startEdit = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const saveEdit = (index) => {
    if (!editText.trim()) return;

    const updatedComments = [...comments];
    updatedComments[index] = {
      ...updatedComments[index],
      text: editText,
    };

    setComments(updatedComments);
    persistSocial(ratings, updatedComments);

    setEditingIndex(null);
    setEditText("");
  };

  /* ---------------- DELETE COMMENT ---------------- */
  const deleteComment = (index) => {
    const confirm = window.confirm("Delete this comment?");
    if (!confirm) return;

    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    persistSocial(ratings, updatedComments);
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
          <p className="price">₹{car.price}</p>

          <ul className="specs">
            <li>
              <strong>Year:</strong> {car.year}
            </li>
            <li>
              <strong>Fuel:</strong> {car.fuel}
            </li>
            <li>
              <strong>Transmission:</strong> {car.transmission}
            </li>
            <li>
              <strong>Condition:</strong> {car.condition}
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
              <strong>Seller:</strong> {car.sellerName}
            </p>
            <p>
              <strong>Posted on:</strong>{" "}
              {new Date(car.createdAt).toDateString()}
            </p>
          </div>

          {/* OWNER ACTIONS */}
          {isOwner && (
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

          {!isOwner && (
            <button
              className="contact-btn"
              onClick={() => {
                if (!user) {
                  navigate("/login");
                  return;
                }
                setOpenModal(true);
              }}
            >
              Contact Seller
            </button>
          )}
        </div>
      </div>

      {/* ================= RATING ================= */}
      <div className="similar-section">
        <h2>Rating</h2>
        <p>Average: {averageRating} ⭐</p>

        <div style={{ fontSize: "1.6rem" }}>
          {[1, 2, 3, 4, 5].map((v) => (
            <span
              key={v}
              style={{
                cursor: "pointer",
                color: v <= userRating ? "#ff3d3d" : "#ccc",
              }}
              onClick={() => handleRating(v)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* ================= COMMENTS ================= */}
      <div className="similar-section">
        <h2>Comments</h2>

        {user && (
          <div style={{ marginBottom: "1rem" }}>
            <textarea
              rows="3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              style={{ width: "100%", padding: "10px" }}
            />
            <button
              className="contact-btn"
              style={{ marginTop: "0.6rem" }}
              onClick={submitComment}
            >
              Post Comment
            </button>
          </div>
        )}

        {comments.length === 0 && <p>No comments yet.</p>}

        {comments.map((c, i) => {
          const isCommentOwner = user && user.email === c.email;

          return (
            <div
              key={i}
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
                {c.name.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <strong>{c.name}</strong>

                {/* EDIT MODE */}
                {editingIndex === i ? (
                  <>
                    <textarea
                      rows="2"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{ width: "100%", marginTop: "4px" }}
                    />

                    <div
                      style={{ marginTop: "6px", display: "flex", gap: "8px" }}
                    >
                      <button
                        className="contact-btn"
                        style={{ padding: "6px 12px" }}
                        onClick={() => saveEdit(i)}
                      >
                        Save
                      </button>

                      <button
                        className="contact-btn"
                        style={{ background: "#777", padding: "6px 12px" }}
                        onClick={() => {
                          setEditingIndex(null);
                          setEditText("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ margin: "4px 0" }}>{c.text}</p>
                    <small style={{ color: "#777" }}>{c.date}</small>
                  </>
                )}
              </div>

              {/* ACTIONS (OWNER ONLY) */}
              {isCommentOwner && editingIndex !== i && (
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    className="contact-btn"
                    style={{ padding: "6px 10px" }}
                    onClick={() => startEdit(i, c.text)}
                  >
                    Edit
                  </button>

                  <button
                    className="contact-btn"
                    style={{ background: "#333", padding: "6px 10px" }}
                    onClick={() => deleteComment(i)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= SIMILAR CARS ================= */}
      {similarCars.length > 0 && (
        <div className="similar-section">
          <h2>Similar Cars</h2>

          <div className="similar-grid">
            {similarCars.map((c) => (
              <Link key={c.id} to={`/cars/${c.id}`} className="similar-card">
                <img src={c.images?.[0] || "/no-image.png"} alt={c.name} />
                <div className="similar-info">
                  <h4>{c.name}</h4>
                  <span>₹{c.price}</span>
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
