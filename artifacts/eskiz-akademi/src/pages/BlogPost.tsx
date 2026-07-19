import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPost, fetchPosts } from '@/lib/blogApi';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const categoryLabels: Record<string, string> = {
  'hazirlik': 'Güzel Sanatlar Hazırlık',
  'cizim': 'Çizim Teknikleri',
  'basari': 'Öğrenci Başarıları',
  'haberler': 'Akademi Haberleri'
};

function RelatedPosts({ category, currentSlug }: { category: string, currentSlug: string }) {
  const { data } = useQuery({
    queryKey: ['blog-posts', category],
    queryFn: () => fetchPosts(category),
  });

  const related = data?.posts?.filter(p => p.published && p.slug !== currentSlug).slice(0, 2) || [];

  if (related.length === 0) return null;

  return (
    <section className="mt-32 pt-16 border-t border-white/5">
      <h3 className="font-serif text-3xl text-white mb-10 text-center">İlgili Yazılar</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {related.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-[#151515] p-8 rounded-3xl border border-white/5 hover:border-eskiz-gold/30 transition-all hover:-translate-y-1">
            <h4 className="font-serif text-xl leading-snug text-white mb-4 group-hover:text-eskiz-gold transition-colors line-clamp-2">{post.title}</h4>
            <p className="text-eskiz-light/60 font-sans text-sm leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-eskiz-light/40 font-manrope">
              <span>{format(new Date(post.created_at), 'd MMM yyyy', { locale: tr })}</span>
              <span className="text-eskiz-gold flex items-center gap-1 group-hover:gap-2 transition-all">Oku <ArrowRight className="w-3.5 h-3.5" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Simple text formatter for post content
function FormattedContent({ content }: { content: string }) {
  const blocks = content.split('\n\n');
  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-eskiz-gold hover:prose-a:text-eskiz-gold/80 prose-p:font-light prose-p:leading-[1.8] prose-p:text-eskiz-light/80">
      {blocks.map((block, i) => {
        if (block.startsWith('## ')) {
          return <h2 key={i} className="text-3xl mt-12 mb-6 text-white">{block.replace('## ', '')}</h2>;
        }
        if (block.startsWith('### ')) {
          return <h3 key={i} className="text-2xl mt-8 mb-4 text-white">{block.replace('### ', '')}</h3>;
        }
        if (block.startsWith('* ') || block.startsWith('- ')) {
          const items = block.split('\n').filter(Boolean);
          return (
            <ul key={i} className="list-disc pl-6 mb-6 space-y-2">
              {items.map((item, j) => (
                <li key={j} className="pl-2">{item.replace(/^[*|-]\s/, '')}</li>
              ))}
            </ul>
          );
        }
        return <p key={i} className="mb-6">{block}</p>;
      })}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => fetchPost(slug || ''),
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen bg-eskiz-dark text-eskiz-light flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        {isLoading && (
          <div className="container mx-auto px-6 h-[60vh] flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-eskiz-gold mb-4" />
            <p className="text-eskiz-light/50 font-manrope tracking-widest text-sm uppercase">Yükleniyor...</p>
          </div>
        )}

        {error && (
          <div className="container mx-auto px-6 h-[60vh] flex flex-col items-center justify-center text-center">
            <h2 className="font-serif text-3xl text-white mb-4">Yazı Bulunamadı</h2>
            <p className="text-eskiz-light/60 mb-8">Aradığınız içerik kaldırılmış veya adresi değişmiş olabilir.</p>
            <Link href="/blog" className="text-eskiz-gold hover:underline flex items-center gap-2 font-manrope">
              <ArrowLeft className="w-4 h-4" /> Blog'a Dön
            </Link>
          </div>
        )}

        {post && (
          <article>
            <div className="container mx-auto px-6 md:px-12">
              <Link href="/blog" className="inline-flex items-center gap-2 text-eskiz-light/50 hover:text-eskiz-gold transition-colors font-manrope text-sm font-semibold tracking-wider uppercase mb-12">
                <ArrowLeft className="w-4 h-4" /> Blog
              </Link>
            </div>

            <header className="mb-16">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <span className="px-4 py-1.5 rounded-full bg-eskiz-gold/10 text-eskiz-gold text-xs font-manrope tracking-wider border border-eskiz-gold/20 uppercase font-semibold">
                      {categoryLabels[post.category] || post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-manrope tracking-wider text-eskiz-light/50 uppercase">
                      <Clock className="w-3.5 h-3.5" /> {post.reading_time} Okuma
                    </span>
                  </div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-8"
                  >
                    {post.title}
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-6 text-sm text-eskiz-light/50 font-manrope"
                  >
                    <span className="flex items-center gap-2 text-white"><User className="w-4 h-4" /> {post.author}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {format(new Date(post.created_at), 'd MMMM yyyy', { locale: tr })}</span>
                  </motion.div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-16 w-full max-w-6xl mx-auto px-6 md:px-12"
              >
                <div className="aspect-video md:aspect-[21/9] w-full rounded-[2rem] overflow-hidden bg-[#151515] border border-white/5 relative">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black flex items-center justify-center">
                      <span className="font-serif italic text-white/5 text-8xl md:text-9xl">Eskiz</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </header>

            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-[720px] mx-auto">
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-eskiz-gold italic mb-12 border-l-2 border-eskiz-gold/30 pl-6">
                  {post.excerpt}
                </p>
                
                <FormattedContent content={post.content} />
              </div>

              <RelatedPosts category={post.category} currentSlug={post.slug} />
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}