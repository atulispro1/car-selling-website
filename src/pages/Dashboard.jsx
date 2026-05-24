import { Link } from "react-router-dom";
import { useCars } from "../context/CarsContext";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { cars, deleteCar } = useCars();
  const { user } = useAuth();

  const myCars = cars;

  const bestSellerCount = myCars.filter((c) => c.condition === "used").length;
  const newCount = myCars.filter((c) => c.condition === "new").length;

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">
        <h1>Welcome, {user.name}</h1>
        <p className="dashboard-sub">Manage your product listings</p>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{myCars.length}</h3>
            <span>Total Products</span>
          </div>

          <div className="stat-card">
            <h3>{bestSellerCount}</h3>
            <span>Best Sellers</span>
          </div>

          <div className="stat-card">
            <h3>{newCount}</h3>
            <span>New Products</span>
          </div>
        </div>

        {myCars.length === 0 ? (
          <div className="empty-state">
            <p>You have not posted any products yet.</p>
            <Link to="/sell" className="sell-btn">
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="dashboard-cars">
            {myCars.map((car) => (
              <div key={car.id} className="dashboard-card">
                <div className="card-left">
                  <img src={car.images?.[0]} alt={car.name} />
                  <div>
                    <h3>{car.name}</h3>
                    <span>
                      {car.year} | Rs. {car.price} |{" "}
                      {car.condition === "used" ? "Best Seller" : "New Product"}
                    </span>
                  </div>
                </div>

                <div className="card-actions">
                  <Link to={`/edit/${car.id}`} className="edit-btn">
                    Edit
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this product?",
                        )
                      ) {
                        deleteCar(car.id).catch((error) => {
                          alert(
                            error.message || "Product could not be deleted.",
                          );
                        });
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
