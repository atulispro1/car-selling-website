import "./../styles/searchBar.css";

export default function SearchBar() {
  return (
    <section className="search-section">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by car name or brand"
        />

        <select>
          <option>Location</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
          <option>Pune</option>
        </select>

        <select>
          <option>Price Range</option>
          <option>Below ₹10L</option>
          <option>₹10L – ₹25L</option>
          <option>₹25L – ₹50L</option>
          <option>₹50L+</option>
        </select>

        <button>Search</button>
      </div>
    </section>
  );
}
