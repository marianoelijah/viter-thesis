import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage on login
  const login = (userData) => {
    const normalizedUser = {
      ...userData,
      id: userData.userId || userData.id,
    };
    setUser(normalizedUser);
    localStorage.setItem('user', JSON.stringify(normalizedUser)); // ✅ persist
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // ✅ clear on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
