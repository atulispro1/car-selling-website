import { useEffect, useState } from "react";
import "./../styles/searchBar.css";

export default function SearchBar({ onSearch = () => {} }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    onSearch({
      query: query.trim(),
      city,
      priceRange,
    });
  }, [query, city, priceRange, onSearch]);

  return (
    <section className="search-section">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by product name or category"
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
      </div>
    </section>
  );
}
