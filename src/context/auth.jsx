
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });

  // default axios property to send headers to every request
  axios.defaults.headers.common["Authorization"] = auth?.token

  // Load auth data from local storage on mount
  useEffect(() => {
    const loadAuthData = () => {
      const data = localStorage.getItem("auth");
      if (data) {
        const parsedData = JSON.parse(data);
        setAuth({
          user: parsedData.user,
          token: parsedData.token
        });
      } else {
        setAuth({
          user: null,
          token: ""
        });
      }
    };

    loadAuthData(); // Initial load on mount

    // Listen for changes in local storage across different windows or tabs
    const handleStorageChange = (event) => {
      if (event.key === "auth") {
        loadAuthData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Update local storage and auth state simultaneously
  const updateAuth = (newAuth) => {
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
