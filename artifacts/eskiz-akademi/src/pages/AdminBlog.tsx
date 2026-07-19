import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllPosts, createPost, updatePost, deletePost, CreateBlogPostInput } from '@/lib/blogApi';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, X, Eye, EyeOff, Loader2, Search, ArrowLeft, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const CATEGORIES = [
  { id: 'hazirlik', label: 'Güzel Sanatlar Hazırlık' },
  { id: 'cizim', label: 'Çizim Teknikleri' },
  { id: 'basari', label: 'Öğrenci Başarıları' },
  { id: 'haberler', label: 'Akademi Haberleri' }
];

function generateSlug(title: string) {
  let slug = title.toLowerCase();
  const charMap: Record<string, string> = {
    'ş': 's', 'ğ': 'g', 'ü': 'u', 'ö': 'o', 'ı': 'i', 'ç': 'c',
    'Ş': 's', 'Ğ': 'g', 'Ü': 'u', 'Ö': 'o', 'İ': 'i', 'Ç': 'c'
  };
  slug = slug.replace(/[şğüöıçŞĞÜÖİÇ]/g, match => charMap[match] || match);
  slug = slug.replace(/[^a-z0-9\s-]/g, '');
  slug = slug.replace(/\s+/g, '-');
  return slug;
}

export default function AdminBlog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostSlug, setEditingPostSlug] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: fetchAllPosts,
  });

  const posts = data?.posts || [];
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateBlogPostInput>({
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'hazirlik',
      cover_image: '',
      author: 'Eskiz Akademi',
      reading_time: '5 dk',
      published: true
    }
  });

  const titleValue = watch('title');
  
  useEffect(() => {
    if (!editingPostSlug && titleValue) {
      setValue('slug', generateSlug(titleValue), { shouldValidate: true });
    }
  }, [titleValue, editingPostSlug, setValue]);

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: "Başarılı", description: "Yazı başarıyla oluşturuldu." });
      setIsEditorOpen(false);
      reset();
    },
    onError: (err) => {
      toast({ title: "Hata", description: "Yazı oluşturulamadı.", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug, data }: { slug: string, data: Partial<CreateBlogPostInput> }) => updatePost(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: "Başarılı", description: "Yazı başarıyla güncellendi." });
      setIsEditorOpen(false);
      setEditingPostSlug(null);
      reset();
    },
    onError: (err) => {
      toast({ title: "Hata", description: "Yazı güncellenemedi.", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: "Başarılı", description: "Yazı silindi." });
    },
    onError: (err) => {
      toast({ title: "Hata", description: "Yazı silinemedi.", variant: "destructive" });
    }
  });

  const onSubmit = (formData: CreateBlogPostInput) => {
    if (editingPostSlug) {
      updateMutation.mutate({ slug: editingPostSlug, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (post: any) => {
    setEditingPostSlug(post.slug);
    reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      cover_image: post.cover_image || '',
      author: post.author,
      reading_time: post.reading_time,
      published: post.published
    });
    setIsEditorOpen(true);
  };

  const handleDelete = (slug: string) => {
    if (window.confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      deleteMutation.mutate(slug);
    }
  };

  const openNewEditor = () => {
    setEditingPostSlug(null);
    reset({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'hazirlik',
      cover_image: '',
      author: 'Eskiz Akademi',
      reading_time: '5 dk',
      published: false
    });
    setIsEditorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-eskiz-light font-sans flex flex-col">
      <header className="bg-[#111] border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-eskiz-light/50 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-2xl text-eskiz-gold italic">Blog Yönetimi</h1>
        </div>
        <button
          onClick={openNewEditor}
          className="bg-eskiz-gold text-eskiz-dark px-4 py-2 rounded-md font-manrope text-sm font-bold flex items-center gap-2 hover:bg-eskiz-gold/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Yeni Yazı
        </button>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Yazı ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-eskiz-gold text-white"
            />
          </div>
          <button 
            onClick={() => refetch()} 
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> Yenile
          </button>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#1a1a1a] text-white/50 font-manrope uppercase text-xs tracking-wider border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Başlık</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Tarih</th>
                  <th className="px-6 py-4">Durum</th>
                  <th className="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Yükleniyor...
                    </td>
                  </tr>
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                      Yazı bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map(post => (
                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-serif text-base text-white">{post.title}</div>
                        <div className="text-xs text-white/40 font-mono mt-1">/{post.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/70">
                          {CATEGORIES.find(c => c.id === post.category)?.label || post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/60">
                        {format(new Date(post.created_at), 'dd.MM.yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        {post.published ? (
                          <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium"><Eye className="w-3.5 h-3.5" /> Yayında</span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-amber-400 text-xs font-medium"><EyeOff className="w-3.5 h-3.5" /> Taslak</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/blog/${post.slug}`} target="_blank" className="p-1.5 text-white/40 hover:text-white transition-colors rounded-md hover:bg-white/10" title="Görüntüle">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleEdit(post)} className="p-1.5 text-blue-400 hover:text-blue-300 transition-colors rounded-md hover:bg-blue-400/10" title="Düzenle">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(post.slug)} className="p-1.5 text-red-400 hover:text-red-300 transition-colors rounded-md hover:bg-red-400/10" title="Sil">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Slide-in Editor */}
      <AnimatePresence>
        {isEditorOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditorOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-[#111] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#151515]">
                <h2 className="font-serif text-xl text-white">{editingPostSlug ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}</h2>
                <button onClick={() => setIsEditorOpen(false)} className="text-white/50 hover:text-white p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
                <form id="blog-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-manrope text-white/50 uppercase tracking-wider">Başlık</label>
                    <input 
                      {...register('title', { required: true })}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-eskiz-gold transition-colors"
                      placeholder="Örn: Güzel Sanatlara Hazırlık Rehberi"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-manrope text-white/50 uppercase tracking-wider flex justify-between">
                      <span>Slug</span>
                      <span className="text-white/30 lowercase font-mono">/blog/{watch('slug')}</span>
                    </label>
                    <input 
                      {...register('slug', { required: true })}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-eskiz-gold transition-colors font-mono text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-manrope text-white/50 uppercase tracking-wider">Kategori</label>
                      <select 
                        {...register('category')}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-eskiz-gold transition-colors"
                      >
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-manrope text-white/50 uppercase tracking-wider">Okuma Süresi</label>
                      <input 
                        {...register('reading_time')}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-eskiz-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-manrope text-white/50 uppercase tracking-wider">Yazar</label>
                      <input 
                        {...register('author')}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-eskiz-gold transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-manrope text-white/50 uppercase tracking-wider">Kapak Görseli URL</label>
                      <input 
                        {...register('cover_image')}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-eskiz-gold transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-manrope text-white/50 uppercase tracking-wider">Özet (Liste Görünümü)</label>
                    <textarea 
                      {...register('excerpt', { required: true })}
                      rows={3}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-eskiz-gold transition-colors resize-none"
                      placeholder="Yazının kısa özeti (max 2-3 satır)"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-manrope text-white/50 uppercase tracking-wider flex justify-between">
                      İçerik
                      <span className="text-white/30 lowercase">Markdown (## başlık, * liste destekli)</span>
                    </label>
                    <textarea 
                      {...register('content', { required: true })}
                      rows={12}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded p-3 text-white focus:outline-none focus:border-eskiz-gold transition-colors font-mono text-sm leading-relaxed"
                      placeholder="Yazı içeriği..."
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-[#0a0a0a] p-4 rounded border border-white/10">
                    <input 
                      type="checkbox" 
                      id="published" 
                      {...register('published')}
                      className="w-4 h-4 accent-eskiz-gold"
                    />
                    <label htmlFor="published" className="text-sm text-white select-none cursor-pointer flex-1">
                      Yayına Al
                    </label>
                  </div>

                </form>
              </div>

              <div className="p-6 border-t border-white/10 bg-[#151515] flex justify-end gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsEditorOpen(false)}
                  className="px-6 py-2 rounded font-manrope text-sm text-white/60 hover:text-white transition-colors"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  form="blog-form"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-eskiz-gold text-eskiz-dark px-8 py-2 rounded font-manrope text-sm font-bold flex items-center gap-2 hover:bg-eskiz-gold/90 transition-colors disabled:opacity-50"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Kaydet
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}