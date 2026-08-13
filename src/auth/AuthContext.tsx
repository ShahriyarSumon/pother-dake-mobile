import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStoredAuth, logout as apiLogout } from '../api';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { token, user: storedUser } = await getStoredAuth();
        if (!mounted) return;
        setUser(storedUser || null);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setTokenLoaded(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const setAuthUser = (u: any) => setUser(u);

  return (
    <AuthContext.Provider value={{ user, setAuthUser, logout, tokenLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
