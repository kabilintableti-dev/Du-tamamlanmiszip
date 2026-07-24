import { Router } from "express";
import pg from "pg";
import { logger } from "../lib/logger";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const textsRouter = Router();

function checkAdminPassword(req: any, res: any): boolean {
  const provided = req.header("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res.status(503).json({ error: "Admin password not configured on server" });
    return false;
  }
  if (provided !== expected) {
    res.status(401).json({ error: "Invalid admin password" });
    return false;
  }
  return true;
}

// GET /api/texts — return all overridden texts as a { key: value } map
textsRouter.get("/texts", async (req, res) => {
  try {
    const result = await pool.query("SELECT key, value FROM site_texts");
    const texts: Record<string, string> = {};
    for (const row of result.rows) {
      texts[row.key] = row.value;
    }
    res.json({ texts });
  } catch (err) {
    logger.error({ err }, "Failed to fetch site texts");
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/texts/:key — set/update one text value (admin only)
textsRouter.put("/texts/:key", async (req, res) => {
  if (!checkAdminPassword(req, res)) return;
  try {
    const { key } = req.params;
    const { value } = req.body;
    if (typeof value !== "string") {
      return res.status(400).json({ error: "value (string) is required" });
    }
    const result = await pool.query(
      `INSERT INTO site_texts (key, value, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()
       RETURNING *`,
      [key, value],
    );
    res.json(result.rows[0]);
  } catch (err) {
    logger.error({ err }, "Failed to update site text");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default textsRouter;
