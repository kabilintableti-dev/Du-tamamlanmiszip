import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const siteTextsTable = pgTable("site_texts", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSiteTextSchema = createInsertSchema(siteTextsTable).omit({
  updatedAt: true,
});

export const selectSiteTextSchema = createSelectSchema(siteTextsTable);

export type InsertSiteText = z.infer<typeof insertSiteTextSchema>;
export type SiteText = typeof siteTextsTable.$inferSelect;

// Panelde düzenlenebilir olarak gösterilecek metinler ve varsayılan (kod
// içindeki) değerleri. Yeni bir metni düzenlenebilir yapmak için:
// 1) İlgili bileşende metni buradaki bir key ile useSiteText() üzerinden çekecek şekilde değiştir
// 2) Bu listeye ekle.
export const SITE_TEXT_FIELDS = [
  { key: "hero_eyebrow", label: "Hero — Üst küçük yazı", default: "Güzel Sanatlar Fakültesi Hazırlık" },
  { key: "hero_heading", label: "Hero — Ana başlık", default: "Sanatın Geleceğini Tasarla" },
  { key: "hero_subtext_1", label: "Hero — Alt yazı (1. satır)", default: "İstanbul'un en seçkin güzel sanatlar hazırlık akademisinde" },
  { key: "hero_subtext_2", label: "Hero — Alt yazı (2. satır)", default: "yeteneğini keşfet, geleceğini inşa et." },
] as const;

export type SiteTextKey = (typeof SITE_TEXT_FIELDS)[number]["key"];
