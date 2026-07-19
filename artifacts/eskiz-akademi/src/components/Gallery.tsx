import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

// Görselleri otomatik yükler. Yeni bir fotoğraf eklemek için,
// ilgili klasöre (src/assets/gallery/atolye, /student-works veya /workshop-events)
// dosyayı atman yeterli — kodu değiştirmene gerek yok.
const atolyeImages = import.meta.glob('../assets/gallery/atolye/*', { eager: true, import: 'default' }) as Record<string, string>;
const studentWorkImages = import.meta.glob('../assets/gallery/student-works/*', { eager: true, import: 'default' }) as Record<string, string>;
const workshopEventImages = import.meta.glob('../assets/gallery/workshop-events/*', { eager: true, import: 'default' }) as Record<string, string>;

const categories = ["Tümü", "Öğrenci Çalışmaları", "Atölye", "Etkinlik"];

function toPhotos(images: Record<string, string>, category: string) {
  return Object.keys(images)
    .sort()
    .map((key) => ({ src: images[key], category }));
}

const photos = [
  ...toPhotos(atolyeImages, "Atölye"),
  ...toPhotos(studentWorkImages, "Öğrenci Çalışmaları"),
  ...toPhotos(workshopEventImages, "Etkinlik"),
];

export function Gallery() {
  const [activeTab, setActiveTab] = useState("Tümü");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activeTab === "Tümü" 
    ? photos 
    : photos.filter(p => p.category === activeTab);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="galeri" className="py-24 md:py-32 bg-eskiz-dark relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-eskiz-light">Galeri</h2>
            <div className="w-24 h-1 bg-eskiz-gold mt-6"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full font-manrope text-sm tracking-wide transition-all ${
                  activeTab === cat 
                    ? 'bg-eskiz-gold text-eskiz-dark font-bold' 
                    : 'bg-transparent border border-eskiz-light/20 text-eskiz-light hover:border-eskiz-gold/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={photo.src}
                className="relative group rounded-lg overflow-hidden cursor-pointer break-inside-avoid"
                onClick={() => setLightboxIndex(index)}
              >
                <img 
                  src={photo.src} 
                  alt="Gallery item" 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="text-eskiz-gold w-10 h-10" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightboxIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white z-10"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>
            
            <button 
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10 p-4"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button 
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-10 p-4"
              onClick={handleNext}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={filteredPhotos[lightboxIndex].src}
              className="max-w-full max-h-full object-contain"
              alt="Fullscreen gallery item"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
