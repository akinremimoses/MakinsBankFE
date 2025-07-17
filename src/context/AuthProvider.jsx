import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // const login = async ({ email, password }) => {
  //   try {
  //     const res = await fetch('http://localhost:5000/auth/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || 'Login failed');

  //     localStorage.setItem('token', data.token);
  //     localStorage.setItem('user', JSON.stringify(data.user));
  //     setUser(data.user);

  //     return { success: true, user: data.user };
  //   } catch (err) {
  //     console.error(err.message);
  //     return { success: false, message: err.message };
  //   }
  // };

  const register = async (formData) => {
  try {
    const res = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const text = await res.text(); // 🔍 Not JSON? Show raw error
      throw new Error(text || 'Registration failed');
    }

    const data = await res.json(); // ✅ Safe to parse JSON now
    console.log('Registered user:', data);
    return data;
  } catch (error) {
    console.error('Register error:', error.message);
    throw error;
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

