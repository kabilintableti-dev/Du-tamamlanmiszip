import React from 'react';
import { ArrowRight } from 'lucide-react';

const posts = [
  { id: 1, slug: "s1", title: "2026 Yetenek Sınavı Takvimi Açıklandı", excerpt: "Anadolu Üniversitesi 2026-2027 GSF Özel Yetenek Sınavı tarihleri açıklandı.", category: "hazirlik", featured: true, created_at: "2026-07-15", reading_time: "3 dk" },
  { id: 2, slug: "s2", title: "Yeni Dönem Kayıtları Başladı — Erken Kayıt Fırsatı", excerpt: "2026-2027 Ekim dönemi kayıtları açıldı. İlk 20 kayıt için özel indirim.", category: "haberler", featured: true, created_at: "2026-07-12", reading_time: "2 dk" },
  { id: 3, slug: "s3", title: "Öğrencimiz MSGSÜ Resim Bölümü'nü Kazandı", excerpt: "Eskiz Akademi'den bir başarı daha! Dila Şahin birincilikle yerleşti.", category: "basari", featured: false, created_at: "2026-07-08", reading_time: "3 dk" },
  { id: 4, slug: "s4", title: "Kompozisyon Çiziminde Altın Oran: 5 Temel Kural", excerpt: "Güzel sanatlar sınavlarında sizi öne çıkaracak kompozisyon kuralları.", category: "cizim", featured: false, created_at: "2026-07-05", reading_time: "5 dk" },
];

const categoryColors: Record<string, string> = {
  hazirlik: "text-sky-400",
  haberler: "text-violet-400",
  basari: "text-emerald-400",
  cizim: "text-[#C7A35D]",
};

export default function VariantB() {
  return (
    <div className="w-full min-h-[100dvh] relative overflow-hidden flex flex-col lg:flex-row bg-[#0c0b0a] font-['Inter'] text-[#FAFAF8]">
      {/* Video bg simulation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#0c0b0a]" />
        {/* Warm amber bottom-left */}
        <div className="absolute -bottom-1/4 -left-1/4 w-[120%] h-[120%] rounded-full blur-[160px] bg-[rgba(199,163,93,0.06)]" />
        {/* Cool blue-black top-right */}
        <div className="absolute -top-1/4 -right-1/4 w-[120%] h-[120%] rounded-full blur-[160px] bg-[rgba(20,20,30,0.9)]" />
        {/* Diagonal sweep */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(135deg, rgba(199,163,93,0.04) 0%, transparent 50%)" }} />
        {/* Noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat" 
          }} 
        />
        {/* Left overlay */}
        <div className="absolute inset-0 bg-black/35 lg:bg-gradient-to-r lg:from-black/35 lg:to-transparent" />
      </div>

      {/* Watermark */}
      <div className="absolute bottom-8 left-8 select-none pointer-events-none z-0 text-[180px] font-['Playfair_Display'] italic text-white/[0.025] leading-none">
        Eskiz
      </div>

      {/* Left panel - Content */}
      <div className="flex-1 relative z-10 flex flex-col justify-center px-8 lg:px-24 pt-24 pb-32 lg:py-0">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#C7A35D]"></div>
            <span className="text-[11px] font-medium tracking-[0.35em] text-[#C7A35D]/80 uppercase font-['Manrope']">
              GÜZEL SANATLAR AKADEMİSİ
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[56px] lg:text-[96px] leading-[1.05] tracking-tight mb-8">
            <span className="font-['Playfair_Display'] font-medium text-white block">Sanatın Geleceğini</span>
            <span className="font-['Playfair_Display'] italic text-[#C7A35D] block">Tasarla</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/50 text-lg font-light mb-12 max-w-xl">
            İstanbul'un en seçkin güzel sanatlar hazırlık akademisi
          </p>

          {/* CTA */}
          <button className="px-14 py-4 bg-white text-black text-sm font-medium tracking-wide hover:bg-[#C7A35D] hover:text-white transition-colors duration-500 rounded-sm">
            BAŞVUR &rarr;
          </button>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-8 lg:left-24 flex items-center gap-3">
          <div className="w-4 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce mt-1"></div>
          </div>
          <span className="text-[11px] text-white/40 tracking-widest uppercase font-['Manrope']">Aşağı kaydır</span>
        </div>
      </div>

      {/* Right panel - Editorial Sidebar */}
      <div 
        className="w-full lg:w-[340px] xl:w-[380px] relative z-10 flex flex-col min-h-[100dvh] bg-black/15 backdrop-blur-2xl"
        style={{ boxShadow: "inset 1px 0 0 rgba(255,255,255,0.04)" }}
      >
        <div className="flex-1 overflow-y-auto px-8 lg:px-10 py-16 lg:py-24 flex flex-col hide-scrollbar">
          
          {/* Header */}
          <div className="mb-10">
            <h2 className="font-['Playfair_Display'] italic text-3xl text-white/80 mb-2">Duyurular</h2>
            <p className="font-['Manrope'] text-xs tracking-[0.25em] text-[#C7A35D]/70 uppercase">
              & Haberler
            </p>
            <div className="h-px w-full bg-gradient-to-r from-[#C7A35D]/40 via-[#C7A35D]/20 to-transparent mt-6"></div>
          </div>

          {/* Posts List */}
          <div className="flex flex-col flex-1">
            {posts.map((post) => (
              <a 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group relative block py-5 border-b border-white/[0.05] flex-shrink-0"
              >
                {/* Featured bar */}
                {post.featured && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[2px] bg-[#C7A35D]"></div>
                )}

                <div className={`relative ${post.featured ? 'pl-4' : ''}`}>
                  {/* Meta row */}
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-2 font-['Manrope']">
                    {post.featured && (
                      <span className="text-[8px] font-bold tracking-[0.15em] text-orange-400/90 uppercase">
                        [ÖNEMLİ]
                      </span>
                    )}
                    <div className="flex items-center gap-1.5 text-[9px] tracking-widest uppercase text-white/60">
                      <span className={`text-[12px] leading-none ${categoryColors[post.category] || "text-white/40"}`}>•</span>
                      <span>{post.category}</span>
                      <span className="text-white/20 mx-0.5">·</span>
                      <span className="text-[10px] text-white/35 font-normal tracking-wider normal-case">
                        {new Date(post.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })} · {post.reading_time}
                      </span>
                    </div>
                  </div>

                  {/* Title & Arrow */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-['Playfair_Display'] text-[15px] leading-[1.35] text-white/90 group-hover:text-[#C7A35D] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-[#C7A35D] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 mt-0.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 flex items-center justify-between font-['Manrope']">
            <a href="/blog" className="group relative text-[11px] text-white/60 uppercase tracking-widest hover:text-white transition-colors duration-300">
              Tüm duyuruları gör
              <div className="absolute -bottom-1 left-0 w-0 h-px bg-[#C7A35D] group-hover:w-full transition-all duration-500"></div>
            </a>
            <span className="text-[10px] text-white/30">
              5 duyuru
            </span>
          </div>
        </div>
      </div>
      
      {/* Tailwind specific config overrides for scrollbar hiding */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
