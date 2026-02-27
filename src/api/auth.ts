import { apiRequest, setToken } from './client';

export interface AuthUserProfile {
  id?: number;
  company_name?: string;
  document?: string;
  phone?: string;
  address?: string;
  ruc_company?: string;
  hostname?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role?: string;
  name?: string;
  profile?: AuthUserProfile;
  userProfile?: {
    hostname_id?: number;
    hostname?: string;
    document?: string;
    phone?: string;
    company_name?: string;
  };
}

export interface LoginResponse {
  success: boolean;
  access_token: string;
  user: AuthUser;
}

export interface RegisterBody {
  email: string;
  password: string;
  name?: string;
  userProfile?: {
    hostname_id?: string;
    document?: string;
    phone?: string;
    company_name?: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  access_token: string;
  user: AuthUser;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await apiRequest<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.access_token) setToken(data.access_token);
  return data;
}

export async function register(body: RegisterBody): Promise<RegisterResponse> {
  const data = await apiRequest<RegisterResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (data.access_token) setToken(data.access_token);
  return data;
}

export interface ProfileResponse {
  success: boolean;
  user: AuthUser | null;
}

export async function getProfile(): Promise<ProfileResponse> {
  return apiRequest<ProfileResponse>('/api/auth/profile', { method: 'GET' });
}

export interface UserHostname {
  id: number;
  hostname: string;
  created_at: string;
  company_name?: string;
  document?: string;
  phone?: string;
}

export async function getMyHostnames(): Promise<UserHostname[]> {
  const data = await apiRequest<UserHostname[] | { hostnames?: UserHostname[] }>('/api/auth/hostnames', { method: 'GET' });
  if (Array.isArray(data)) return data;
  if (data && Array.isArray((data as { hostnames?: UserHostname[] }).hostnames)) return (data as { hostnames: UserHostname[] }).hostnames;
  return [];
}

export interface UpdateProfileBody {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  company_name?: string;
  document?: string;
  phone?: string;
  address?: string;
  ruc_company?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  user: AuthUser;
}

export async function updateProfile(body: UpdateProfileBody): Promise<UpdateProfileResponse> {
  return apiRequest<UpdateProfileResponse>('/api/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}
