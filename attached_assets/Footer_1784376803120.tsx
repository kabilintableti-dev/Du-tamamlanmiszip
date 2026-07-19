import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] border-t border-[#C8A45D]/10 px-6 lg:px-24 pt-24 pb-10">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-4 gap-16 mb-20">
          {/* Marka */}
          <div className="lg:col-span-2">
            <h3 className="font-title text-3xl text-[#F5F3EE] mb-4">
              Eskiz <span className="text-[#C8A45D] italic">Akademi</span>
            </h3>
            <p className="text-white/40 max-w-sm leading-relaxed">
              Güzel Sanatlar Fakülteleri özel yetenek sınavlarına hazırlanan
              öğrenciler için akademik disiplin ve profesyonel sanat eğitimi.
            </p>
          </div>

          {/* Kurumsal */}
          <div>
            <span className="font-button text-[#C8A45D] uppercase tracking-widest text-[10px] block mb-6">
              Akademi
            </span>
            <ul className="space-y-3 text-white/50 text-sm">
              <li><a href="#neden-eskiz" className="hover:text-[#F5F3EE] transition-colors">Neden Eskiz Akademi</a></li>
              <li><a href="#programlar" className="hover:text-[#F5F3EE] transition-colors">Eğitim Programları</a></li>
              <li><a href="#basarilar" className="hover:text-[#F5F3EE] transition-colors">Öğrenci Başarıları</a></li>
              <li><a href="#egitmenler" className="hover:text-[#F5F3EE] transition-colors">Eğitmenler</a></li>
              <li><a href="#galeri-akademi" className="hover:text-[#F5F3EE] transition-colors">Galeri</a></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <span className="font-button text-[#C8A45D] uppercase tracking-widest text-[10px] block mb-6">
              İletişim
            </span>
            <ul className="space-y-3 text-white/50 text-sm">
              <li>+90 (5xx) xxx xx xx</li>
              <li>info@eskizakademi.com</li>
              <li>Atölye, şehir merkezinde</li>
            </ul>
            <div className="flex gap-4 mt-6">
              {["Instagram", "YouTube", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-white/40 hover:text-[#C8A45D] text-xs font-button uppercase tracking-widest transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {year} Eskiz Akademi. Tüm hakları saklıdır.
          </p>
          <p className="text-white/30 text-xs">
            Güzel Sanatlar Hazırlık Atölyesi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
