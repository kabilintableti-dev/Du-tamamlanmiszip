import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import { AnnouncementsPanel } from './AnnouncementsPanel';
import primaryVideo from '@assets/SnapInsta.to_AQPtHB0I7Zb2lhkplzUx4tmNVgdW8PChgRdcn10MMgSDWykR5_1784377547824.mp4';
import secondaryVideo from '@assets/SnapInsta.to_AQPtHB0I7Zb2lhkplzUx4tmNVgdW8PChgRdcn10MMgSDWykR5_1784376803135.mp4';

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { opacity: 0, filter: 'blur(20px)', y: 80 },
        {
          opacity: 1,
          filter: 'blur(0)',
          y: 0,
          stagger: 0.03,
          duration: 1.4,
          ease: 'power3.out',
          delay: 0.5,
        },
      );
    }
  }, []);

  const headingText = 'Sanatın Geleceğini Tasarla';

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100dvh' }}>
      {/* ── Full-bleed video background ───────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={primaryVideo} type="video/mp4" />
          <source src={secondaryVideo} type="video/mp4" />
        </video>

        {/* Base overlay: darkens the video evenly */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Desktop: extra dark gradient bleeding in from the right to frame the panel */}
        <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(to_right,transparent_40%,rgba(10,10,10,0.55)_65%,rgba(10,10,10,0.82)_100%)]" />

        {/* Mobile: bottom fade into page background */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-transparent via-transparent to-eskiz-dark/80" />
      </div>

      {/* ── Content layout ────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row" style={{ minHeight: '100dvh' }}>

        {/* ── LEFT: Text + CTAs ─────────────────────────────────────────── */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-14 pt-32 pb-16 lg:pt-0 lg:pb-0 min-h-[65dvh] lg:min-h-0">
          <div className="flex flex-col items-center text-center max-w-xl w-full">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 font-manrope text-xs md:text-sm tracking-[0.3em] uppercase text-eskiz-gold font-semibold"
            >
              Güzel Sanatlar Fakültesi Hazırlık
            </motion.div>

            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-eskiz-light mb-8 leading-tight"
            >
              {headingText.split('').map((char, index) => (
                <span key={index} className="char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            <div className="flex flex-col gap-2 mb-12 text-eskiz-light/80 text-base md:text-lg font-sans font-light">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                İstanbul'un en seçkin güzel sanatlar hazırlık akademisinde
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                yeteneğini keşfet, geleceğini inşa et.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <a
                href="https://wa.me/905074736314"
                target="_blank"
                rel="noreferrer"
                className="bg-eskiz-gold text-eskiz-dark px-9 py-3.5 rounded-full font-manrope font-bold tracking-wider hover:scale-105 hover:shadow-[0_0_24px_rgba(199,163,93,0.45)] transition-all w-full sm:w-auto text-center text-sm"
              >
                HEMEN BAŞVUR
              </a>
              <a
                href="#egitimler"
                className="bg-transparent border border-eskiz-gold text-eskiz-gold px-9 py-3.5 rounded-full font-manrope font-bold tracking-wider hover:bg-eskiz-gold hover:text-eskiz-dark transition-all w-full sm:w-auto text-center text-sm"
              >
                DAHA FAZLA BİLGİ
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT: Announcements Panel ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
          className="
            relative
            w-full lg:w-[380px] xl:w-[440px] flex-shrink-0
            border-t border-white/[0.08] lg:border-t-0 lg:border-l lg:border-white/[0.08]
            overflow-hidden
          "
        >
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-2xl" />

          {/* Subtle inner gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          {/* Decorative gold accent line at top on desktop */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eskiz-gold/30 to-transparent" />

          <div className="relative z-10 h-full">
            <AnnouncementsPanel />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator (desktop only, centered in left column) ─────── */}
      <motion.div
        className="absolute bottom-8 z-10 text-eskiz-gold/60 hidden lg:flex items-center"
        style={{ left: 'calc(50% - 220px)' }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
