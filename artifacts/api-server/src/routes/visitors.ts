import { Router, type IRouter } from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const router: IRouter = Router();

const DATA_DIR = join(process.cwd(), "data");
const COUNTER_FILE = join(DATA_DIR, "visitors.json");

function getCount(): number {
  try {
    if (!existsSync(COUNTER_FILE)) return 0;
    const raw = readFileSync(COUNTER_FILE, "utf-8");
    return JSON.parse(raw).count ?? 0;
  } catch {
    return 0;
  }
}

function saveCount(count: number): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(COUNTER_FILE, JSON.stringify({ count }), "utf-8");
}

router.post("/visitors/hit", (req, res) => {
  const count = getCount() + 1;
  saveCount(count);
  res.json({ count });
});

router.get("/visitors", (req, res) => {
  res.json({ count: getCount() });
});

export default router;
