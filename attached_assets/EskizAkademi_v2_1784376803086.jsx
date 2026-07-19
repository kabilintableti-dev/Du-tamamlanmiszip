import { useState, useEffect, useRef } from "react";

// ============================================================
//  CONFIG — Sadece burası değiştirmek yeterli
// ============================================================
const config = {
  whatsapp:     "905XXXXXXXXX",       // Başında 90, boşluksuz
  instagram:    "eskizakademi",        // @ olmadan
  email:        "info@eskizakademi.com",
  accentColor:  "#C8973F",            // Altın/terracotta. "#B5860D" hardal, "#C47B3E" bakır
  darkColor:    "#0E0C09",
  lightBg:      "#FAF8F4",
  cream:        "#F0E9DC",
  gold:         "#C8973F",
};

// ============================================================
//  CONTENT — Tüm metinler burada
// ============================================================
const content = {
  nav: ["Anasayfa","Hakkımızda","Eğitmen","Kurslar","Galeri","İletişim"],

  hero: {
    eyebrow: "Sanat Eğitiminde 10 Yıl",
    title:   "Çizginin\nArdında\nBir Dünya Var.",
    sub:     "Eskiz, suluboya ve yağlıboya üzerine\nkişisel atölye eğitimleri — İstanbul.",
    cta:     "Kursa Başla",
    ctaSub:  "Programları Keşfet",
  },

  about: {
    eyebrow: "Hakkımızda",
    title:   "Küçük Gruplar,\nBüyük Sanat.",
    body:    "2014'ten bu yana İstanbul'da, en fazla 8 kişilik gruplarla birebir eğitim anlayışıyla sanat öğreticiliği yapıyoruz. Her öğrencinin kendi sesini bulmasına destek oluyoruz — temel çizim becerilerinden ileri düzey atölye çalışmalarına kadar.",
    stats: [
      { val:"10+",  label:"Yıl Deneyim" },
      { val:"200+", label:"Mezun Öğrenci" },
      { val:"8",    label:"Kişilik Max Grup" },
    ],
  },

  instructor: {
    eyebrow:     "Eğitmen",
    name:        "Ayşe Kaya",
    title:       "Kurucu & Baş Eğitmen",
    bio:         "Mimar Sinan Güzel Sanatlar Üniversitesi Resim Bölümü mezunu. 10 yılı aşkın eğitim deneyimi ve çok sayıda solo sergi geçmişiyle öğrencilerine hem teknik hem de sanatsal bir bakış açısı sunuyor.",
    specialties: ["Eskiz & Çizim","Suluboya","Yağlıboya","Portré","Peyzaj"],
    // Kendi fotoğrafınla değiştir:
    photo:       "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=85",
  },

  courses: [
    { title:"Temel Çizim",        level:"Başlangıç", duration:"8 Hafta",  desc:"Perspektif, oran ve gölgelendirme. Hiç deneyim gerekmez." },
    { title:"Suluboya Atölyesi",  level:"Orta",      duration:"10 Hafta", desc:"Renk teorisi ve katman teknikleriyle sulu boya dilini keşfet." },
    { title:"Portré & Figür",     level:"İleri",     duration:"12 Hafta", desc:"İnsan figürünü doğru, ekspresif ve özgün biçimde çizme." },
    { title:"Yağlıboya Başlangıç",level:"Başlangıç", duration:"8 Hafta",  desc:"Tuval hazırlığından son kat verniğe, yağlıboyanın temelleri." },
  ],

  // Galeri: url, alt, öğrenci adı, kategori, okul
  // Kendi görsellerinle değiştir — dilediğin kadar ekleyebilirsin
  gallery: [
    { url:"https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=85", alt:"Karakalem",  student:"Zeynep Yılmaz",  cat:"Desen / Karakalem",  school:"Mimar Sinan GSF Hazırlık" },
    { url:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=85", alt:"Suluboya",   student:"Berk Arslan",    cat:"Suluboya",           school:"İTÜ Mimarlık Hazırlık" },
    { url:"https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&q=85", alt:"Portré",     student:"Deniz Kara",     cat:"Portré / Figür",     school:"Güzel Sanatlar Lisesi" },
    { url:"https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=85", alt:"Eskiz",      student:"Selin Çelik",    cat:"Eskiz",              school:"Mimar Sinan GSF Hazırlık" },
    { url:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=85", alt:"Yağlıboya",  student:"Ali Demir",      cat:"Yağlıboya",          school:"YTÜ Mimarlık Hazırlık" },
    { url:"https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=85", alt:"Kompozisyon",student:"Mert Doğan",     cat:"Kompozisyon",        school:"Güzel Sanatlar Lisesi" },
  ],

  contact: {
    eyebrow: "İletişim",
    title:   "Atölyeye Katıl",
    sub:     "Bir adım at — WhatsApp'tan bize ulaş\nveya formu doldur.",
    address: "Kadıköy, İstanbul",
    phone:   "+90 5XX XXX XX XX",
  },

  footer: {
    tagline: "Her çizgi bir başlangıçtır.",
  },
};

// ============================================================
//  DERIVED
// ============================================================
const WA  = `https://wa.me/${config.whatsapp}`;
const IGU = `https://instagram.com/${config.instagram}`;

// ============================================================
//  HOOKS
// ============================================================
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, vis];
}

