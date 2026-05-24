import { useState } from "react";
import { Link } from "react-router-dom";
import { useCars } from "../context/CarsContext";
import CarCard from "./CarCard";
import "./../styles/carsListing.css";

export default function CarsListing({
  type,
  filters = {},
  initialLimit,
  showExploreButton = false,
}) {
  const { cars } = useCars();
  const [showAll, setShowAll] = useState(false);

  let filteredCars = cars;

  if (type === "used") {
    filteredCars = filteredCars.filter((car) => car.condition === "used");
  }

  if (filters.query) {
    const q = filters.query.toLowerCase();
    filteredCars = filteredCars.filter((car) => {
      const searchableText = [
        car.name,
        car.fuel,
        car.transmission,
        car.city,
        car.condition === "used" ? "best seller" : "new product",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }

  if (filters.city) {
    filteredCars = filteredCars.filter((car) => car.city === filters.city);
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split("-").map(Number);

    filteredCars = filteredCars.filter((car) => {
      const price = Number(String(car.price).replace(/[^0-9]/g, ""));
      return price >= min && price <= max;
    });
  }

  if (filteredCars.length === 0) {
    return (
      <section className="cars-listing">
        <h2>No products found</h2>
      </section>
    );
  }

  const hasLimit = initialLimit && filteredCars.length > initialLimit;
  const visibleCars =
    hasLimit && !showAll ? filteredCars.slice(0, initialLimit) : filteredCars;

  return (
    <section className="cars-listing">
      <div className="listing-header">
        <h2>{type === "used" ? "Best Sellers" : "Shop Products"}</h2>
      </div>

      <div className="listing-grid">
        {visibleCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {(hasLimit || showExploreButton) && (
        <div className="listing-actions">
          {hasLimit && !showAll && (
            <button className="show-more-btn" onClick={() => setShowAll(true)}>
              Show More
            </button>
          )}

          {showExploreButton && (
            <Link to="/cars" className="explore-all-btn">
              Explore All Products
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
