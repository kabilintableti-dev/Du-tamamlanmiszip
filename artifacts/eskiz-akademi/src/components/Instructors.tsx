import React from 'react';
import { motion } from 'framer-motion';

import inst2 from '../assets/educators/img-20260718-wa0061.jpg';

// NOT: İsim ve unvan bilgileri geçici. Aşağıdaki "name", "role" ve "exp"
// alanlarını kendi eğitmen bilgilerinle değiştirmen yeterli.
const instructors = [
  {
    name: "Asena Altıntop",
    role: "Müdür/Anadolu Üniversitesi",
    exp: "Deneyim Bilgisi",
    img: inst2
  }
];

export function Instructors() {
  return (
    <section className="py-24 md:py-32 bg-eskiz-dark relative">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-eskiz-light">Eğitmenlerimiz</h2>
          <div className="w-24 h-1 bg-eskiz-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {instructors.map((inst, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ rotateY: i === 0 ? 5 : -5, rotateX: 5 }}
              style={{ perspective: 1000 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-6 bg-[#1A1A1A] aspect-[3/4]">
                <img 
                  src={inst.img} 
                  alt={inst.name}
                  className="w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-serif text-eskiz-light mb-2 relative inline-block">
                  {inst.name}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-eskiz-gold group-hover:w-full transition-all duration-500"></div>
                </h3>
                <p className="font-sans text-eskiz-light/70 mt-4">{inst.role}</p>
                <p className="font-manrope text-sm text-eskiz-gold tracking-widest uppercase mt-2">{inst.exp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
