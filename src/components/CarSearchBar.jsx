import { useState } from "react";
import "./../styles/searchBar.css";

export default function CarSearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      query: query.trim(),
      city,
      priceRange,
    });
  };

  return (
    <section className="search-section">
      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by car name or brand"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">All Cities</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
          <option>Pune</option>
          <option>Hyderabad</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="0-1000000">Below ₹10L</option>
          <option value="1000000-2500000">₹10L – ₹25L</option>
          <option value="2500000-5000000">₹25L – ₹50L</option>
          <option value="5000000-100000000">₹50L+</option>
        </select>

        <button type="submit">Search</button>
      </form>
    </section>
  );
}
