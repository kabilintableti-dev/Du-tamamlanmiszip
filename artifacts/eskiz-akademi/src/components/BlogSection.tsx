import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/blogApi';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const categoryLabels: Record<string, string> = {
  'hazirlik': 'Güzel Sanatlar Hazırlık',
  'cizim': 'Çizim Teknikleri',
  'basari': 'Öğrenci Başarıları',
  'haberler': 'Akademi Haberleri'
};

export function BlogSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['blog-posts', 'preview'],
    queryFn: () => fetchPosts(),
  });

  const posts = data?.posts?.filter(p => p.published) || [];
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 4);

  return (
    <section className="py-24 bg-eskiz-dark border-t border-white/5 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl text-eskiz-gold mb-4 tracking-tight">Blog & Akademi Güncel</h2>
            <p className="text-eskiz-light/70 font-sans text-lg font-light">Sanat dünyasından haberler, eğitim ipuçları ve akademi duyuruları.</p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-eskiz-light hover:text-eskiz-gold transition-colors font-manrope text-sm tracking-widest uppercase font-semibold"
          >
            Tüm Yazıları Gör <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading && (
          <div className="animate-pulse space-y-12">
            <div className="h-[400px] bg-white/5 rounded-2xl w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="h-64 bg-white/5 rounded-2xl"></div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-eskiz-light/50 font-sans">
            <p>Yazılar yüklenirken bir hata oluştu.</p>
          </div>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="space-y-12">
            {featuredPost && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col md:flex-row bg-[#151515] rounded-3xl overflow-hidden border border-white/5 hover:border-eskiz-gold/30 transition-colors"
              >
                <div className="w-full md:w-1/2 aspect-video md:aspect-auto bg-black/40 overflow-hidden relative">
                  {featuredPost.cover_image ? (
                    <img src={featuredPost.cover_image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black flex items-center justify-center">
                      <span className="font-serif italic text-white/10 text-6xl">Eskiz</span>
                    </div>
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-eskiz-gold/10 text-eskiz-gold text-xs font-manrope tracking-wider border border-eskiz-gold/20 uppercase font-semibold backdrop-blur-md">
                      {categoryLabels[featuredPost.category] || featuredPost.category}
                    </span>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-6 text-xs text-eskiz-light/50 font-manrope tracking-wider mb-6">
                    <span className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {featuredPost.author}</span>
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {format(new Date(featuredPost.created_at), 'd MMMM yyyy', { locale: tr })}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl leading-tight text-white mb-6 group-hover:text-eskiz-gold transition-colors">{featuredPost.title}</h3>
                  <p className="text-eskiz-light/60 font-sans leading-relaxed mb-10 line-clamp-3">{featuredPost.excerpt}</p>
                  
                  <div>
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-eskiz-gold font-manrope text-sm tracking-wider hover:opacity-80 transition-opacity uppercase font-semibold"
                    >
                      Devamını Oku <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {regularPosts.map((post, idx) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group block h-full bg-[#151515] p-8 rounded-3xl border border-white/5 hover:border-eskiz-gold/30 transition-all hover:-translate-y-1">
                      <div className="mb-6">
                        <span className="text-eskiz-gold text-xs font-manrope tracking-wider uppercase font-semibold">
                          {categoryLabels[post.category] || post.category}
                        </span>
                      </div>
                      <h4 className="font-serif text-xl leading-snug text-white mb-4 group-hover:text-eskiz-gold transition-colors line-clamp-2">{post.title}</h4>
                      <p className="text-eskiz-light/60 font-sans text-sm leading-relaxed mb-8 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-xs text-eskiz-light/40 font-manrope mt-auto pt-4 border-t border-white/5">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {format(new Date(post.created_at), 'd MMM yyyy', { locale: tr })}</span>
                        <span className="flex items-center gap-1.5 text-eskiz-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-semibold">Oku <ArrowRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}