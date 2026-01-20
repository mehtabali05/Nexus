import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '../types';
// import { users } from '../data/users';
import { AuthService } from '../services/auth.service';

import toast from 'react-hot-toast';

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage keys
// const USER_STORAGE_KEY = 'business_nexus_user';
// const RESET_TOKEN_KEY = 'business_nexus_reset_token';

const TOKEN_KEY = 'accessToken';

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on initial load
  // useEffect(() => {
  //   const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  //   setIsLoading(false);
  // }, []);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setIsLoading(false);
        return;
      }
  
      try {
        const userData = await AuthService.getMe();
        setUser(userData);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    initAuth();
  }, []);
  

  // Mock login function - in a real app, this would make an API call
  // const login = async (email: string, password: string, role: UserRole): Promise<void> => {
  //   setIsLoading(true);
    
  //   try {
  //     // Simulate API call delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // Find user with matching email and role
  //     const foundUser = users.find(u => u.email === email && u.role === role);
      
  //     if (foundUser) {
  //       setUser(foundUser);
  //       localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(foundUser));
  //       toast.success('Successfully logged in!');
  //     } else {
  //       throw new Error('Invalid credentials or user not found');
  //     }
  //   } catch (error) {
  //     toast.error((error as Error).message);
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      const data = await AuthService.login({ email, password });
  
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
  
      toast.success('Successfully logged in');
      return data.user;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  

  // Mock register function - in a real app, this would make an API call
  // const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
  //   setIsLoading(true);
    
  //   try {
  //     // Simulate API call delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // Check if email already exists
  //     if (users.some(u => u.email === email)) {
  //       throw new Error('Email already in use');
  //     }
      
  //     // Create new user
  //     const newUser: User = {
  //       id: `${role[0]}${users.length + 1}`,
  //       name,
  //       email,
  //       role,
  //       avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
  //       bio: '',
  //       isOnline: true,
  //       createdAt: new Date().toISOString()
  //     };
      
  //     // Add user to mock data
  //     users.push(newUser);
      
  //     setUser(newUser);
  //     localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
  //     toast.success('Account created successfully!');
  //   } catch (error) {
  //     toast.error((error as Error).message);
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<User> => {
    setIsLoading(true);
    try {
      const data = await AuthService.register({ name, email, password, role });
  
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
  
      toast.success('Account created successfully');
      return data.user;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  

  // Mock forgot password function
  // const forgotPassword = async (email: string): Promise<void> => {
  //   try {
  //     // Simulate API call delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // Check if user exists
  //     const user = users.find(u => u.email === email);
  //     if (!user) {
  //       throw new Error('No account found with this email');
  //     }
      
  //     // Generate reset token (in a real app, this would be a secure token)
  //     const resetToken = Math.random().toString(36).substring(2, 15);
  //     localStorage.setItem(RESET_TOKEN_KEY, resetToken);
      
  //     // In a real app, this would send an email
  //     toast.success('Password reset instructions sent to your email');
  //   } catch (error) {
  //     toast.error((error as Error).message);
  //     throw error;
  //   }
  // };

  // Mock reset password function
  // const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  //   try {
  //     // Simulate API call delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // Verify token
  //     const storedToken = localStorage.getItem(RESET_TOKEN_KEY);
  //     if (token !== storedToken) {
  //       throw new Error('Invalid or expired reset token');
  //     }
      
  //     // In a real app, this would update the user's password in the database
  //     localStorage.removeItem(RESET_TOKEN_KEY);
  //     toast.success('Password reset successfully');
  //   } catch (error) {
  //     toast.error((error as Error).message);
  //     throw error;
  //   }
  // };

  // Logout function
  // const logout = (): void => {
  //   setUser(null);
  //   localStorage.removeItem(USER_STORAGE_KEY);
  //   toast.success('Logged out successfully');
  // };

  const logout = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    toast.success('Logged out');
  };

  const updateProfile = async (updates: Partial<User>) => {
    setIsLoading(true);
    try {
      const updatedUser = await AuthService.updateMe(updates);
      setUser(updatedUser);
      toast.success('Profile updated');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  

  // Update user profile
  // const updateProfile = async (userId: string, updates: Partial<User>): Promise<void> => {
  //   try {
  //     // Simulate API call delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // Update user in mock data
  //     const userIndex = users.findIndex(u => u.id === userId);
  //     if (userIndex === -1) {
  //       throw new Error('User not found');
  //     }
      
  //     const updatedUser = { ...users[userIndex], ...updates };
  //     users[userIndex] = updatedUser;
      
  //     // Update current user if it's the same user
  //     if (user?.id === userId) {
  //       setUser(updatedUser);
  //       localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
  //     }
      
  //     toast.success('Profile updated successfully');
  //   } catch (error) {
  //     toast.error((error as Error).message);
  //     throw error;
  //   }
  // };

  const value = {
    user,
    login,
    register,
    logout,
    // forgotPassword,
    // resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};