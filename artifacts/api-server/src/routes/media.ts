import { Router } from "express";
import pg from "pg";
import { logger } from "../lib/logger";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const mediaRouter = Router();

function checkAdminPassword(req: any, res: any): boolean {
  const provided = req.header("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    // Panel şifresi henüz ayarlanmamış - güvenlik için yazma işlemlerini engelle.
    res.status(503).json({ error: "Admin password not configured on server" });
    return false;
  }
  if (provided !== expected) {
    res.status(401).json({ error: "Invalid admin password" });
    return false;
  }
  return true;
}

// POST /api/admin/login — verify the admin password
mediaRouter.post("/admin/login", (req, res) => {
  const { password } = req.body ?? {};
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(503).json({ error: "Admin password not configured on server" });
  }
  if (password !== expected) {
    return res.status(401).json({ error: "Invalid password" });
  }
  res.json({ ok: true });
});

// GET /api/media?category=xxx — list media items, optionally filtered by category
mediaRouter.get("/media", async (req, res) => {
  try {
    const { category } = req.query as Record<string, string>;
    let query = "SELECT * FROM media_items";
    const params: string[] = [];
    if (category) {
      params.push(category);
      query += " WHERE category = $1";
    }
    query += " ORDER BY sort_order ASC, created_at ASC";
    const result = await pool.query(query, params);
    res.json({ items: result.rows });
  } catch (err) {
    logger.error({ err }, "Failed to fetch media items");
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/media — add a new media item (admin only)
mediaRouter.post("/media", async (req, res) => {
  if (!checkAdminPassword(req, res)) return;
  try {
    const { category, image_data, caption, sort_order } = req.body;
    if (!category || !image_data) {
      return res.status(400).json({ error: "category and image_data are required" });
    }
    const result = await pool.query(
      `INSERT INTO media_items (category, image_data, caption, sort_order)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [category, image_data, caption ?? null, sort_order ?? 0],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error({ err }, "Failed to create media item");
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/media/:id — remove a media item (admin only)
mediaRouter.delete("/media/:id", async (req, res) => {
  if (!checkAdminPassword(req, res)) return;
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM media_items WHERE id = $1 RETURNING id",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json({ deleted: true });
  } catch (err) {
    logger.error({ err }, "Failed to delete media item");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default mediaRouter;
