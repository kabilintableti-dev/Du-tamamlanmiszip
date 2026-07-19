// ─── API base ────────────────────────────────────────────────────────────────
// The api-server artifact is proxied at /api on the same origin.
const API_BASE = '/api';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string | null;
  author: string;
  reading_time: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export type BlogCategory = 'hazirlik' | 'cizim' | 'basari' | 'haberler';

export interface CreateBlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string | null;
  author: string;
  reading_time: string;
  published: boolean;
  featured?: boolean;
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────
export async function fetchPosts(category?: string): Promise<{ posts: BlogPost[]; total: number }> {
  const url = category
    ? `${API_BASE}/blog/posts?category=${encodeURIComponent(category)}`
    : `${API_BASE}/blog/posts`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPost(slug: string): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/blog/posts/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export async function fetchAllPosts(): Promise<{ posts: BlogPost[] }> {
  const res = await fetch(`${API_BASE}/blog/admin/all`);
  if (!res.ok) throw new Error('Failed to fetch all posts');
  return res.json();
}

export async function createPost(data: CreateBlogPostInput): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/blog/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function updatePost(
  slug: string,
  data: Partial<CreateBlogPostInput>,
): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/blog/posts/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export async function deletePost(slug: string): Promise<void> {
  const res = await fetch(`${API_BASE}/blog/posts/${slug}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete post');
}
