import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65", label: "Atölye Çalışmaları", size: "large" },
  { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b", label: "Karakalem Atölyesi", size: "small" },
  { src: "https://images.unsplash.com/photo-1547333101-1e69ea3a6e08", label: "Sergi Gecesi", size: "small" },
  { src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0", label: "Sınav Simülasyonu", size: "large" },
  { src: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654", label: "Renk Atölyesi", size: "small" },
  { src: "https://images.unsplash.com/photo-1499892477393-f675706cbe6e", label: "Portfolyo Günü", size: "small" }
];

const Gallery: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 lg:px-24 bg-[#1E1E1E]" id="galeri-akademi">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="font-button text-[#C8A45D] uppercase tracking-[0.5em] text-[10px] block mb-6">
              Akademiden Kareler
            </span>
            <h2 className="font-title text-5xl lg:text-7xl leading-[1.05] text-white">
              Galeri
            </h2>
          </div>
          <p className="text-white/40 max-w-sm leading-relaxed">
            Atölyeden sergiye, sınav gününden mezuniyete — Eskiz Akademi'de
            geçen bir eğitim yılından kareler.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                img.size === "large" ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
              }`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
              onClick={() => setActive(i)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 border-2 border-[#C8A45D]/0 group-hover:border-[#C8A45D]/60 m-3 rounded-lg transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 text-white font-button uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {img.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              src={galleryImages[active].src}
              alt={galleryImages[active].label}
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            <button
              className="absolute top-8 right-8 text-white/70 hover:text-[#C8A45D] font-button text-sm tracking-widest uppercase transition-colors"
              onClick={() => setActive(null)}
            >
              Kapat
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
