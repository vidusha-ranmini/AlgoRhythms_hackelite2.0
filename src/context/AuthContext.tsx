'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import mockUsers from '@/data/users.json';

export type UserRole = 'public' | 'parent' | 'child';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences: {
    language: string;
    notifications: boolean;
  };
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{success: boolean, role?: UserRole}>;
  logout: () => void;
  setRole: (role: UserRole) => void; // For development/testing
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('readleUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user data', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      // Store user without password
      const userToStore = { ...user };
      delete (userToStore as Record<string, unknown>).password;
      localStorage.setItem('readleUser', JSON.stringify(userToStore));
    } else {
      localStorage.removeItem('readleUser');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      // Simple validation
      if (!email || !password) {
        return { success: false };
      }

      // Find user with matching email and password
      const matchedUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!matchedUser) {
        console.log('Invalid credentials');
        return { success: false };
      }

      // Create a user object without the password
      const authenticatedUser: User = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role as UserRole,
        preferences: matchedUser.preferences,
        ...(matchedUser.isAdmin && { isAdmin: true }),
      };

      setUser(authenticatedUser);
      return { success: true, role: authenticatedUser.role };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('readleUser');
  };

  // For development/testing - change user role
  const setRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    } else {
      // Create a default user with the specified role if none exists
      setUser({
        id: 'dev-user',
        name: 'Test User',
        email: 'test@readle.com',
        role,
        preferences: {
          language: 'en',
          notifications: true,
        },
      });
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    setRole,
  };

  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}