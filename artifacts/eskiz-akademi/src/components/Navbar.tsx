import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Eğitimler', href: '/#egitimler' },
    { label: 'Galeri', href: '/#galeri' },
    { label: 'Etkinlikler', href: '/#etkinlikler' },
    { label: 'Blog', href: '/blog' },
    { label: 'Hakkımızda', href: '/#hakkimizda' },
    { label: 'İletişim', href: '/#iletisim' },
  ];

  return (
    <>
      <header
        className={`fixed top-[32px] w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-md bg-black/60 border-b border-eskiz-gold/30 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="font-serif italic text-2xl text-eskiz-gold">
            Eskiz Akademi
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/#') || link.href === '/' ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-manrope tracking-wider hover:text-eskiz-gold transition-colors text-eskiz-light/80"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-manrope tracking-wider hover:text-eskiz-gold transition-colors text-eskiz-light/80"
                >
                  {link.label}
                </Link>
              )
            ))}
            <a
              href="https://wa.me/905074736314"
              target="_blank"
              rel="noreferrer"
              className="bg-eskiz-gold text-eskiz-dark px-5 py-2 rounded-full font-manrope text-sm font-bold tracking-wide hover:scale-105 hover:shadow-[0_0_15px_rgba(199,163,93,0.4)] transition-all"
            >
              WhatsApp
            </a>
          </nav>

          <button
            className="md:hidden text-eskiz-light"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-eskiz-dark flex flex-col items-center justify-center p-6"
          >
            <button
              className="absolute top-8 right-6 text-eskiz-light p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                link.href.startsWith('/#') || link.href === '/' ? (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl font-serif text-eskiz-light hover:text-eskiz-gold transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-serif text-eskiz-light hover:text-eskiz-gold transition-colors"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="block"
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                )
              ))}
              <motion.a
                href="https://wa.me/905074736314"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8 bg-eskiz-gold text-eskiz-dark px-8 py-4 rounded-full font-manrope text-lg font-bold tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                WhatsApp İletişim
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
