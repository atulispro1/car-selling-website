import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className="car-card">
      <div className="car-image">
        <img
          src={car.images?.[0]}
          alt={car.name}
        />
      </div>

      <div className="car-info">
        <h3>{car.name}</h3>

        <p className="car-meta">
          {car.year} • {car.fuel} • {car.transmission}
        </p>

        <div className="car-footer">
          <span className="price">₹{car.price}</span>

          <Link to={`/cars/${car.id}`}>
            <button>View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
