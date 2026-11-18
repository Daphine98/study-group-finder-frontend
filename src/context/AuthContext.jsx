// Keeps the logged-in user in one place so every page can read it with useAuth().
import { createContext, useContext, useEffect, useState } from "react";
import { api, tokenStorage } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // On first load, if a token is saved, ask the server who we are
  useEffect(() => {
    async function restoreSession() {
      if (!tokenStorage.get()) return setCheckingSession(false);
      try {
        const data = await api.get("/auth/me");
        setUser(data.user);
      } catch {
        tokenStorage.clear();
      } finally {
        setCheckingSession(false);
      }
    }
    restoreSession();
  }, []);

  async function login(email, password) {
    const data = await api.post("/auth/login", { email, password });
    tokenStorage.save(data.token);
    setUser(data.user);
    return data.user;
  }

  async function register(formValues) {
    const data = await api.post("/auth/register", formValues);
    tokenStorage.save(data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    tokenStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, checkingSession, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
