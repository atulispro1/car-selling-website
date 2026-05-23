import { useCars } from "../context/CarsContext";
import CarCard from "./CarCard";
import "./../styles/carsListing.css";

export default function CarsListing({ type, filters = {} }) {
  const { cars } = useCars();

  let filteredCars = cars;

  if (type === "used") {
    filteredCars = filteredCars.filter((car) => car.condition === "used");
  }

  if (filters.query) {
    const q = filters.query.toLowerCase();
    filteredCars = filteredCars.filter((car) =>
      car.name.toLowerCase().includes(q),
    );
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

  return (
    <section className="cars-listing">
      <div className="listing-header">
        <h2>{type === "used" ? "Best Sellers" : "Shop Products"}</h2>
      </div>

      <div className="listing-grid">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
