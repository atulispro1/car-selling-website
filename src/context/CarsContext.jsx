import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { isAdminEmail } from "../config/admin";

const CarsContext = createContext();
const LOCAL_CARS_KEY = "yusra-local-products";

function readLocalCars() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CARS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeLocalCars(cars) {
  localStorage.setItem(LOCAL_CARS_KEY, JSON.stringify(cars));
}

function isPermissionError(error) {
  return (
    error?.code === "permission-denied" ||
    error?.message?.toLowerCase().includes("insufficient permissions")
  );
}

export function CarsProvider({ children }) {
  const [cloudCars, setCloudCars] = useState([]);
  const [localCars, setLocalCars] = useState(() => readLocalCars());
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

  const saveLocalCars = (updater) => {
    setLocalCars((currentCars) => {
      const nextCars =
        typeof updater === "function" ? updater(currentCars) : updater;
      writeLocalCars(nextCars);
      return nextCars;
    });
  };

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

      const localCar = {
        ...car,
        id: `local-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      saveLocalCars((currentCars) => [...currentCars, localCar]);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteCar = async (id) => {
    if (!isAdminEmail(auth.currentUser?.email)) {
      throw new Error("Only the admin can delete products.");
    }

    if (id.startsWith("local-")) {
      saveLocalCars((currentCars) => currentCars.filter((car) => car.id !== id));
      return;
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

    if (updatedCar.id.startsWith("local-")) {
      saveLocalCars((currentCars) =>
        currentCars.map((car) => (car.id === updatedCar.id ? updatedCar : car)),
      );
      return;
    }

    const ref = doc(db, "cars", updatedCar.id);
    await updateDoc(ref, updatedCar);
  };

  /* ================= COMMENTS ================= */
  const addComment = async (carId, user, text) => {
    const ref = collection(db, "cars", carId, "comments");

    await addDoc(ref, {
      userId: user.uid,
      userName: user.name,
      text,
      createdAt: serverTimestamp(),
    });
  };

  const deleteComment = async (carId, commentId) => {
    await deleteDoc(doc(db, "cars", carId, "comments", commentId));
  };

  const listenComments = (carId, callback) => {
    return onSnapshot(
      collection(db, "cars", carId, "comments"),
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
  const setRating = async (carId, user, value) => {
    const ref = doc(db, "cars", carId, "ratings", user.uid);

    await setDoc(ref, {
      value,
      userName: user.name,
      updatedAt: serverTimestamp(),
    });
  };

  const listenRatings = (carId, callback) => {
    return onSnapshot(
      collection(db, "cars", carId, "ratings"),
      (snapshot) => {
        const ratings = snapshot.docs.map((d) => d.data());
        callback(ratings);
      }
    );
  };

  /* ================= MERGE CLOUD + LOCAL ================= */
  const cars = [
    ...cloudCars,
    ...localCars.map((car) => ({ ...car, isLocal: true })),
  ];

  return (
    <CarsContext.Provider
      value={{
        cars,
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
