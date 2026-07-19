import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t-2 border-eskiz-gold pt-20 pb-8 text-eskiz-light/80 font-sans">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand */}
          <div className="flex flex-col">
            <h2 className="font-serif italic text-3xl text-eskiz-gold mb-4">Eskiz Akademi</h2>
            <p className="font-light leading-relaxed max-w-sm mb-6">
              İstanbul'un en seçkin güzel sanatlar hazırlık akademisi. Yeteneğini keşfet, geleceğini inşa et.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/eskizakademi" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-eskiz-gold hover:text-eskiz-gold transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://wa.me/905074736314" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-eskiz-gold hover:text-eskiz-gold transition-all">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col md:items-center">
            <div>
              <h3 className="font-manrope text-white font-semibold tracking-wider uppercase mb-6 text-sm">Hızlı Linkler</h3>
              <ul className="space-y-4 font-light">
                <li><a href="#egitimler" className="hover:text-eskiz-gold transition-colors">Eğitim Programları</a></li>
                <li><a href="#galeri" className="hover:text-eskiz-gold transition-colors">Galeri & Atölye</a></li>
                <li><a href="#etkinlikler" className="hover:text-eskiz-gold transition-colors">Etkinlikler</a></li>
                <li><a href="#iletisim" className="hover:text-eskiz-gold transition-colors">İletişim & Başvuru</a></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col md:items-end text-left md:text-right">
            <div>
              <h3 className="font-manrope text-white font-semibold tracking-wider uppercase mb-6 text-sm">İletişim</h3>
              <ul className="space-y-4 font-light">
                <li><a href="tel:05074736314" className="hover:text-eskiz-gold transition-colors text-lg">0507 473 63 14</a></li>
                <li><a href="tel:02242538121" className="hover:text-eskiz-gold transition-colors text-lg">0224 253 81 21</a></li>
                <li className="mt-4 text-sm opacity-60">İstanbul, Türkiye</li>
              </ul>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-light opacity-60">
          <p>© {new Date().getFullYear()} Eskiz Akademi. Tüm hakları saklıdır.</p>
          <p className="mt-2 md:mt-0">Sanatın Geleceğini Tasarla</p>
        </div>
      </div>
    </footer>
  );
}
