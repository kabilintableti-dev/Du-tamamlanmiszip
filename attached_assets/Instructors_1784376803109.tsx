import React from 'react';
import { motion } from 'framer-motion';

const instructors = [
  {
    name: "Deniz Aksoy",
    role: "Kurucu Eğitmen · Resim",
    bio: "Mimar Sinan GSF mezunu, 14 yıllık sınav hazırlık tecrübesi.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
  },
  {
    name: "Selin Erdoğan",
    role: "Desen & Kompozisyon",
    bio: "Hacettepe GSF, karakalem ve figür çalışmalarında uzman.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
  },
  {
    name: "Onur Baykal",
    role: "Grafik & İmgesel Tasarım",
    bio: "Endüstri deneyimli sanat yönetmeni, portfolyo danışmanı.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
  },
  {
    name: "Mert Yavaş",
    role: "Mimari & İç Mimarlık",
    bio: "Teknik çizim ve mekansal tasarım derslerini yürütüyor.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a"
  }
];

const Instructors: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-24 bg-black" id="egitmenler">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-20 max-w-2xl">
          <span className="font-button text-[#C8A45D] uppercase tracking-[0.5em] text-[10px] block mb-6">
            Akademik Kadro
          </span>
          <h2 className="font-title text-5xl lg:text-7xl leading-[1.05] text-white">
            Eğitmenler<span className="text-[#C8A45D]">.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {instructors.map((ins, i) => (
            <motion.div
              key={ins.name}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-xl mb-6 aspect-[3/4]">
                <img
                  src={ins.img}
                  alt={ins.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-[#C8A45D]/0 group-hover:border-[#C8A45D]/50 m-2 rounded-lg transition-all duration-500" />
              </div>
              <h3 className="font-title text-xl text-white mb-1">{ins.name}</h3>
              <span className="text-[#C8A45D] font-button text-[10px] uppercase tracking-widest block mb-3">
                {ins.role}
              </span>
              <p className="text-white/45 text-sm leading-relaxed">{ins.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
