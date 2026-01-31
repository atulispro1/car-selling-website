import { Link } from "react-router-dom";
import { useCars } from "../context/CarsContext";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { cars, deleteCar } = useCars();
  const { user } = useAuth();

  const myCars = cars.filter((car) => car.seller === user.email);

  const usedCount = myCars.filter((c) => c.condition === "used").length;
  const newCount = myCars.filter((c) => c.condition === "new").length;

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">
        {/* HEADER */}
        <h1>Welcome, {user.name}</h1>
        <p className="dashboard-sub">
          Manage your car listings
        </p>

        {/* STATS */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{myCars.length}</h3>
            <span>Total Cars</span>
          </div>

          <div className="stat-card">
            <h3>{usedCount}</h3>
            <span>Used Cars</span>
          </div>

          <div className="stat-card">
            <h3>{newCount}</h3>
            <span>New Cars</span>
          </div>
        </div>

        {/* LIST */}
        {myCars.length === 0 ? (
          <div className="empty-state">
            <p>You haven’t posted any cars yet.</p>
            <Link to="/sell" className="sell-btn">
              Sell Your First Car
            </Link>
          </div>
        ) : (
          <div className="dashboard-cars">
            {myCars.map((car) => (
              <div key={car.id} className="dashboard-card">
                <div className="card-left">
                  <img
                    src={car.images?.[0]}
                    alt={car.name}
                  />
                  <div>
                    <h3>{car.name}</h3>
                    <span>
                      {car.year} • ₹{car.price} • {car.condition}
                    </span>
                  </div>
                </div>

                <div className="card-actions">
                  <Link
                    to={`/edit/${car.id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this car?"
                        )
                      ) {
                        deleteCar(car.id);
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
