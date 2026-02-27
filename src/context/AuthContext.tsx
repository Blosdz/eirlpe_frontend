import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getToken, clearToken } from '../api/client';
import { getProfile } from '../api/auth';
import type { AuthUser } from '../api/auth';

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const setUser = useCallback((u: AuthUser | null) => {
    setUserState(u);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUserState(null);
    window.location.href = '/';
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    getProfile()
      .then((res) => {
        if (res.success && res.user) setUserState(res.user);
      })
      .catch(() => setUserState(null))
      .finally(() => setLoading(false));
  }, []);

  const value: AuthContextValue = { user, loading, setUser, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
