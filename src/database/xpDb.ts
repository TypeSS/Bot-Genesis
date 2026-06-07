import { db } from "./db";
import type { UserXp, XpSource } from "../types/xp";

type UserXpRow = {
  text_xp: number;
  voice_xp: number;
};

const getUserXpStatement = db.prepare(`
  SELECT text_xp, voice_xp
  FROM user_xp
  WHERE guild_id = ? AND user_id = ?
`);

const createUserXpStatement = db.prepare(`
  INSERT OR IGNORE INTO user_xp (guild_id, user_id, text_xp, voice_xp, updated_at)
  VALUES (?, ?, 0, 0, ?)
`);

const addTextXpStatement = db.prepare(`
  UPDATE user_xp
  SET text_xp = text_xp + ?, updated_at = ?
  WHERE guild_id = ? AND user_id = ?
`);

const addVoiceXpStatement = db.prepare(`
  UPDATE user_xp
  SET voice_xp = voice_xp + ?, updated_at = ?
  WHERE guild_id = ? AND user_id = ?
`);

function getUserXp(guildId: string, userId: string): UserXp {
  const row = getUserXpStatement.get(guildId, userId) as UserXpRow | undefined;

  return {
    textXp: row?.text_xp ?? 0,
    voiceXp: row?.voice_xp ?? 0,
  };
}

function addXp(guildId: string, userId: string, amount: number, source: XpSource): UserXp {
  createUserXpStatement.run(guildId, userId, Date.now());

  if (source === "text") {
    addTextXpStatement.run(amount, Date.now(), guildId, userId);
  } else {
    addVoiceXpStatement.run(amount, Date.now(), guildId, userId);
  }

  return getUserXp(guildId, userId);
}

export const xpDb = {
  getUserXp,
  addXp,
};
