import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { isAdminEmail } from "../config/admin";

const CarsContext = createContext();

function isPermissionError(error) {
  return (
    error?.code === "permission-denied" ||
    error?.message?.toLowerCase().includes("insufficient permissions")
  );
}

export function CarsProvider({ children }) {
  const [cloudCars, setCloudCars] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "cars"),
      (snapshot) => {
        const carsData = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setCloudCars(carsData);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );

    return () => unsub();
  }, []);

  /* ================= ADD PRODUCT ================= */
  const addCar = async (car) => {
    if (!isAdminEmail(auth.currentUser?.email)) {
      throw new Error("Only the admin can add products.");
    }

    try {
      await addDoc(collection(db, "cars"), {
        ...car,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      if (!isPermissionError(error)) {
        throw error;
      }

      throw new Error(
        "Firebase blocked this product save. Update Firestore rules to allow the admin account to create products.",
      );
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteCar = async (id) => {
    if (!isAdminEmail(auth.currentUser?.email)) {
      throw new Error("Only the admin can delete products.");
    }

    try {
      await deleteDoc(doc(db, "cars", id));
    } catch (error) {
      if (!isPermissionError(error)) {
        throw error;
      }

      throw new Error(
        "Firebase blocked this delete. Update Firestore rules to allow the admin account to delete products.",
      );
    }
  };

  /* ================= UPDATE PRODUCT ================= */
  const updateCar = async (updatedCar) => {
    if (!isAdminEmail(auth.currentUser?.email)) {
      throw new Error("Only the admin can update products.");
    }

    const ref = doc(db, "cars", updatedCar.id);
    await updateDoc(ref, updatedCar);
  };

  /* ================= COMMENTS ================= */
  const addComment = async (carId, name, text) => {
    const ref = collection(db, "cars", carId, "comments");

    await addDoc(ref, {
      name: name.trim() || "Guest",
      text,
      createdAt: serverTimestamp(),
    });
  };

  const deleteComment = async (carId, commentId) => {
    await deleteDoc(doc(db, "cars", carId, "comments", commentId));
  };

  const listenComments = (carId, callback) => {
    return onSnapshot(
      query(collection(db, "cars", carId, "comments"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const comments = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        callback(comments);
      }
    );
  };

  /* ================= RATINGS ================= */
  const setRating = async (carId, voterId, value) => {
    const ref = doc(db, "cars", carId, "ratings", voterId);

    await setDoc(ref, {
      value,
      updatedAt: serverTimestamp(),
    });
  };

  const listenRatings = (carId, callback) => {
    return onSnapshot(
      collection(db, "cars", carId, "ratings"),
      (snapshot) => {
        const ratings = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        callback(ratings);
      }
    );
  };

  return (
    <CarsContext.Provider
      value={{
        cars: cloudCars,
        loading,
        addCar,
        deleteCar,
        updateCar,
        addComment,
        deleteComment,
        listenComments,
        setRating,
        listenRatings,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  return useContext(CarsContext);
}
