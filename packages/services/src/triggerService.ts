import { Trigger } from "@genesis/core";
import { triggerDb } from "@genesis/db";

export const triggerCache: Map<string, Map<string, Trigger>> = new Map();

type TriggerRow = {
  trigger_id: string;
  trigger_content: string;
  allowed_roles: string;
};

async function get(guild_id: string): Promise<Map<string, Trigger>> {
  const cached = triggerCache.get(guild_id);
  if (cached) {
    return cached;
  } else {
    const triggers = await getAllTriggers(guild_id);
    triggerCache.set(guild_id, new Map(triggers.map((trigger) => [trigger.id, trigger])));
    return triggerCache.get(guild_id) as Map<string, Trigger>;
  }
}

async function reload(guild_id: string) {
  const triggers = await getAllTriggers(guild_id);

  triggerCache.set(guild_id, new Map(triggers.map((trigger) => [trigger.id, trigger])));
}

async function refreshCache() {
  for (const guild_id of triggerCache.keys()) {
    await reload(guild_id);
  }
}

async function addTrigger(guild_id: string, trigger: Trigger) {
  const allowedRoles = JSON.stringify(trigger.allowed_roles);
  triggerDb.addTrigger(guild_id, trigger.id, trigger.content, allowedRoles);
}

async function deleteTrigger(guild_id: string, trigger_id: string) {
  triggerDb.deleteTrigger(guild_id, trigger_id);
}

async function getAllTriggers(guild_id: string): Promise<Trigger[]> {
  const triggers = triggerDb.getAllTriggers(guild_id);
  return triggers.map((trigger: TriggerRow) => ({
    id: trigger.trigger_id,
    content: trigger.trigger_content,
    allowed_roles: JSON.parse(trigger.allowed_roles),
  }));
}

export const triggerService = {
  getAllTriggers,
  addTrigger,
  deleteTrigger,
  get,
  refreshCache,
};
