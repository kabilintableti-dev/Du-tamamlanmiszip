import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

export function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const counters = document.querySelectorAll('.counter-val');
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const isPercent = counter.getAttribute('data-suffix') === '%';
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        
        gsap.to(counter, {
          innerHTML: target,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            counter.innerHTML = `${prefix}${Math.round(Number(this.targets()[0].innerHTML))}${suffix}`;
          }
        });
      });
    }
  }, [isInView]);

  const stats = [
    { target: 12, suffix: "+", label: "Yıllık Deneyim" },
    { target: 500, suffix: "+", label: "Mezun Öğrenci" },
    { target: 94, prefix: "%", suffix: "", label: "Üniversite Yerleşme Oranı" },
    { target: 8, suffix: "", label: "Kişilik Gruplar" }
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#0D0D0D] border-y border-white/5 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-eskiz-light">Başarılarımız</h2>
          <div className="w-24 h-1 bg-eskiz-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div 
                className="counter-val text-5xl md:text-7xl font-serif text-eskiz-gold mb-4 font-bold"
                data-target={stat.target}
                data-prefix={stat.prefix}
                data-suffix={stat.suffix}
              >
                0
              </div>
              <p className="font-manrope text-eskiz-light/80 text-sm md:text-base tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "Kızım burada aldığı eğitimle hayalindeki okula birincilikle girdi. Sadece bir kurs değil, gerçek bir atölye ailesi oldular.",
              author: "Zeynep T. (Veli)"
            },
            {
              quote: "Sınav stresini unutturan, tamamen sanata ve gelişime odaklanan harika eğitmen kadrosuna teşekkür ederim.",
              author: "Emre S. (Öğrenci)"
            }
          ].map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="bg-eskiz-card p-10 md:p-12 rounded-xl relative"
            >
              <div className="text-6xl text-eskiz-gold/20 font-serif absolute top-6 left-6 leading-none">"</div>
              <p className="font-serif italic text-xl md:text-2xl text-eskiz-light leading-relaxed mb-6 relative z-10">
                {test.quote}
              </p>
              <div className="font-manrope text-eskiz-gold tracking-wide">
                — {test.author}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
