import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Instagram, Phone, MessageCircle, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Ad Soyad gerekli"),
  phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  program: z.string().min(1, "Lütfen bir program seçin"),
  message: z.string().min(5, "Mesajınız çok kısa")
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="iletisim" className="py-24 md:py-32 bg-eskiz-dark relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-eskiz-light">İletişim</h2>
          <div className="w-24 h-1 bg-eskiz-gold mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-serif text-eskiz-light mb-6">Bize Ulaşın</h3>
              <p className="text-eskiz-light/70 font-sans font-light leading-relaxed mb-8 max-w-md">
                Atölyemizi ziyaret edip tanışma dersimize katılmak veya programlar hakkında bilgi almak için iletişime geçebilirsiniz.
              </p>
            </div>

            <div className="space-y-6">
              <a href="tel:05074736314" className="flex items-center gap-4 text-eskiz-light hover:text-eskiz-gold transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-eskiz-gold transition-colors">
                  <Phone size={20} className="text-eskiz-gold" />
                </div>
                <span className="font-manrope text-lg tracking-wide">0507 473 63 14</span>
              </a>
              
              <a href="tel:02242538121" className="flex items-center gap-4 text-eskiz-light hover:text-eskiz-gold transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-eskiz-gold transition-colors">
                  <Phone size={20} className="text-eskiz-gold" />
                </div>
                <span className="font-manrope text-lg tracking-wide">0224 253 81 21</span>
              </a>

              <a href="https://wa.me/905074736314" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-eskiz-light hover:text-eskiz-gold transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-eskiz-gold transition-colors bg-[#25D366]/10">
                  <MessageCircle size={20} className="text-[#25D366]" />
                </div>
                <span className="font-manrope text-lg tracking-wide">WhatsApp'tan Yazın</span>
              </a>

              <a href="https://instagram.com/eskizakademi" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-eskiz-light hover:text-eskiz-gold transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-eskiz-gold transition-colors">
                  <Instagram size={20} className="text-eskiz-gold" />
                </div>
                <span className="font-manrope text-lg tracking-wide">@eskizakademi</span>
              </a>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-eskiz-card p-8 md:p-10 rounded-2xl border border-white/5"
          >
            <h3 className="text-2xl font-serif text-eskiz-light mb-8">Bilgi Alın</h3>
            
            {isSuccess ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-serif text-eskiz-light mb-2">Mesajınız Alındı</h4>
                <p className="text-eskiz-light/60 font-sans">En kısa sürede size dönüş yapacağız.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Ad Soyad"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-eskiz-light focus:outline-none focus:border-eskiz-gold transition-colors placeholder:text-white/30 font-sans"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <input
                    {...register("phone")}
                    placeholder="Telefon Numarası"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-eskiz-light focus:outline-none focus:border-eskiz-gold transition-colors placeholder:text-white/30 font-sans"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <select
                    {...register("program")}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-eskiz-light focus:outline-none focus:border-eskiz-gold transition-colors font-sans appearance-none"
                  >
                    <option value="" className="bg-eskiz-card">İlgilendiğiniz Program</option>
                    <option value="hazirlik" className="bg-eskiz-card">Güzel Sanatlar Hazırlık</option>
                    <option value="imgesel" className="bg-eskiz-card">İmgesel Desen</option>
                    <option value="portfolyo" className="bg-eskiz-card">Portfolyo Hazırlık</option>
                    <option value="diger" className="bg-eskiz-card">Diğer</option>
                  </select>
                  {errors.program && <p className="text-red-400 text-xs mt-1">{errors.program.message}</p>}
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Mesajınız"
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-eskiz-light focus:outline-none focus:border-eskiz-gold transition-colors placeholder:text-white/30 font-sans resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-eskiz-gold text-eskiz-dark py-4 rounded-full font-manrope font-bold tracking-wider hover:bg-white transition-colors disabled:opacity-50 mt-4"
                >
                  {isSubmitting ? "GÖNDERİLİYOR..." : "GÖNDER"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
