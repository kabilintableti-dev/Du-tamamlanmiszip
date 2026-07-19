import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "94%", label: "Üniversite Yerleşim Oranı" },
  { value: "310+", label: "Mezun Öğrenci" },
  { value: "12", label: "Yıllık Tecrübe" },
  { value: "18", label: "Farklı Fakülteye Yerleşim" }
];

const stories = [
  {
    name: "Elif Kaya",
    school: "Mimar Sinan GSF — Resim",
    year: "2024",
    quote: "Eskiz Akademi'deki birebir takip sayesinde portfolyomu tamamen yeniden kurguladım.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    name: "Kerem Demir",
    school: "Hacettepe GSF — Grafik Tasarım",
    year: "2023",
    quote: "Sınav pratiği ve düzenli geri bildirimler özgüvenimi baştan sona değiştirdi.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    name: "Aslı Yıldız",
    school: "Marmara GSF — İç Mimarlık",
    year: "2024",
    quote: "Akademik disiplinle sanatsal özgürlüğü aynı anda öğrendiğim tek yer burasıydı.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9"
  }
];

const Achievements: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-24 bg-[#F5F3EE]" id="basarilar">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <span className="font-button text-[#C8A45D] uppercase tracking-[0.5em] text-[10px] block mb-6">
            Kanıtlanmış Sonuçlar
          </span>
          <h2 className="font-title text-5xl lg:text-6xl leading-[1.1] text-[#1E1E1E]">
            Öğrenci <span className="italic text-[#C8A45D]">Başarıları</span>
          </h2>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-24 border-y border-[#1E1E1E]/10 py-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="font-title text-4xl lg:text-5xl text-[#1E1E1E] mb-2">{s.value}</div>
              <div className="text-[#1E1E1E]/50 text-sm tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Başarı hikayeleri */}
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((st, i) => (
            <motion.div
              key={st.name}
              className="group relative overflow-hidden rounded-2xl bg-[#1E1E1E]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={st.img}
                  alt={st.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/60 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[#C8A45D] font-button text-[10px] uppercase tracking-widest block mb-3">
                  {st.school} · {st.year}
                </span>
                <p className="text-white text-lg leading-relaxed mb-4 italic">
                  "{st.quote}"
                </p>
                <h4 className="font-title text-xl text-white">{st.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
