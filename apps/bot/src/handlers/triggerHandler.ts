import { GuildMember, Message } from "discord.js";
import { triggerService } from "@genesis/core/src/services/triggerService";
import { hasAnyRole } from "../utils/helper";

async function handleTrigger(message: Message) {
  const triggers = await triggerService.get(message.guildId as string);

  const trigger = [...triggers.keys()].find((trigger) =>
    message.content.toLowerCase().includes(trigger.toLowerCase()),
  );

  if (!trigger) return;

  const triggerData = triggers.get(trigger);

  if (
    triggerData &&
    (!triggerData.allowed_roles.length ||
      hasAnyRole((message.member as GuildMember).roles.cache, triggerData.allowed_roles))
  ) {
    message.reply(triggerData.content);
  }
}

export const triggerHandler = { handleTrigger };
