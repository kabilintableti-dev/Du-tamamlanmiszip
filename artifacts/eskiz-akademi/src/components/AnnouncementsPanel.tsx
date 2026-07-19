import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts, type BlogPost } from '@/lib/blogApi';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Flame, Megaphone } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

// ─── Category config ──────────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, string> = {
  hazirlik: 'Yetenek Sınavı',
  cizim: 'Çizim',
  basari: 'Başarı',
  haberler: 'Haber',
};

const CATEGORY_COLORS: Record<string, string> = {
  hazirlik: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  cizim: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  basari: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  haberler: 'text-eskiz-gold bg-eskiz-gold/10 border-eskiz-gold/20',
};

// ─── Single announcement card ─────────────────────────────────────────────────
function AnnouncementCard({ post, index }: { post: BlogPost; index: number }) {
  const colorClass = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.haberler;
  const label = CATEGORY_LABELS[post.category] ?? post.category;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35 + index * 0.1, ease: 'easeOut' }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div
          className="
            group relative p-4 rounded-2xl cursor-pointer
            border border-white/[0.07] bg-white/[0.04]
            hover:bg-white/[0.09] hover:border-eskiz-gold/25
            hover:shadow-[0_8px_32px_rgba(199,163,93,0.10)]
            hover:scale-[1.025]
            transition-all duration-300
          "
        >
          {/* Featured badge */}
          {post.featured && (
            <div className="flex items-center gap-1.5 mb-2.5">
              <Flame className="w-3 h-3 text-orange-400 fill-orange-400/30" />
              <span className="text-[9px] font-manrope font-bold tracking-[0.18em] uppercase text-orange-400">
                ÖNEMLİ
              </span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {/* Category */}
            <span
              className={`self-start inline-block px-2 py-0.5 rounded-full text-[9px] font-manrope font-bold tracking-[0.12em] uppercase border ${colorClass}`}
            >
              {label}
            </span>

            {/* Title */}
            <h4 className="font-serif text-[13px] leading-snug text-white/90 group-hover:text-eskiz-gold transition-colors line-clamp-2">
              {post.title}
            </h4>

            {/* Excerpt */}
            <p className="text-[11px] text-white/45 leading-relaxed line-clamp-2 font-sans font-light">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[10px] text-white/35 font-manrope flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" />
                {format(new Date(post.created_at), 'd MMM yyyy', { locale: tr })}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-eskiz-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="p-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] animate-pulse space-y-2.5">
      <div className="h-3 w-20 bg-white/10 rounded-full" />
      <div className="h-4 w-full bg-white/8 rounded" />
      <div className="h-3 w-3/4 bg-white/6 rounded" />
      <div className="h-2.5 w-16 bg-white/5 rounded-full mt-1" />
    </div>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────
export function AnnouncementsPanel() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['announcements-panel'],
    queryFn: () => fetchPosts(),
    staleTime: 5 * 60 * 1000,
  });

  const allPosts = data?.posts ?? [];
  // Featured first, then chronological; max 4 shown
  const featured = allPosts.filter((p) => p.featured);
  const regular = allPosts.filter((p) => !p.featured);
  const orderedPosts = [...featured, ...regular].slice(0, 4);

  return (
    <div className="relative w-full flex flex-col p-6 md:p-8 lg:py-10 lg:px-8 gap-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-1"
      >
        <div className="w-9 h-9 rounded-xl bg-eskiz-gold/10 border border-eskiz-gold/20 flex items-center justify-center shrink-0">
          <Megaphone className="w-4 h-4 text-eskiz-gold" />
        </div>
        <div>
          <p className="text-[10px] font-manrope font-semibold tracking-[0.2em] uppercase text-eskiz-gold/70 mb-0.5">
            Güncel
          </p>
          <h3 className="font-manrope font-bold text-white text-sm tracking-wide">
            Duyurular & Haberler
          </h3>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {isLoading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {isError && (
          <div className="py-8 text-center text-white/30 text-xs font-sans">
            Duyurular yüklenemedi.
          </div>
        )}

        {!isLoading && !isError && orderedPosts.length === 0 && (
          <div className="py-10 text-center text-white/25 text-xs font-sans italic">
            Yakında duyurular eklenecek…
          </div>
        )}

        {!isLoading &&
          !isError &&
          orderedPosts.map((post, i) => (
            <AnnouncementCard key={post.id} post={post} index={i} />
          ))}
      </div>

      {/* Footer link */}
      {!isLoading && orderedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-auto pt-4 border-t border-white/[0.07]"
        >
          <Link href="/blog">
            <div className="group flex items-center justify-between text-white/40 hover:text-eskiz-gold transition-colors font-manrope text-[10px] tracking-[0.18em] uppercase font-bold cursor-pointer">
              <span>Tüm Duyurular</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
