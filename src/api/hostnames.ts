import { apiRequest } from './client';

export interface HostnameRecord {
  id: number;
  hostname: string;
  createdAt: string;
}

/**
 * Registra un hostname para el usuario autenticado.
 * Crea automáticamente la base de datos del tenant y, si se
 * provee templateId, inicializa el TenantConfig con ese template.
 */
export async function createHostname(
  hostname: string,
  templateId?: string,
): Promise<HostnameRecord> {
  return apiRequest<HostnameRecord>('/api/hostnames', {
    method: 'POST',
    body: JSON.stringify({ hostname, templateId }),
  });
}

export async function checkHostname(
  hostname: string,
): Promise<{ available: boolean; hostname: string }> {
  return apiRequest<{ available: boolean; hostname: string }>(
    `/api/hostnames/check/${encodeURIComponent(hostname)}`,
    { method: 'GET' },
  );
}

export async function getMyHostnames(): Promise<HostnameRecord[]> {
  return apiRequest<HostnameRecord[]>('/api/auth/hostnames/me', {
    method: 'GET',
  });
}
