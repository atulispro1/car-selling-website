import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { demoCars } from "../data/demoCars";

const CarsContext = createContext();

export function CarsProvider({ children }) {
  const [cloudCars, setCloudCars] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CARS ================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cars"), (snapshot) => {
      const carsData = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setCloudCars(carsData);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  /* ================= ADD CAR ================= */
  const addCar = async (car) => {
    await addDoc(collection(db, "cars"), {
      ...car,
      createdAt: serverTimestamp(),
    });
  };

  /* ================= DELETE CAR ================= */
  const deleteCar = async (id) => {
    await deleteDoc(doc(db, "cars", id));
  };

  /* ================= UPDATE CAR ================= */
  const updateCar = async (updatedCar) => {
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

  /* ================= MERGE DEMO + CLOUD ================= */
  const cars = [...demoCars, ...cloudCars];

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
