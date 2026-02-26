import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface TenantUserProfile {
    id?: number;
    mail: string;
    role: 'admin' | 'user' | string;
    name?: string;
    status?: string;
}

interface TenantAuthContextType {
    token: string | null;
    user: TenantUserProfile | null;
    tenantHost: string;
    login: (token: string, user: TenantUserProfile) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const TenantAuthContext = createContext<TenantAuthContextType | undefined>(undefined);

const getInitialTenantHost = () => {
    // We need the full host (including port if present) to match the DB
    // but without the protocol (http:// or https://)
    const host = window.location.host;
    
    // Local dev fix: map Vite port (5173) to Backend port (3000)
    if (host.includes(':5173')) {
        return host.replace(':5173', ':3000');
    }
    
    return host;
};

export function TenantAuthProvider({ children }: { children: ReactNode }) {
    const initialHost = getInitialTenantHost();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<TenantUserProfile | null>(null);
    const [tenantHost] = useState<string>(initialHost);

    useEffect(() => {
        // Load from localStorage on first render, using a tenant-specific key base
        const tokenKey = `eirl_tenant_token_${initialHost}`;
        const userKey = `eirl_tenant_user_${initialHost}`;
        
        const storedToken = localStorage.getItem(tokenKey);
        const storedUser = localStorage.getItem(userKey);

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Error parsing stored tenant user", e);
                localStorage.removeItem(userKey);
            }
        }
    }, []);

    const login = (newToken: string, newUser: TenantUserProfile) => {
        setToken(newToken);
        setUser(newUser);
        const tokenKey = `eirl_tenant_token_${tenantHost}`;
        const userKey = `eirl_tenant_user_${tenantHost}`;
        localStorage.setItem(tokenKey, newToken);
        localStorage.setItem(userKey, JSON.stringify(newUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        const tokenKey = `eirl_tenant_token_${tenantHost}`;
        const userKey = `eirl_tenant_user_${tenantHost}`;
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(userKey);
    };

    return (
        <TenantAuthContext.Provider value={{
            token,
            user,
            tenantHost,
            login,
            logout,
            isAuthenticated: !!token,
        }}>
            {children}
        </TenantAuthContext.Provider>
    );
}

export function useTenantAuth() {
    const context = useContext(TenantAuthContext);
    if (context === undefined) {
        throw new Error('useTenantAuth must be used within a TenantAuthProvider');
    }
    return context;
}
