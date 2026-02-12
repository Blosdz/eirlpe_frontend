/**
 * Configuracion de la app.
 *
 * GOOGLE_CLIENT_ID:
 *   1. Ve a https://console.cloud.google.com/
 *   2. Crea un proyecto o selecciona uno existente
 *   3. Ve a APIs & Services > Credentials
 *   4. Crea un OAuth 2.0 Client ID (tipo "Web application")
 *   5. En "Authorized JavaScript origins" agrega http://localhost:5173
 *   6. Copia el Client ID aqui abajo
 */
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
