import React from 'react';
import { motion } from 'framer-motion';

// Bu klasöre attığın her görsel otomatik olarak burada listelenir.
const studentWorkImages = import.meta.glob('../assets/gallery/student-works/*', { eager: true, import: 'default' }) as Record<string, string>;

const works = Object.keys(studentWorkImages)
  .sort()
  .map((key) => ({ img: studentWorkImages[key] }));

export function StudentWorks() {
  return (
    <section className="py-24 md:py-32 bg-eskiz-dark relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-eskiz-light">Öğrenci Çalışmaları</h2>
          <p className="mt-4 text-eskiz-light/60 font-sans text-lg">Sınav başarısıyla sonuçlanan çalışmalar</p>
          <div className="w-24 h-1 bg-eskiz-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {works.map((work, i) => (
            <motion.div
              key={work.img}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1 }}
              className="group relative"
            >
              {/* Art Frame Effect */}
              <div className="relative p-3 bg-[#1A1A1A] rounded-sm shadow-2xl transition-all duration-500 group-hover:border-eskiz-gold/50 border border-[#222]">
                <div className="overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                  <img 
                    src={work.img} 
                    alt={`Öğrenci Çalışması ${i + 1}`}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(199,163,93,0)] group-hover:shadow-[inset_0_0_50px_rgba(199,163,93,0.15)] transition-shadow duration-500 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
