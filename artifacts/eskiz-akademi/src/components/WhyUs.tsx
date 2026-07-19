import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Target, Palette } from 'lucide-react';

export function WhyUs() {
  const features = [
    {
      title: "Profesyonel Eğitim",
      description: "Akademik kariyer sahibi uzman eğitmenler",
      icon: GraduationCap
    },
    {
      title: "Birebir Takip",
      description: "Her öğrenciye özel ilerleme planı",
      icon: Users
    },
    {
      title: "Sınav Odaklı",
      description: "Güzel sanatlar fakültesi sınavlarına tam uyum",
      icon: Target
    },
    {
      title: "Atölye Deneyimi",
      description: "Gerçek atölye ortamında uygulamalı eğitim",
      icon: Palette
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const }
    }
  };

  return (
    <section id="hakkimizda" className="py-24 md:py-32 bg-eskiz-dark relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-eskiz-light">Neden Eskiz Akademi?</h2>
          <div className="w-24 h-1 bg-eskiz-gold mx-auto mt-6"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="group relative bg-eskiz-card p-10 rounded-lg transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
            >
              <div className="mb-6 inline-flex p-4 rounded-full bg-[#252525] text-eskiz-gold">
                <feature.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif text-eskiz-light mb-4">{feature.title}</h3>
              <p className="text-eskiz-light/70 font-sans font-light leading-relaxed">{feature.description}</p>
              
              <div className="absolute bottom-0 left-0 h-[2px] bg-eskiz-gold w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
