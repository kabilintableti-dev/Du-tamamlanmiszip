import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Calendar } from 'lucide-react';

import ev1 from '@assets/7415_1784376803169.jpg';
import ev2 from '@assets/7416_1784376803174.jpg';
import ev3 from '@assets/7567_1784376803184.jpg';
import ev4 from '@assets/7568_1784376803179.jpg';

const events = [
  {
    title: "Yıl Sonu Sergisi 2024",
    date: "Haziran 2024",
    desc: "Öğrenci çalışmalarının sergilendiği yıllık etkinlik.",
    img: ev1
  },
  {
    title: "Açık Atölye Günü",
    date: "Mayıs 2024",
    desc: "Akademimizi tanıma ve deneme dersi fırsatı.",
    img: ev2
  },
  {
    title: "Müze Gezisi",
    date: "Nisan 2024",
    desc: "Pera Müzesi koleksiyon turu ve inceleme.",
    img: ev3
  },
  {
    title: "Portfolyo Tanıtım Günü",
    date: "Mart 2024",
    desc: "Üniversite temsilcileriyle buluşma ve portfolyo değerlendirmesi.",
    img: ev4
  }
];

export function Events() {
  return (
    <section id="etkinlikler" className="py-24 md:py-32 bg-[#141414] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-eskiz-light">Etkinlikler</h2>
          <div className="w-24 h-1 bg-eskiz-gold mt-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Swiper
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.5 }
            }}
            className="w-full !overflow-visible"
          >
            {events.map((ev, i) => (
              <SwiperSlide key={i}>
                <div className="group bg-eskiz-card rounded-xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all duration-500 border border-white/5 hover:border-eskiz-gold/30 cursor-grab active:cursor-grabbing">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={ev.img} 
                      alt={ev.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <Calendar size={14} className="text-eskiz-gold" />
                      <span className="text-xs font-manrope text-white tracking-wider">{ev.date}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-serif text-eskiz-light mb-3">{ev.title}</h3>
                      <p className="text-eskiz-light/60 font-sans font-light leading-relaxed mb-6">{ev.desc}</p>
                    </div>
                    <a href="https://wa.me/905074736314" target="_blank" rel="noreferrer" className="text-eskiz-gold font-manrope font-semibold tracking-wide text-sm uppercase flex items-center gap-2 group/btn">
                      Detay <span className="transform transition-transform group-hover/btn:translate-x-2">→</span>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
