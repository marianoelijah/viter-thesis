// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login function to set the user data in context
  const login = (userData) => {
    // Normalize id field so it’s easier to access
    setUser({
      ...userData,
      id: userData.userId || userData.id, 
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier context usage
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
