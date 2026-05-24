import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import {
  ADMIN_EMAIL,
  ADMIN_NAME,
  ADMIN_PASSWORD,
  isAdminEmail,
  normalizeEmail,
} from "../config/admin";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || "User",
          isAdmin: isAdminEmail(currentUser.email),
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const normalizedEmail = normalizeEmail(email);

    if (normalizedEmail !== ADMIN_EMAIL) {
      throw new Error("Only the admin can log in.");
    }

    try {
      await signInWithEmailAndPassword(auth, normalizedEmail, password);
    } catch (error) {
      const shouldCreateAdmin =
        password === ADMIN_PASSWORD &&
        ["auth/user-not-found", "auth/invalid-credential"].includes(
          error.code,
        );

      if (!shouldCreateAdmin) {
        throw error;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        ADMIN_EMAIL,
        ADMIN_PASSWORD,
      );

      await updateProfile(userCredential.user, {
        displayName: ADMIN_NAME,
      });

      setUser({
        uid: userCredential.user.uid,
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        isAdmin: true,
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
