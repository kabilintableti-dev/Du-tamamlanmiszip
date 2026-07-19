import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/blogApi';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowRight, Calendar, Clock, User, PenTool, ImageIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'hazirlik', label: 'Güzel Sanatlar Hazırlık' },
  { id: 'cizim', label: 'Çizim Teknikleri' },
  { id: 'basari', label: 'Öğrenci Başarıları' },
  { id: 'haberler', label: 'Akademi Haberleri' }
];

const categoryLabels: Record<string, string> = {
  'hazirlik': 'Güzel Sanatlar Hazırlık',
  'cizim': 'Çizim Teknikleri',
  'basari': 'Öğrenci Başarıları',
  'haberler': 'Akademi Haberleri'
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['blog-posts', activeCategory],
    queryFn: () => fetchPosts(activeCategory === 'all' ? undefined : activeCategory),
  });

  const posts = data?.posts?.filter(p => p.published) || [];

  return (
    <div className="min-h-screen bg-eskiz-dark text-eskiz-light flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          
          <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight"
            >
              Akademi <span className="text-eskiz-gold italic">Günlükleri</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-eskiz-light/60 font-light leading-relaxed"
            >
              Güzel Sanatlar dünyasından ipuçları, başarı hikayeleri ve akademi haberleri
            </motion.p>
          </header>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-manrope text-sm tracking-wider uppercase font-semibold transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-eskiz-gold text-eskiz-dark shadow-[0_0_15px_rgba(199,163,93,0.3)]' 
                    : 'bg-[#151515] text-eskiz-light/60 hover:text-eskiz-light border border-white/5 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-eskiz-gold" />
            </div>
          )}

          {error && (
            <div className="text-center py-24 bg-[#151515] rounded-3xl border border-white/5">
              <p className="text-eskiz-light/50">İçerikler yüklenirken bir sorun oluştu.</p>
            </div>
          )}

          {!isLoading && !error && posts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-[#151515] rounded-3xl border border-white/5 flex flex-col items-center justify-center"
            >
              <PenTool className="w-12 h-12 text-white/10 mb-6" />
              <h3 className="font-serif text-2xl text-white mb-2">Henüz yazı bulunmuyor</h3>
              <p className="text-eskiz-light/50 font-light">Bu kategoride yakında yeni içerikler paylaşılacak.</p>
            </motion.div>
          )}

          {!isLoading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {posts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-[#151515] rounded-3xl overflow-hidden border border-white/5 hover:border-eskiz-gold/30 transition-all hover:-translate-y-1">
                      <div className="aspect-[4/3] bg-[#1a1a1a] relative overflow-hidden">
                        {post.cover_image ? (
                          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-black opacity-80 group-hover:opacity-100 transition-opacity">
                            <ImageIcon className="w-8 h-8 text-white/10 mb-3" />
                            <span className="font-serif italic text-white/10 text-2xl">Eskiz</span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-black/60 text-eskiz-gold text-[10px] font-manrope tracking-wider border border-white/10 uppercase font-semibold backdrop-blur-md">
                            {categoryLabels[post.category] || post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-[11px] text-eskiz-light/40 font-manrope tracking-wider mb-4 uppercase">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {format(new Date(post.created_at), 'd MMM yyyy', { locale: tr })}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10"></span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.reading_time}</span>
                        </div>
                        
                        <h3 className="font-serif text-2xl leading-snug text-white mb-4 group-hover:text-eskiz-gold transition-colors">{post.title}</h3>
                        <p className="text-eskiz-light/60 text-sm leading-relaxed mb-8 line-clamp-3 flex-1">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
                          <span className="text-xs font-manrope text-white/50">{post.author}</span>
                          <span className="text-xs font-manrope font-semibold text-eskiz-gold flex items-center gap-2 group-hover:gap-3 transition-all">Oku <ArrowRight className="w-3.5 h-3.5" /></span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </main>

      <a
        href="https://wa.me/905074736314"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-eskiz-gold text-eskiz-dark px-6 py-4 rounded-full font-manrope text-sm font-bold tracking-wide hover:scale-105 shadow-[0_0_20px_rgba(199,163,93,0.3)] transition-all flex items-center gap-2"
      >
        Hemen Başvur
      </a>

      <Footer />
    </div>
  );
}