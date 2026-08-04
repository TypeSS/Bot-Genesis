"use server";
import { Trigger } from "@genesis/core";
import { triggerService } from "@genesis/core/src/services/triggerService";

export async function addTrigger(guild_id: string, trigger: Trigger) {
  await triggerService.addTrigger(guild_id, trigger);
}

export async function deleteTrigger(guild_id: string, trigger_id: string) {
  await triggerService.deleteTrigger(guild_id, trigger_id);
}

export async function getAllTriggers(guild_id: string): Promise<Trigger[]> {
  return await triggerService.getAllTriggers(guild_id);
}
