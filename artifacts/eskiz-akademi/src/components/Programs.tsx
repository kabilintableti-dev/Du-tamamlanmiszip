import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import photo7400 from '@assets/7400_1784376803158.jpg';
import photo7407 from '@assets/7407_1784376803154.jpg';
import photo7408 from '@assets/7408_1784376803148.jpg';
import photo7411 from '@assets/7411_1784376803140.jpg';
import photo7416 from '@assets/7416_1784376803174.jpg';

const programs = [
  {
    title: "Güzel Sanatlar Hazırlık",
    description: "Tüm güzel sanatlar fakülteleri yetenek sınavlarına yönelik kapsamlı temel eğitim.",
    image: photo7400,
    span: "md:col-span-2 lg:col-span-2 row-span-2"
  },
  {
    title: "İmgesel Desen",
    description: "Sınavların en kritik aşaması olan imgesel çizimde kompozisyon ve anatomi teknikleri.",
    image: photo7407,
    span: "md:col-span-1 lg:col-span-1 row-span-1"
  },
  {
    title: "Canlı Model Çalışması",
    description: "Oran-orantı, anatomi ve hacim kavrama becerileri için canlı model atölyesi.",
    image: photo7408,
    span: "md:col-span-1 lg:col-span-1 row-span-1"
  },
  {
    title: "Karakalem Teknikleri",
    description: "Çizgi, leke, ışık-gölge ve doku uygulamaları ile temel sanat eğitimi.",
    image: photo7411,
    span: "md:col-span-1 lg:col-span-1 row-span-1"
  },
  {
    title: "Portfolyo Hazırlık",
    description: "Yurtiçi ve yurtdışı üniversite başvuruları için profesyonel dosya hazırlığı.",
    image: photo7416,
    span: "md:col-span-1 lg:col-span-1 row-span-1"
  }
];

function ProgramCard({ program, index }: { program: typeof programs[0], index: number }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useMotionTemplate`${(mouseY.get() - 0.5) * -10}deg`, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionTemplate`${(mouseX.get() - 0.5) * 10}deg`, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`relative group rounded-xl overflow-hidden cursor-pointer h-[400px] md:h-[500px] ${program.span}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={program.image} 
            alt={program.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
        
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-8" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl md:text-3xl font-serif text-eskiz-light mb-3">{program.title}</h3>
          <p className="text-eskiz-light/80 font-sans font-light leading-relaxed mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {program.description}
          </p>
          <a href="https://wa.me/905074736314" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-eskiz-gold font-manrope font-semibold tracking-wider text-sm uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 w-fit">
            <span>Detaylı Bilgi</span>
            <div className="w-8 h-[1px] bg-eskiz-gold group-hover:w-12 transition-all duration-300" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Programs() {
  return (
    <section id="egitimler" className="py-24 md:py-32 bg-eskiz-dark relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-eskiz-light">Eğitim Programlarımız</h2>
          <div className="w-24 h-1 bg-eskiz-gold mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px] md:auto-rows-[240px]">
          {programs.map((program, i) => (
            <ProgramCard key={i} program={program} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
