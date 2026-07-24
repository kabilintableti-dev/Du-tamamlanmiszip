import { useQuery } from '@tanstack/react-query';

const API_BASE = '/api';

function adminHeaders(): HeadersInit {
  const password = sessionStorage.getItem('eskiz_admin_password') ?? '';
  return { 'Content-Type': 'application/json', 'x-admin-password': password };
}

export async function fetchTexts(): Promise<Record<string, string>> {
  const res = await fetch(`${API_BASE}/texts`);
  if (!res.ok) throw new Error('Metinler yüklenemedi');
  const data = await res.json();
  return data.texts;
}

export async function updateText(key: string, value: string): Promise<void> {
  const res = await fetch(`${API_BASE}/texts/${encodeURIComponent(key)}`, {
    method: 'PUT',
    headers: adminHeaders(),
    body: JSON.stringify({ value }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? 'Güncelleme başarısız');
  }
}

// Panelde düzenlenebilir metinler ve varsayılan (kod içindeki) değerleri.
export const SITE_TEXT_FIELDS = [
  { key: 'hero_eyebrow', label: 'Hero — Üst küçük yazı', default: 'Güzel Sanatlar Fakültesi Hazırlık' },
  { key: 'hero_heading', label: 'Hero — Ana başlık', default: 'Sanatın Geleceğini Tasarla' },
  { key: 'hero_subtext_1', label: 'Hero — Alt yazı (1. satır)', default: "İstanbul'un en seçkin güzel sanatlar hazırlık akademisinde" },
  { key: 'hero_subtext_2', label: 'Hero — Alt yazı (2. satır)', default: 'yeteneğini keşfet, geleceğini inşa et.' },
] as const;

// Sitede bir bileşenin içinde bir metni göstermek için kullanılır.
// Panelden bir değer girilmemişse, koddaki varsayılan (fallback) gösterilir.
export function useSiteText(key: string, fallback: string): string {
  const { data } = useQuery({
    queryKey: ['site-texts'],
    queryFn: fetchTexts,
    staleTime: 60_000,
  });
  return data?.[key] || fallback;
}
