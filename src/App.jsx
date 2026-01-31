import { BrowserRouter, Routes, Route } from "react-router-dom";

/* CONTEXT */
import { AuthProvider } from "./context/AuthContext";
import { CarsProvider } from "./context/CarsContext";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

/* PAGES */
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import UsedCars from "./pages/UsedCars";
import CarDetails from "./pages/CarDetails";
import SellCar from "./pages/SellCar";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import EditCar from "./pages/EditCar";
import Dashboard from "./pages/Dashboard";
import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";

/* STYLES */
import "./styles/navbar.css";
import "./styles/footer.css";

export default function App() {
  return (
    <AuthProvider>
      <CarsProvider>
        <BrowserRouter>
        <ScrollToTop />
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/used-cars" element={<UsedCars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />

            <Route
              path="/sell"
              element={
                <ProtectedRoute>
                  <SellCar />
                </ProtectedRoute>
              }
            />

            <Route path="/edit/:id" element={<EditCar />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>

          <BackToTop />
          <Footer />
        </BrowserRouter>
      </CarsProvider>
    </AuthProvider>
  );
}
