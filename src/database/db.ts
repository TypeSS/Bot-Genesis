import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import Database from "better-sqlite3";

const dbPath = join(process.cwd(), "data/bot.db");

mkdirSync(dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS user_xp (
    guild_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    text_xp INTEGER NOT NULL DEFAULT 0,
    voice_xp INTEGER NOT NULL DEFAULT 0,
    updated_at INTEGER NOT NULL,
    PRIMARY KEY (guild_id, user_id)
  )
`);
