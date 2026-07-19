import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts, type BlogPost } from '@/lib/blogApi';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

import placeholder1 from '@/assets/gallery/workshop-events/img-20260718-wa0046.jpg';
import placeholder2 from '@/assets/gallery/workshop-events/img-20260718-wa0050.jpg';
import placeholder3 from '@/assets/gallery/workshop-events/img-20260718-wa0036.jpg';
import placeholder4 from '@/assets/gallery/workshop-events/img-20260718-wa0048.jpg';
import placeholder5 from '@/assets/gallery/atolye/7405.jpg';
import placeholder6 from '@/assets/gallery/atolye/7409.jpg';

const categoryLabels: Record<string, string> = {
  hazirlik: 'Güzel Sanatlar Hazırlık',
  cizim: 'Çizim Teknikleri',
  basari: 'Öğrenci Başarıları',
  haberler: 'Akademi Haberleri',
};

const placeholderImages = [placeholder1, placeholder2, placeholder3, placeholder4, placeholder5, placeholder6];

const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    id: 'p1', slug: '', title: 'Güzel Sanatlar Sınavına Nasıl Hazırlanılır?',
    excerpt: 'Sınava en iyi şekilde hazırlanmak için takip etmeniz gereken adımlar ve öneriler.',
    content: '', category: 'hazirlik', cover_image: placeholder1,
    author: 'Eskiz Akademi', reading_time: '5 dk', published: true, featured: false,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 'p2', slug: '', title: 'Perspektif Çiziminde Temel Teknikler',
    excerpt: 'Perspektif çizimini öğrenmek için bilmeniz gereken temel kurallar ve egzersizler.',
    content: '', category: 'cizim', cover_image: placeholder2,
    author: 'Eskiz Akademi', reading_time: '4 dk', published: true, featured: false,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 'p3', slug: '', title: 'Öğrencilerimizin Başarı Hikayeleri',
    excerpt: 'Akademimizden mezun olan öğrencilerin güzel sanatlar fakültesi yolculukları.',
    content: '', category: 'basari', cover_image: placeholder3,
    author: 'Eskiz Akademi', reading_time: '6 dk', published: true, featured: false,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 'p4', slug: '', title: '2025 Güzel Sanatlar Hazırlık Kayıtları Başladı',
    excerpt: 'Yeni dönem kayıt ve başvuru süreci hakkında bilmeniz gereken tüm detaylar.',
    content: '', category: 'haberler', cover_image: placeholder4,
    author: 'Eskiz Akademi', reading_time: '3 dk', published: true, featured: false,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 'p5', slug: '', title: 'Desen ve Renk Teorisi: Temelden İleri Seviye',
    excerpt: 'Sanatın temel dili olan desen ve renk teorisini öğrenmek için başlangıç rehberi.',
    content: '', category: 'cizim', cover_image: placeholder5,
    author: 'Eskiz Akademi', reading_time: '7 dk', published: true, featured: false,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 'p6', slug: '', title: 'Atölye Gezisi: İlham Almak İçin 5 İstanbul Müzesi',
    excerpt: 'Sanat eğitiminizi zenginleştirecek, İstanbul\'un en ilham verici müzeleri.',
    content: '', category: 'haberler', cover_image: placeholder6,
    author: 'Eskiz Akademi', reading_time: '4 dk', published: true, featured: false,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
];

interface PostCardProps {
  post: BlogPost;
  index: number;
  isPlaceholder?: boolean;
}

function PostCard({ post, index, isPlaceholder }: PostCardProps) {
  const coverSrc = post.cover_image || placeholderImages[index % placeholderImages.length];
  const isImageUrl = typeof coverSrc === 'string' && coverSrc.startsWith('http');

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col bg-[#141414] rounded-2xl overflow-hidden border border-white/5 hover:border-eskiz-gold/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl h-full cursor-pointer"
    >
      {/* Cover image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/40">
        <img
          src={isImageUrl ? coverSrc : coverSrc as unknown as string}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-eskiz-gold text-[10px] font-manrope tracking-widest uppercase font-semibold border border-eskiz-gold/20">
            {categoryLabels[post.category] || post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-serif text-lg leading-snug text-eskiz-light group-hover:text-eskiz-gold transition-colors duration-300 mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-eskiz-light/55 font-sans text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-eskiz-light/40 font-manrope">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(post.created_at), 'd MMM yyyy', { locale: tr })}
          </span>
          <span className="flex items-center gap-1 text-eskiz-gold font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Oku <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (isPlaceholder || !post.slug) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      {cardContent}
    </Link>
  );
}

export function BlogSection() {
  const { data, isLoading } = useQuery({
    queryKey: ['blog-posts', 'preview'],
    queryFn: () => fetchPosts(),
  });

  const livePosts = data?.posts?.filter((p) => p.published) || [];
  const posts = livePosts.length > 0 ? livePosts.slice(0, 6) : PLACEHOLDER_POSTS;
  const isPlaceholder = livePosts.length === 0;

  return (
    <section className="py-24 md:py-32 bg-eskiz-dark border-t border-white/5 relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl text-eskiz-light mb-4 tracking-tight"
            >
              Blog & <span className="text-eskiz-gold italic">Duyurular</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-eskiz-light/60 font-sans text-lg font-light"
            >
              Sanat dünyasından haberler, eğitim ipuçları ve akademi duyuruları.
            </motion.p>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-eskiz-light hover:text-eskiz-gold transition-colors font-manrope text-sm tracking-widest uppercase font-semibold flex-shrink-0"
          >
            Tüm Yazıları Gör{' '}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white/5 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-white/5 rounded w-1/3" />
                  <div className="h-5 bg-white/5 rounded w-full" />
                  <div className="h-5 bg-white/5 rounded w-4/5" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Card grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, idx) => (
              <PostCard key={post.id} post={post} index={idx} isPlaceholder={isPlaceholder} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
