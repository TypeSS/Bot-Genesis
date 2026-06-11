import { db } from "./db";

type LevelRow = {
  role_id: string,
  level: number
}

const getRoleStatement = db.prepare(`
  SELECT role_id
  FROM level_roles
  WHERE guild_id = ? AND level <= ?
  ORDER BY level DESC
  LIMIT 1
`)

const addRoleStatement = db.prepare(`
  INSERT INTO level_roles (guild_id, level, role_id)
  VALUES (?, ?, ?)
`)

function getRoleByLevel(guild_id: string, level: number) {
  const row = getRoleStatement.get(guild_id, level) as LevelRow;
  return row?.role_id ?? null;
}

function addRole(guild_id: string, level: number, role_id: string) {
  addRoleStatement.run(guild_id, level, role_id);
}

function getLevelByRoles(guild_id: string, roleIds: string[]) {
  if (roleIds.length === 0) return null;

  const placeholder = roleIds.map(() => "?").join(",");

  const getLevelByRoleStatement = db.prepare(`
    SELECT level
    FROM level_roles
    WHERE guild_id = ?
      AND role_id in (${placeholder})
    ORDER BY level DESC
    LIMIT 1
  `)

  const row = getLevelByRoleStatement.get(guild_id, ...roleIds) as LevelRow;

  return row?.level ?? null;
}

export const levelDb = {
  getRoleByLevel,
  addRole,
  getLevelByRoles
}
