const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function getApiUrl(): string {
  return API_URL.replace(/\/$/, '');
}

export function getToken(): string | null {
  return localStorage.getItem('eirlpe_token');
}

export function setToken(token: string): void {
  localStorage.setItem('eirlpe_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('eirlpe_token');
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {}
): Promise<T> {
  const { token = getToken(), ...fetchOptions } = options;
  const url = `${getApiUrl()}${path.startsWith('/') ? path : `/${path}`}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...fetchOptions, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data.message ||
      (Array.isArray(data.message) ? data.message[0] : null) ||
      data.error ||
      `Error ${res.status}`;
    throw { message, statusCode: res.status, error: data.error } as ApiError;
  }
  return data as T;
}
