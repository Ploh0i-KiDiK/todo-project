import React, { useEffect, useState } from 'react';
import { UserContext } from './userContext';

export function UserProvider({ children }) {
  const [user, setUserState] = useState(() => {
    try {
      const stored = localStorage.getItem('user_profile');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load user profile from localStorage', error);
    }

    return {
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      avatar: null
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('user_profile', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user profile to localStorage', error);
    }
  }, [user]);

  const updateUser = (updates) => {
    setUserState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
