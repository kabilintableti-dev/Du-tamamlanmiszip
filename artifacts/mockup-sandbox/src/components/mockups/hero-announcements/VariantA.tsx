import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

const posts = [
  { 
    id: 1, 
    slug: "s1", 
    title: "2026 Yetenek Sınavı Takvimi Açıklandı", 
    excerpt: "Anadolu Üniversitesi 2026-2027 GSF Özel Yetenek Sınavı tarihleri açıklandı.", 
    categoryLabel: "Hazırlık", 
    catColor: "sky", 
    featured: true, 
    created_at: "15 Temmuz 2026", 
    reading_time: "3 dk" 
  },
  { 
    id: 2, 
    slug: "s2", 
    title: "Yeni Dönem Kayıtları Başladı — Erken Kayıt Fırsatı", 
    excerpt: "2026-2027 Ekim dönemi kayıtları açıldı. İlk 20 kayıt için özel indirim.", 
    categoryLabel: "Haberler", 
    catColor: "violet", 
    featured: true, 
    created_at: "12 Temmuz 2026", 
    reading_time: "2 dk" 
  },
  { 
    id: 3, 
    slug: "s3", 
    title: "Öğrencimiz MSGSÜ Resim Bölümü'nü Kazandı", 
    excerpt: "Eskiz Akademi'den bir başarı daha! Dila Şahin birincilikle yerleşti.", 
    categoryLabel: "Başarı", 
    catColor: "emerald", 
    featured: false, 
    created_at: "08 Temmuz 2026", 
    reading_time: "3 dk" 
  },
  { 
    id: 4, 
    slug: "s4", 
    title: "Kompozisyon Çiziminde Altın Oran: 5 Temel Kural", 
    excerpt: "Güzel sanatlar sınavlarında sizi öne çıkaracak kompozisyon kuralları.", 
    categoryLabel: "Çizim", 
    catColor: "amber", 
    featured: false, 
    created_at: "05 Temmuz 2026", 
    reading_time: "5 dk" 
  },
];

export default function VariantA() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Manrope:wght@500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div 
        className="w-full h-screen relative overflow-hidden flex flex-col lg:flex-row font-['Inter'] text-white"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(199,163,93,0.07) 0%, transparent 70%),
            linear-gradient(135deg, #0a0a0a 0%, #161412 30%, #0d0d0d 60%, #111111 100%)
          `
        }}
      >
        {/* Subtle dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 xl:px-32 relative z-10 py-12 lg:py-0">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 border-l border-[#C7A35D] pl-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C7A35D]" />
              <span className="font-['Manrope'] text-[11px] tracking-[0.15em] uppercase text-white/80 font-semibold">
                Güzel Sanatlar Fakültesi Hazırlık
              </span>
            </div>

            {/* Thin gold divider line */}
            <div className="w-12 h-px bg-[#C7A35D]/50 mb-8" />

            {/* Heading */}
            <h1 className="font-['Playfair_Display'] text-7xl lg:text-8xl leading-[0.95] text-[#FAFAF8] mb-8 font-medium">
              Sanatın<br />Geleceğini<br />Tasarla
            </h1>

            {/* Subtitle */}
            <p className="text-white/60 text-lg lg:text-xl font-light max-w-xl flex flex-col gap-4 mb-12">
              <span>Türkiye'nin en kapsamlı güzel sanatlara hazırlık programı.</span>
              <span>Hedeflediğiniz üniversiteye adım atmanız için uzman eğitmenler eşliğinde profesyonel atölye eğitimi.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-5">
              <button className="bg-[#C7A35D] text-[#111111] px-8 py-3.5 rounded-sm font-['Inter'] font-medium transition-all duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_24px_rgba(199,163,93,0.4)]">
                Programa Katıl
              </button>
              <button className="border border-white/20 text-[#FAFAF8] px-8 py-3.5 rounded-sm font-['Inter'] font-medium transition-all duration-300 hover:bg-white/5">
                Atölyeyi İncele
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel (Announcements) */}
        <div className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 relative z-10 flex flex-col bg-gradient-to-b from-black/40 to-black/25 backdrop-blur-3xl h-full">
          {/* Gradient Separator on Left Edge */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent hidden lg:block" />
          
          {/* Top accent gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C7A35D]/40 to-transparent" />

          {/* Panel Header */}
          <div className="px-8 pt-10 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="font-['Manrope'] text-[11px] tracking-[0.22em] uppercase text-white/90 font-bold">
                Güncel Duyurular
              </h2>
            </div>
            <span className="font-['Inter'] text-[12px] text-white/50 font-medium">
              5 yeni duyuru
            </span>
          </div>

          {/* Cards List */}
          <div className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col gap-4 no-scrollbar">
            {posts.map((post) => {
              const catColors: Record<string, string> = {
                sky: "bg-sky-400",
                violet: "bg-violet-400",
                emerald: "bg-emerald-400",
                amber: "bg-amber-400",
              };
              
              return (
                <div 
                  key={post.id}
                  className={`group relative rounded flex flex-col p-5 cursor-pointer transition-all duration-300
                    bg-[#1a1a1a]/60 hover:bg-[#222]/80 hover:border-[#C7A35D]/70 hover:shadow-[0_4px_24px_rgba(199,163,93,0.08)]
                    \${post.featured 
                      ? 'border border-white/[0.06] border-l-[2px] border-l-[#C7A35D]' 
                      : 'border border-white/[0.06]'}
                  `}
                >
                  {/* Featured subtle gold background */}
                  {post.featured && (
                    <div className="absolute inset-0 bg-[#C7A35D]/[0.04] pointer-events-none rounded" />
                  )}
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Meta Top */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {/* Category Badge */}
                        <div className="flex items-center gap-1.5 bg-white/[0.03] px-2 py-1 rounded-sm border border-white/[0.05]">
                          <div className={`w-[2px] h-[2px] rounded-full \${catColors[post.catColor]}`} />
                          <span className="text-[10px] uppercase tracking-wider text-white/70 font-['Inter'] font-medium">
                            {post.categoryLabel}
                          </span>
                        </div>
                        
                        {/* Featured Badge */}
                        {post.featured && (
                          <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded-full">
                            <Flame className="w-2.5 h-2.5 text-orange-400" />
                            <span className="text-[9px] uppercase tracking-wider text-orange-400 font-bold">
                              Önemli
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-['Playfair_Display'] text-[14px] leading-[1.4] text-[#FAFAF8] group-hover:text-white transition-colors">
                      {post.title}
                    </h3>
                    
                    {/* Subtle Separator */}
                    <div className="h-px w-8 bg-white/[0.06] mt-1.5 mb-1.5 group-hover:bg-[#C7A35D]/20 transition-colors" />
                    
                    <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2 font-['Inter'] mb-4 group-hover:text-white/70 transition-colors">
                      {post.excerpt}
                    </p>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between mt-auto pt-1 border-t border-transparent group-hover:border-white/[0.02]">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-['Inter'] group-hover:text-white/50">
                        <span>{post.reading_time} okuma</span>
                        <span className="text-white/20 mx-0.5">|</span>
                        <span>{post.created_at}</span>
                      </div>
                      
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowRight className="w-3 h-3 text-[#C7A35D]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel Footer */}
          <div className="px-8 py-6 border-t border-white/[0.04]">
            <a href="#" className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-white/70 hover:text-white transition-colors relative pb-0.5">
              <span className="font-['Inter']">Tüm Yazıları Görüntüle</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