function useScrolled(threshold = 50) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > threshold);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return s;
}

// ============================================================
//  ICONS
// ============================================================
const IcoWA = ({ s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.118 1.531 5.845L.057 23.887l6.194-1.447A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.887 9.887 0 01-5.031-1.376l-.361-.214-3.741.981.999-3.647-.235-.374A9.862 9.862 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
  </svg>
);
const IcoIG = ({ s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

// ============================================================
//  SHARED STYLES
// ============================================================
const fade = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? "translateY(0)" : "translateY(32px)",
  transition: `opacity 0.75s ${delay}s ease, transform 0.75s ${delay}s ease`,
});

const Eyebrow = ({ text }) => (
  <p style={{ fontFamily:"system-ui", fontSize:10, letterSpacing:"0.3em", color:config.gold, textTransform:"uppercase", margin:"0 0 18px", fontWeight:700 }}>
    — {text}
  </p>
);

// ============================================================
//  NAVBAR
// ============================================================
function Navbar() {
  const scrolled = useScrolled(50);
  const [open, setOpen] = useState(false);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setOpen(false); };

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      background: scrolled ? "rgba(14,12,9,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(200,151,63,0.15)" : "none",
      transition:"all 0.35s ease",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 5vw", display:"flex", alignItems:"center", justifyContent:"space-between", height:70 }}>
        <div onClick={() => go("anasayfa")} style={{ cursor:"pointer" }}>
          <div style={{ fontFamily:"'Georgia','Times New Roman',serif", fontSize:21, fontWeight:700, color:config.lightBg, lineHeight:1, letterSpacing:"-0.3px" }}>Eskiz</div>
          <div style={{ fontFamily:"system-ui", fontSize:9, letterSpacing:"0.25em", color:config.gold, textTransform:"uppercase" }}>Akademi</div>
        </div>

        <div style={{ display:"flex", gap:32 }} className="ea-desk-nav">
          {content.nav.map(n => (
            <button key={n} onClick={() => go(n.toLowerCase())}
              style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"system-ui", fontSize:13, color:"rgba(250,248,244,0.75)", letterSpacing:"0.06em", padding:"4px 0", transition:"color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = config.gold}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(250,248,244,0.75)"}>
              {n}
            </button>
          ))}
        </div>

        <a href={WA} target="_blank" rel="noreferrer"
          style={{ display:"flex", alignItems:"center", gap:8, background:config.gold, color:"#fff", fontFamily:"system-ui", fontSize:13, fontWeight:700, letterSpacing:"0.06em", padding:"9px 18px", textDecoration:"none", transition:"opacity 0.2s" }}
          className="ea-desk-nav"
          onMouseEnter={e => e.currentTarget.style.opacity="0.82"}
          onMouseLeave={e => e.currentTarget.style.opacity="1"}>
          <IcoWA s={15} /> WhatsApp
        </a>

        <button onClick={() => setOpen(!open)} className="ea-mob-btn"
          style={{ background:"none", border:"none", cursor:"pointer", color:config.lightBg, fontSize:26, lineHeight:1, display:"none" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div style={{ background:config.darkColor, borderTop:"1px solid rgba(200,151,63,0.2)", padding:"12px 5vw 24px" }}>
          {content.nav.map(n => (
            <button key={n} onClick={() => go(n.toLowerCase())}
              style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", borderBottom:"1px solid rgba(255,255,255,0.06)", cursor:"pointer", fontFamily:"system-ui", fontSize:16, color:config.lightBg, padding:"14px 0" }}>
              {n}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============================================================
//  HERO
// ============================================================
function Hero() {
  return (
    <section id="anasayfa" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      background:config.darkColor,
      padding:"110px 5vw 80px",
      position:"relative", overflow:"hidden",
    }}>
      {/* Gradient orb */}
      <div style={{ position:"absolute", right:"-5vw", top:"5%", width:"55vw", height:"90vh", background:`radial-gradient(ellipse at 70% 40%, ${config.gold}1A 0%, transparent 65%)`, pointerEvents:"none" }} />
      {/* Vertical rule */}
      <div style={{ position:"absolute", left:"5vw", top:"15%", bottom:"15%", width:"1px", background:`linear-gradient(to bottom, transparent, ${config.gold}60, transparent)` }} />
      {/* Horizontal noise texture overlay */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22300%22 height=%22300%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E')", pointerEvents:"none" }} />

      <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", paddingLeft:"3vw", position:"relative" }}>
        <Eyebrow text={content.hero.eyebrow} />
        <h1 style={{
          fontFamily:"'Georgia','Times New Roman',serif",
          fontSize:"clamp(52px,9vw,112px)",
          fontWeight:700, lineHeight:1.0,
          color:config.lightBg,
          margin:"0 0 32px",
          letterSpacing:"-2px",
          whiteSpace:"pre-line",
        }}>
          {content.hero.title}
        </h1>
        <p style={{ fontFamily:"system-ui", fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(250,248,244,0.55)", lineHeight:1.7, maxWidth:400, marginBottom:52, whiteSpace:"pre-line" }}>
          {content.hero.sub}
        </p>
        <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          <a href={WA} target="_blank" rel="noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:9, background:config.gold, color:"#fff", fontFamily:"system-ui", fontSize:14, fontWeight:700, letterSpacing:"0.07em", padding:"15px 30px", textDecoration:"none", transition:"opacity 0.2s, transform 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.opacity="0.84"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
            <IcoWA s={16} /> {content.hero.cta}
          </a>
          <button onClick={() => document.getElementById("kurslar")?.scrollIntoView({ behavior:"smooth" })}
            style={{ display:"inline-flex", alignItems:"center", background:"transparent", color:config.lightBg, fontFamily:"system-ui", fontSize:14, fontWeight:500, letterSpacing:"0.06em", padding:"15px 30px", border:"1px solid rgba(250,248,244,0.25)", cursor:"pointer", transition:"border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor=config.gold}
            onMouseLeave={e => e.currentTarget.style.borderColor="rgba(250,248,244,0.25)"}>
            {content.hero.ctaSub}
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  ABOUT
// ============================================================
function About() {
  const [ref, vis] = useInView();
  return (
    <section id="hakkımızda" style={{ background:config.cream, padding:"104px 5vw" }}>
      <div ref={ref} style={{ maxWidth:1200, margin:"0 auto", ...fade(vis) }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px 80px", alignItems:"start" }} className="ea-about-grid">
          <div>
            <Eyebrow text={content.about.eyebrow} />
            <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(30px,4.5vw,56px)", fontWeight:700, color:config.darkColor, lineHeight:1.05, margin:"0 0 40px", letterSpacing:"-1px", whiteSpace:"pre-line" }}>
              {content.about.title}
            </h2>
            <div style={{ display:"flex", gap:40 }}>
              {content.about.stats.map(h => (
                <div key={h.val}>
                  <div style={{ fontFamily:"'Georgia',serif", fontSize:44, fontWeight:700, color:config.gold, lineHeight:1 }}>{h.val}</div>
                  <div style={{ fontFamily:"system-ui", fontSize:12, color:"rgba(14,12,9,0.45)", marginTop:6, letterSpacing:"0.08em", textTransform:"uppercase" }}>{h.label}</div>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontFamily:"system-ui", fontSize:18, color:"rgba(14,12,9,0.6)", lineHeight:1.8, margin:0, paddingTop:8 }}>
            {content.about.body}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  INSTRUCTOR
// ============================================================
function Instructor() {
  const [ref, vis] = useInView();
  return (
    <section id="eğitmen" style={{ background:config.darkColor, padding:"104px 5vw" }}>
      <div ref={ref} style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"380px 1fr", gap:80, alignItems:"center", ...fade(vis) }} className="ea-instr-grid">
        <div style={{ position:"relative" }}>
          <img src={content.instructor.photo} alt={content.instructor.name}
            style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", display:"block", filter:"saturate(0.8) contrast(1.06)" }} />
          {/* Gold corner accent */}
          <div style={{ position:"absolute", top:-14, right:-14, width:80, height:80, borderTop:`2px solid ${config.gold}`, borderRight:`2px solid ${config.gold}` }} />
          <div style={{ position:"absolute", bottom:-14, left:-14, width:80, height:80, borderBottom:`2px solid ${config.gold}`, borderLeft:`2px solid ${config.gold}` }} />
        </div>
        <div>
          <Eyebrow text={content.instructor.eyebrow} />
          <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:config.lightBg, margin:"0 0 6px", letterSpacing:"-0.5px" }}>
            {content.instructor.name}
          </h2>
          <p style={{ fontFamily:"system-ui", fontSize:13, color:config.gold, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:28 }}>
            {content.instructor.title}
          </p>
          <p style={{ fontFamily:"system-ui", fontSize:17, color:"rgba(250,248,244,0.6)", lineHeight:1.78, marginBottom:36 }}>
            {content.instructor.bio}
          </p>
          <div>
            <p style={{ fontFamily:"system-ui", fontSize:10, letterSpacing:"0.2em", color:"rgba(250,248,244,0.3)", textTransform:"uppercase", marginBottom:14 }}>Uzmanlık Alanları</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {content.instructor.specialties.map(s => (
                <span key={s} style={{ fontFamily:"system-ui", fontSize:13, color:config.lightBg, border:"1px solid rgba(250,248,244,0.2)", padding:"6px 16px", letterSpacing:"0.04em" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  COURSES
// ============================================================
function Courses() {
  const [ref, vis] = useInView();
  const lvlCol = { "Başlangıç":"#4a8c5c", "Orta":config.gold, "İleri":"#9b3a3a" };

  return (
    <section id="kurslar" style={{ background:config.lightBg, padding:"104px 5vw" }}>
      <div ref={ref} style={{ maxWidth:1200, margin:"0 auto", ...fade(vis) }}>
        <Eyebrow text="Kurslar & Programlar" />
        <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:config.darkColor, margin:"0 0 64px", letterSpacing:"-0.5px" }}>
          Ne Öğrenmek İstiyorsun?
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:2 }}>
          {content.courses.map((c,i) => (
            <div key={i}
              style={{ padding:"36px 32px", background:config.cream, borderTop:`3px solid ${lvlCol[c.level]||config.gold}`, transition:"transform 0.25s, box-shadow 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 20px 48px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <span style={{ display:"inline-block", fontFamily:"system-ui", fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:lvlCol[c.level]||config.gold, marginBottom:18 }}>
                {c.level} · {c.duration}
              </span>
              <h3 style={{ fontFamily:"'Georgia',serif", fontSize:24, color:config.darkColor, fontWeight:700, margin:"0 0 12px" }}>{c.title}</h3>
              <p style={{ fontFamily:"system-ui", fontSize:15, color:"rgba(14,12,9,0.55)", lineHeight:1.7, margin:0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  GALLERY — Masonry (CSS columns, sıfır bağımlılık)
// ============================================================
function Gallery() {
  const [ref, vis] = useInView(0.05);
  const [lb, setLb] = useState(null);

  return (
    <section id="galeri" style={{ background:config.darkColor, padding:"104px 5vw" }}>
      <div ref={ref} style={{ maxWidth:1400, margin:"0 auto", ...fade(vis) }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <p style={{ fontFamily:"system-ui", fontSize:10, letterSpacing:"0.3em", color:config.gold, textTransform:"uppercase", marginBottom:14, fontWeight:700 }}>
            — Masterpiece
          </p>
          <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(30px,5vw,60px)", fontWeight:700, color:config.lightBg, margin:0, letterSpacing:"-1px" }}>
            Öğrenci <em style={{ fontStyle:"italic", color:config.gold }}>Çalışmaları</em>
          </h2>
        </div>

        {/* Masonry via CSS columns */}
        <div style={{ columns:"3 280px", columnGap:16 }}>
          {content.gallery.map((img, i) => (
            <GalleryCard key={i} img={img} i={i} onClick={() => setLb(img)} delay={i * 0.08} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lb && (
        <div onClick={() => setLb(null)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
          <button onClick={() => setLb(null)}
            style={{ position:"absolute", top:20, right:24, background:"none", border:"none", color:"#fff", fontSize:30, cursor:"pointer", lineHeight:1 }}>✕</button>
          <img src={lb.url} alt={lb.alt} style={{ maxWidth:"88vw", maxHeight:"88vh", objectFit:"contain" }} />
          <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
            <p style={{ fontFamily:"system-ui", fontSize:11, letterSpacing:"0.2em", color:config.gold, textTransform:"uppercase", margin:"0 0 6px" }}>{lb.cat}</p>
            <p style={{ fontFamily:"'Georgia',serif", fontSize:20, color:"#fff", margin:0 }}>{lb.student}</p>
            <p style={{ fontFamily:"system-ui", fontSize:12, color:"rgba(255,255,255,0.4)", margin:"4px 0 0" }}>{lb.school}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryCard({ img, i, onClick, delay }) {
  const [hov, setHov] = useState(false);
  const [ref, vis] = useInView(0.05);

  return (
    <div ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        breakInside:"avoid", marginBottom:16,
        position:"relative", overflow:"hidden",
        cursor:"pointer", borderRadius:4,
        ...fade(vis, delay),
      }}>
      <img src={img.url} alt={img.alt}
        style={{ width:"100%", display:"block",
          transform: hov ? "scale(1.08)" : "scale(1)",
          filter: hov ? "saturate(1.05)" : "saturate(0.6)",
          transition:"transform 0.9s ease, filter 0.7s ease",
        }} />

      {/* Gold frame border on hover */}
      <div style={{
        position:"absolute", inset:0,
        border: hov ? `16px solid ${config.gold}18` : "0px solid transparent",
        transition:"border 0.6s ease",
        pointerEvents:"none",
      }} />

      {/* Info overlay */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to top, rgba(14,12,9,0.88) 0%, rgba(14,12,9,0.2) 50%, transparent 100%)",
        opacity: hov ? 1 : 0,
        transition:"opacity 0.45s ease",
        padding:"28px 24px",
        display:"flex", flexDirection:"column", justifyContent:"flex-end",
      }}>
        <p style={{ fontFamily:"system-ui", fontSize:10, letterSpacing:"0.2em", color:config.gold, textTransform:"uppercase", margin:"0 0 6px", fontWeight:700 }}>
          {img.cat}
        </p>
        <h4 style={{ fontFamily:"'Georgia',serif", fontSize:20, color:config.lightBg, margin:"0 0 4px", fontWeight:700 }}>
          {img.student}
        </h4>
        <p style={{ fontFamily:"system-ui", fontSize:12, color:"rgba(250,248,244,0.45)", margin:0 }}>
          {img.school}
        </p>
      </div>
    </div>
  );
}

// ============================================================
//  CONTACT
// ============================================================
function Contact() {
  const [ref, vis] = useInView();
  return (
    <section id="i̇letişim" style={{ background:config.cream, padding:"104px 5vw" }}>
      <div ref={ref} style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start", ...fade(vis) }} className="ea-contact-grid">
        <div>
          <Eyebrow text={content.contact.eyebrow} />
          <h2 style={{ fontFamily:"'Georgia',serif", fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:config.darkColor, margin:"0 0 20px", letterSpacing:"-0.5px" }}>
            {content.contact.title}
          </h2>
          <p style={{ fontFamily:"system-ui", fontSize:18, color:"rgba(14,12,9,0.55)", lineHeight:1.72, marginBottom:48, whiteSpace:"pre-line" }}>
            {content.contact.sub}
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
            {[
              { href:WA, icon:<IcoWA />, label:content.contact.phone, col:"#25D366" },
              { href:`mailto:${config.email}`, icon:"✉", label:config.email, col:config.gold },
              { href:"#", icon:"📍", label:content.contact.address, col:"" },
            ].map(({ href, icon, label, col }) => (
              <a key={label} href={href} style={{ display:"flex", alignItems:"center", gap:14, color:config.darkColor, textDecoration:"none", fontFamily:"system-ui", fontSize:16, transition:"color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color=config.gold}
                onMouseLeave={e => e.currentTarget.style.color=config.darkColor}>
                <span style={{ color:col||"inherit" }}>{icon}</span>{label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ background:config.darkColor, padding:48 }}>
          <h3 style={{ fontFamily:"'Georgia',serif", fontSize:24, color:config.lightBg, fontWeight:700, margin:"0 0 30px" }}>Mesaj Gönder</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {[["İsim Soyisim","text"],["E-posta","email"],["Telefon","tel"]].map(([l,t]) => (
              <div key={l}>
                <label style={{ display:"block", fontFamily:"system-ui", fontSize:10, letterSpacing:"0.15em", color:"rgba(250,248,244,0.35)", textTransform:"uppercase", marginBottom:6 }}>{l}</label>
                <input type={t} style={{ fontFamily:"system-ui", fontSize:15, border:"1px solid rgba(250,248,244,0.12)", background:"rgba(250,248,244,0.05)", color:config.lightBg, padding:"12px 14px", width:"100%", outline:"none", boxSizing:"border-box", transition:"border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor=config.gold}
                  onBlur={e => e.target.style.borderColor="rgba(250,248,244,0.12)"} />
              </div>
            ))}
            <div>
              <label style={{ display:"block", fontFamily:"system-ui", fontSize:10, letterSpacing:"0.15em", color:"rgba(250,248,244,0.35)", textTransform:"uppercase", marginBottom:6 }}>Mesaj</label>
              <textarea rows={4} style={{ fontFamily:"system-ui", fontSize:15, border:"1px solid rgba(250,248,244,0.12)", background:"rgba(250,248,244,0.05)", color:config.lightBg, padding:"12px 14px", width:"100%", outline:"none", resize:"vertical", boxSizing:"border-box", transition:"border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor=config.gold}
                onBlur={e => e.target.style.borderColor="rgba(250,248,244,0.12)"} />
            </div>
            <a href={`mailto:${config.email}`}
              style={{ display:"block", textAlign:"center", background:config.gold, color:"#fff", fontFamily:"system-ui", fontSize:14, fontWeight:700, letterSpacing:"0.08em", padding:"15px", textDecoration:"none", transition:"opacity 0.2s", marginTop:4 }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.84"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}>
              Gönder
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{ background:config.darkColor, padding:"48px 5vw", borderTop:`1px solid ${config.gold}20` }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
        <div>
          <div style={{ fontFamily:"'Georgia',serif", fontSize:19, color:config.lightBg, fontWeight:700 }}>Eskiz Akademi</div>
          <div style={{ fontFamily:"system-ui", fontSize:12, color:"rgba(250,248,244,0.3)", marginTop:5 }}>{content.footer.tagline}</div>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          {[
            { href:WA,  icon:<IcoWA />, label:"WhatsApp", hc:"#25D366" },
            { href:IGU, icon:<IcoIG />, label:"Instagram", hc:"#E1306C" },
          ].map(({ href, icon, label, hc }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", width:44, height:44, border:"1px solid rgba(250,248,244,0.15)", color:"rgba(250,248,244,0.4)", textDecoration:"none", transition:"color 0.2s, border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color=hc; e.currentTarget.style.borderColor=hc; e.currentTarget.style.transform="scale(1.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.color="rgba(250,248,244,0.4)"; e.currentTarget.style.borderColor="rgba(250,248,244,0.15)"; e.currentTarget.style.transform="scale(1)"; }}>
              {icon}
            </a>
          ))}
        </div>
        <p style={{ fontFamily:"system-ui", fontSize:12, color:"rgba(250,248,244,0.2)", margin:0 }}>© {new Date().getFullYear()} Eskiz Akademi</p>
      </div>
    </footer>
  );
}

// ============================================================
//  FLOATING BUTTONS
// ============================================================
function FloatingBtns() {
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:150, display:"flex", flexDirection:"column", gap:10 }}>
      {[
        { href:IGU, bg:"linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", icon:<IcoIG />, label:"Instagram" },
        { href:WA,  bg:"#25D366", icon:<IcoWA />, label:"WhatsApp" },
      ].map(({ href, bg, icon, label }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
          style={{ display:"flex", alignItems:"center", justifyContent:"center", width:50, height:50, borderRadius:"50%", background:bg, color:"#fff", textDecoration:"none", boxShadow:"0 4px 18px rgba(0,0,0,0.28)", transition:"transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.transform="scale(1.12)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 18px rgba(0,0,0,0.28)"; }}>
          {icon}
        </a>
      ))}
    </div>
  );
}

// ============================================================
//  APP
// ============================================================
export default function App() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${config.darkColor}; }
        .ea-desk-nav { display: flex !important; }
        .ea-mob-btn  { display: none !important; }
        @media(max-width:640px){
          .ea-desk-nav { display: none !important; }
          .ea-mob-btn  { display: block !important; }
        }
        .ea-about-grid   { grid-template-columns: 1fr 1fr; }
        .ea-instr-grid   { grid-template-columns: 380px 1fr; }
        .ea-contact-grid { grid-template-columns: 1fr 1fr; }
        @media(max-width:760px){
          .ea-about-grid   { grid-template-columns: 1fr !important; }
          .ea-instr-grid   { grid-template-columns: 1fr !important; }
          .ea-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Instructor />
      <Courses />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingBtns />
    </>
  );
}
