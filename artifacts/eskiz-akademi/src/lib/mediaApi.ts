// ─── API base ────────────────────────────────────────────────────────────────
const API_BASE = '/api';

export type MediaCategory = 'atolye' | 'ogrenci-calismalari' | 'etkinlik' | 'egitmen';

export interface MediaItem {
  id: number;
  category: MediaCategory;
  image_data: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

function adminHeaders(): HeadersInit {
  const password = sessionStorage.getItem('eskiz_admin_password') ?? '';
  return { 'Content-Type': 'application/json', 'x-admin-password': password };
}

export async function fetchMedia(category?: MediaCategory): Promise<MediaItem[]> {
  const url = category
    ? `${API_BASE}/media?category=${encodeURIComponent(category)}`
    : `${API_BASE}/media`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Görseller yüklenemedi');
  const data = await res.json();
  return data.items;
}

export async function uploadMedia(input: {
  category: MediaCategory;
  image_data: string;
  caption?: string;
}): Promise<MediaItem> {
  const res = await fetch(`${API_BASE}/media`, {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? 'Yükleme başarısız');
  }
  return res.json();
}

export async function deleteMedia(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/media/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? 'Silme başarısız');
  }
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  return res.ok;
}
