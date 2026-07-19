import React, { useState } from 'react';
import { motion } from 'framer-motion';

const programs = [
  "Temel Sanat Eğitimi",
  "Desen Eğitimi",
  "İmgesel Tasarım",
  "Güzel Sanatlar Hazırlık",
  "Portfolyo Geliştirme"
];

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", program: programs[0], message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-32 px-6 lg:px-24 bg-[#1E1E1E]" id="iletisim">
      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-20">
        {/* Sol taraf - başlık ve bilgiler */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <span className="font-button text-[#C8A45D] uppercase tracking-[0.5em] text-[10px] block mb-6">
            Aramıza Katıl
          </span>
          <h2 className="font-title text-5xl lg:text-6xl leading-[1.1] text-white mb-8">
            Geleceğin sanatçısı
            <br />
            <span className="italic text-[#C8A45D]">senin hikâyen</span> olsun.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-md mb-12">
            Ön kayıt formunu doldurun, ekibimiz sizinle kısa süre içinde
            iletişime geçerek seviye tespiti ve program seçiminde
            yol göstersin.
          </p>

          <div className="space-y-6 border-t border-white/10 pt-10">
            <div className="flex items-center gap-4">
              <span className="text-[#C8A45D] font-button text-[10px] uppercase tracking-widest w-20 shrink-0">Telefon</span>
              <span className="text-white/70">+90 (5xx) xxx xx xx</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#C8A45D] font-button text-[10px] uppercase tracking-widest w-20 shrink-0">E-posta</span>
              <span className="text-white/70">info@eskizakademi.com</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#C8A45D] font-button text-[10px] uppercase tracking-widest w-20 shrink-0">Adres</span>
              <span className="text-white/70">Atölye, şehir merkezinde</span>
            </div>
          </div>
        </motion.div>

        {/* Sağ taraf - form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="bg-white/[0.03] border border-[#C8A45D]/15 rounded-2xl p-8 lg:p-12"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <span className="text-[#C8A45D] text-5xl mb-6">✓</span>
              <h3 className="font-title text-2xl text-white mb-3">Kaydınız alındı</h3>
              <p className="text-white/50 max-w-xs">
                Ekibimiz en kısa sürede sizinle iletişime geçecek.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/40 font-button text-[10px] uppercase tracking-widest mb-2">
                  Ad Soyad
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Adınız ve soyadınız"
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#C8A45D] outline-none text-white py-3 transition-colors placeholder:text-white/25"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/40 font-button text-[10px] uppercase tracking-widest mb-2">
                    Telefon
                  </label>
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="05xx xxx xx xx"
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#C8A45D] outline-none text-white py-3 transition-colors placeholder:text-white/25"
                  />
                </div>
                <div>
                  <label className="block text-white/40 font-button text-[10px] uppercase tracking-widest mb-2">
                    E-posta
                  </label>
                  <input
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="ornek@mail.com"
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#C8A45D] outline-none text-white py-3 transition-colors placeholder:text-white/25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/40 font-button text-[10px] uppercase tracking-widest mb-2">
                  İlgilendiğiniz Program
                </label>
                <select
                  name="program"
                  value={form.program}
                  onChange={handleChange}
                  className="w-full bg-[#1E1E1E] border-b border-white/15 focus:border-[#C8A45D] outline-none text-white py-3 transition-colors appearance-none"
                >
                  {programs.map((p) => (
                    <option key={p} value={p} className="bg-[#1E1E1E]">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/40 font-button text-[10px] uppercase tracking-widest mb-2">
                  Mesajınız (opsiyonel)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Eklemek istediğiniz bir şey var mı?"
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#C8A45D] outline-none text-white py-3 transition-colors placeholder:text-white/25 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#C8A45D] text-[#1E1E1E] font-button uppercase tracking-widest text-xs py-4 rounded-lg mt-4 transition-colors hover:bg-[#F5F3EE]"
              >
                Ön Kayıt Oluştur
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
