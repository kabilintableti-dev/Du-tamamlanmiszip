import { Router } from "express";
import pg from "pg";
import { logger } from "../lib/logger";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const blogRouter = Router();

// GET /api/blog/posts — list all published posts, optionally filter by category
blogRouter.get("/blog/posts", async (req, res) => {
  try {
    const { category, limit = "20", offset = "0" } = req.query as Record<string, string>;
    let query = "SELECT * FROM blog_posts WHERE published = true";
    const params: (string | number)[] = [];
    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await pool.query(query, params);

    // Count total
    let countQuery = "SELECT COUNT(*) FROM blog_posts WHERE published = true";
    const countParams: string[] = [];
    if (category) {
      countParams.push(category);
      countQuery += ` AND category = $1`;
    }
    const countResult = await pool.query(countQuery, countParams);

    res.json({
      posts: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (err) {
    logger.error({ err }, "Failed to fetch blog posts");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/blog/posts/:slug — single post by slug
blogRouter.get("/blog/posts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "SELECT * FROM blog_posts WHERE slug = $1 AND published = true",
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    logger.error({ err }, "Failed to fetch blog post");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/blog/posts/admin/all — admin: all posts including unpublished
blogRouter.get("/blog/admin/all", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts ORDER BY created_at DESC"
    );
    res.json({ posts: result.rows });
  } catch (err) {
    logger.error({ err }, "Failed to fetch all blog posts");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/blog/posts — create a new post
blogRouter.post("/blog/posts", async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, cover_image, author, reading_time, published } = req.body;
    if (!title || !slug || !excerpt || !content || !category) {
      return res.status(400).json({ error: "title, slug, excerpt, content, category are required" });
    }
    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, category, cover_image, author, reading_time, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, slug, excerpt, content, category, cover_image ?? null, author ?? "Eskiz Akademi", reading_time ?? "5 dk", published ?? true]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Slug already exists" });
    }
    logger.error({ err }, "Failed to create blog post");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/blog/posts/:slug — update a post
blogRouter.put("/blog/posts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, excerpt, content, category, cover_image, author, reading_time, published } = req.body;
    const result = await pool.query(
      `UPDATE blog_posts 
       SET title = COALESCE($1, title),
           excerpt = COALESCE($2, excerpt),
           content = COALESCE($3, content),
           category = COALESCE($4, category),
           cover_image = COALESCE($5, cover_image),
           author = COALESCE($6, author),
           reading_time = COALESCE($7, reading_time),
           published = COALESCE($8, published),
           updated_at = NOW()
       WHERE slug = $9
       RETURNING *`,
      [title, excerpt, content, category, cover_image, author, reading_time, published, slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    logger.error({ err }, "Failed to update blog post");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/blog/posts/:slug — delete a post
blogRouter.delete("/blog/posts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "DELETE FROM blog_posts WHERE slug = $1 RETURNING id",
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ deleted: true });
  } catch (err) {
    logger.error({ err }, "Failed to delete blog post");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default blogRouter;
