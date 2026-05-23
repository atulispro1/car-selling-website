import { useState } from "react";
import "./../styles/searchBar.css";

export default function CarSearchBar({ onSearch = () => {} }) {
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
          placeholder="Search face wash, soap, serum..."
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
          <option>Lucknow</option>
          <option>Chennai</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="0-250">Below Rs. 250</option>
          <option value="250-500">Rs. 250 - Rs. 500</option>
          <option value="500-750">Rs. 500 - Rs. 750</option>
          <option value="750-5000">Rs. 750+</option>
        </select>

        <button type="submit">Search</button>
      </form>
    </section>
  );
}
