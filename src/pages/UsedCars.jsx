import { useState } from "react";
import CarsListing from "../components/CarsListing";
import CarSearchBar from "../components/CarSearchBar";

export default function UsedCars() {
  const [filters, setFilters] = useState({});

  return (
    <>
      <CarSearchBar onSearch={setFilters} />
      <CarsListing type="used" filters={filters} />
    </>
  );
}
