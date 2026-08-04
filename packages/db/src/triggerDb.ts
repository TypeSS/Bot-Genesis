import { db } from "./db";

type TriggerRow = {
  guild_id: string;
  trigger_id: string;
  trigger_content: string;
  allowed_roles: string;
};

function getTriggerById(guild_id: string, trigger_id: string) {
  const getTriggerByIdStatement = db.prepare(`
    SELECT *
    FROM triggers
    WHERE guild_id = ? AND trigger_id = ?
  `);

  return getTriggerByIdStatement.get(guild_id, trigger_id);
}

function addTrigger(
  guild_id: string,
  trigger_id: string,
  trigger_content: string,
  allowed_roles: string | null,
) {
  const addTriggerStatement = db.prepare(`
    INSERT INTO triggers (guild_id, trigger_id, trigger_content, allowed_roles)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(guild_id, trigger_id) DO UPDATE SET
      trigger_content = excluded.trigger_content,
      allowed_roles = excluded.allowed_roles
  `);

  addTriggerStatement.run(guild_id, trigger_id, trigger_content, allowed_roles);
}

function deleteTrigger(guild_id: string, trigger_id: string) {
  const deleteTriggerStatement = db.prepare(`
    DELETE FROM triggers
    WHERE guild_id = ? AND trigger_id = ?
  `);

  deleteTriggerStatement.run(guild_id, trigger_id);
}

function getAllTriggers(guild_id: string): TriggerRow[] {
  const getAllTriggersStatement = db.prepare(`
    SELECT *
    FROM triggers
    WHERE guild_id = ?
  `);

  const triggers = getAllTriggersStatement.all(guild_id) as TriggerRow[];

  console.log(triggers);

  return triggers;
}

export const triggerDb = {
  getTriggerById,
  addTrigger,
  deleteTrigger,
  getAllTriggers,
};
