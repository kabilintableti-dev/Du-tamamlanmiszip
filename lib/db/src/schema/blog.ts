import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'hazirlik' | 'cizim' | 'basari' | 'haberler'
  coverImage: text("cover_image"),
  author: text("author").notNull().default("Eskiz Akademi"),
  readingTime: text("reading_time").default("5 dk"),
  published: boolean("published").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectBlogPostSchema = createSelectSchema(blogPostsTable);

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;

export const BLOG_CATEGORIES = [
  { value: "hazirlik", label: "Güzel Sanatlar Hazırlık" },
  { value: "cizim", label: "Çizim Teknikleri" },
  { value: "basari", label: "Öğrenci Başarıları" },
  { value: "haberler", label: "Akademi Haberleri" },
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number]["value"];
