import { useEffect, useCallback, useRef } from 'react';
import { GOOGLE_CLIENT_ID } from '../config';

interface GoogleCredentialResponse {
    credential: string; // JWT token
    select_by: string;
}

interface GoogleUser {
    email: string;
    name: string;
    picture: string;
    sub: string; // Google user ID
}

/** Decodifica el JWT de Google (sin verificar firma, solo para leer datos en el cliente) */
function decodeJwt(token: string): GoogleUser {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
}

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: Record<string, unknown>) => void;
                    prompt: () => void;
                    renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
                };
            };
        };
    }
}

export function useGoogleSignIn(onSuccess: (user: GoogleUser, credential: string) => void) {
    const callbackRef = useRef(onSuccess);
    callbackRef.current = onSuccess;

    const initialized = useRef(false);

    useEffect(() => {
        if (!GOOGLE_CLIENT_ID) return;
        if (initialized.current) return;

        const tryInit = () => {
            if (!window.google?.accounts?.id) return false;

            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: (response: GoogleCredentialResponse) => {
                    const user = decodeJwt(response.credential);
                    callbackRef.current(user, response.credential);
                },
                auto_select: false,
                cancel_on_tap_outside: true,
            });

            initialized.current = true;
            return true;
        };

        // Si ya cargo el script
        if (tryInit()) return;

        // Si no, esperar a que cargue
        const interval = setInterval(() => {
            if (tryInit()) clearInterval(interval);
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const signIn = useCallback(() => {
        if (!GOOGLE_CLIENT_ID) {
            console.warn(
                'Google Client ID no configurado. Crea un archivo .env con VITE_GOOGLE_CLIENT_ID=tu-client-id'
            );
            alert('Google Sign-In no esta configurado todavia. Configura VITE_GOOGLE_CLIENT_ID en tu archivo .env');
            return;
        }
        if (window.google?.accounts?.id) {
            window.google.accounts.id.prompt();
        }
    }, []);

    return { signIn, isConfigured: !!GOOGLE_CLIENT_ID };
}
