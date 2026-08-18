import { db } from "./db";

type StarboardPostRow = {
  guild_id: string;
  message_id: string;
  starboard_message_id: string;
  last_star_count: number;
};

const getPostStatement = db.prepare(`
  SELECT guild_id, message_id, starboard_message_id, last_star_count
  FROM starboard_posts
  WHERE guild_id = ? AND message_id = ?
`);

const addPostStatement = db.prepare(`
  INSERT INTO starboard_posts (guild_id, message_id, starboard_message_id, last_star_count)
  VALUES (?, ?, ?, ?)
  ON CONFLICT(guild_id, message_id) DO UPDATE SET
    starboard_message_id = excluded.starboard_message_id,
    last_star_count = excluded.last_star_count
`);

function getPost(guild_id: string, message_id: string): StarboardPostRow | undefined {
  return getPostStatement.get(guild_id, message_id) as StarboardPostRow | undefined;
}

function addPost(guild_id: string, message_id: string, starboard_message_id: string, star_count: number) {
  addPostStatement.run(guild_id, message_id, starboard_message_id, star_count);
}

export const starboardDb = {
  getPost,
  addPost,
};