import React from 'react';
import { motion } from 'framer-motion';

export function ContactCTA() {
  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-eskiz-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-serif text-eskiz-light mb-6 leading-tight">
            Geleceğin Sanatçısı Ol
          </h2>
          <p className="text-xl md:text-2xl text-eskiz-light/70 font-sans font-light max-w-2xl mx-auto mb-12">
            Hayalindeki güzel sanatlar fakültesine giden yolda ilk adımı at.
          </p>
          
          <a
            href="https://wa.me/905074736314"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-eskiz-gold text-eskiz-dark px-12 py-5 rounded-full font-manrope font-bold text-lg tracking-[0.2em] uppercase hover:scale-105 hover:shadow-[0_0_40px_rgba(199,163,93,0.3)] hover:bg-white transition-all duration-300"
          >
            Hemen Başvur
          </a>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-eskiz-light/60 font-manrope tracking-wider">
            <a href="tel:05074736314" className="hover:text-eskiz-gold transition-colors text-lg">0507 473 63 14</a>
            <span className="hidden md:block h-1 w-1 bg-eskiz-gold rounded-full"></span>
            <a href="tel:02242538121" className="hover:text-eskiz-gold transition-colors text-lg">0224 253 81 21</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
