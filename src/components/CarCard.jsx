import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCars } from "../context/CarsContext";
import "./../styles/featuredCars.css";

export default function CarCard({ car }) {
  const { user } = useAuth();
  const { deleteCar } = useCars();
  const canDelete = Boolean(user?.isAdmin);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${car.name}?`,
    );

    if (!confirmed) return;

    try {
      await deleteCar(car.id);
    } catch (error) {
      alert(error.message || "Product could not be deleted.");
    }
  };

  return (
    <div className="car-card">
      <Link to={`/cars/${car.id}`} className="car-image" aria-label={car.name}>
        <img src={car.images?.[0]} alt={car.name} />
      </Link>

      <div className="car-info">
        <h3>{car.name}</h3>

        <p className="car-meta">
          {car.year} | {car.fuel} | {car.transmission}
        </p>

        <div className="car-footer">
          <span className="price">Rs. {car.price}</span>

          <Link to={`/cars/${car.id}`}>
            <button>View Details</button>
          </Link>
        </div>

        {canDelete && (
          <button className="card-delete-btn" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
