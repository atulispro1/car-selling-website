import { useState } from "react";
import CarsListing from "../components/CarsListing";
import CarSearchBar from "../components/CarSearchBar";

export default function Cars() {
  const [filters, setFilters] = useState({});

  return (
    <>
      <CarSearchBar onSearch={setFilters} />
      <CarsListing filters={filters} />
    </>
  );
}
