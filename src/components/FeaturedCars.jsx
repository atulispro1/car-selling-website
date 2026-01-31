import { Link } from "react-router-dom";
import { useCars } from "../context/CarsContext";
import "./../styles/featuredCars.css";

export default function FeaturedCars() {
  const { cars } = useCars();

  if (cars.length === 0) {
    return (
      <section className="featured-cars">
        <div className="featured-header">
          <h2>Featured Cars</h2>
          <p>No cars listed yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-cars">
      <div className="featured-header">
        <h2>Featured Cars</h2>
        <p>Explore the latest cars listed on our platform</p>
      </div>

      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image">
              <img
                src={car.images?.[0] || "/no-image.png"}
                alt={car.name}
              />
            </div>

            <div className="car-info">
              <h3>{car.name}</h3>

              <p className="car-meta">
                {car.year} • {car.fuel} •{" "}
                {car.condition === "used" ? "Used" : "New"}
              </p>

              <div className="car-footer">
                <span className="price">₹{car.price}</span>

                <Link to={`/cars/${car.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
