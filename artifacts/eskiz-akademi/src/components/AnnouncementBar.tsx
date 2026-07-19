import React from 'react';

export function AnnouncementBar() {
  const items = [
    "🎨 Kayıtlar Başladı",
    "2027 Güzel Sanatlar Hazırlık",
    "İmgesel Desen Atölyesi",
    "Ücretsiz Tanışma Dersi",
    "Sınav Odaklı Eğitim",
    "Birebir Takip"
  ];

  const duplicatedItems = [...items, ...items, ...items, ...items]; // Sufficient duplication for smooth infinite scroll

  return (
    <div className="bg-[#1A1500] border-b border-eskiz-gold/20 text-eskiz-gold overflow-hidden whitespace-nowrap py-2 relative z-50">
      <div className="flex w-max ticker-content font-manrope text-xs tracking-widest uppercase font-medium">
        {duplicatedItems.map((item, i) => (
          <React.Fragment key={i}>
            <span className="px-8">{item}</span>
            <span className="opacity-50">·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
