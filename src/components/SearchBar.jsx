import "./../styles/searchBar.css";

export default function SearchBar() {
  return (
    <section className="search-section">
      <div className="search-box">
        <input type="text" placeholder="Search by product name or category" />

        <select>
          <option>Location</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
          <option>Pune</option>
        </select>

        <select>
          <option>Price Range</option>
          <option>Below Rs. 250</option>
          <option>Rs. 250 - Rs. 500</option>
          <option>Rs. 500 - Rs. 750</option>
          <option>Rs. 750+</option>
        </select>

        <button>Search</button>
      </div>
    </section>
  );
}
