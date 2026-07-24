import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const mediaItemsTable = pgTable("media_items", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'atolye' | 'ogrenci-calismalari' | 'etkinlik' | 'egitmen'
  imageData: text("image_data").notNull(), // base64 data URL (data:image/...;base64,...)
  caption: text("caption"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMediaItemSchema = createInsertSchema(mediaItemsTable).omit({
  id: true,
  createdAt: true,
});

export const selectMediaItemSchema = createSelectSchema(mediaItemsTable);

export type InsertMediaItem = z.infer<typeof insertMediaItemSchema>;
export type MediaItem = typeof mediaItemsTable.$inferSelect;

export const MEDIA_CATEGORIES = [
  { value: "atolye", label: "Atölye" },
  { value: "ogrenci-calismalari", label: "Öğrenci Çalışmaları" },
  { value: "etkinlik", label: "Etkinlik" },
  { value: "egitmen", label: "Eğitmenler" },
] as const;

export type MediaCategory = (typeof MEDIA_CATEGORIES)[number]["value"];
