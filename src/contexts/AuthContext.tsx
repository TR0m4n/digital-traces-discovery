
import React, { createContext, useContext, useState, useEffect } from 'react';

export type AuthProvider = 'github' | 'switchedu';

export interface User {
  id: string;
  username: string;
  email: string;
  oauth_id: string;
  oauth_provider: AuthProvider;
  avatar_url: string;
  role: 'user' | 'admin';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (provider: AuthProvider) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication for demo purposes
// In a real app, this would interact with your backend
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage (for persistence)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (provider: AuthProvider) => {
    setIsLoading(true);
    
    // In a real implementation, this would redirect to the OAuth provider
    // For now, we'll simulate a successful login after a short delay
    
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        username: provider === 'github' ? 'github_user' : 'switchedu_user',
        email: `user@${provider}.com`,
        oauth_id: '12345',
        oauth_provider: provider,
        avatar_url: provider === 'github' 
          ? 'https://avatars.githubusercontent.com/u/9919?s=200&v=4' 
          : 'https://www.switch.ch/export/system/modules/ch.switch.public/resources/images/logo.png',
        role: 'user',
        created_at: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
