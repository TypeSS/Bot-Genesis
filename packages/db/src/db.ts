import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "better-sqlite3";
import type { Database as DB } from "better-sqlite3";

const dbPath = "data/bot.db";

console.log(`Database path: ${dbPath}`);

mkdirSync(dirname(dbPath), { recursive: true });

export const db: DB = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS user_xp (
    guild_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    text_xp INTEGER NOT NULL DEFAULT 0,
    voice_xp INTEGER NOT NULL DEFAULT 0,
    has_leveled_up BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at INTEGER NOT NULL,
    PRIMARY KEY (guild_id, user_id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS level_roles (
    guild_id TEXT NOT NULL,
    level INTEGER NOT NULL,
    role_id TEXT NOT NULL,
    PRIMARY KEY (guild_id, level)
  )
`);
