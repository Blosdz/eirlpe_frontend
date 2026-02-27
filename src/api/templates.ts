export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  category: string;
}

/** Lee el catálogo de templates desde los archivos estáticos del frontend */
export async function getTemplates(): Promise<TemplateMeta[]> {
  const res = await fetch('/templates/catalog.json');
  if (!res.ok) return [];
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data as TemplateMeta[];
}

/** URL del preview HTML de un template (archivo estático en /public/templates/) */
export function getPreviewUrl(templateId: string): string {
  return `/templates/${encodeURIComponent(templateId)}/preview.html`;
}
