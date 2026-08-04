import { type Client, type Message } from "discord.js";
import { xpService } from "@genesis/services";
import { levelHandler } from "../handlers/levelHandler";
import { triggerHandler } from "../handlers/triggerHandler";

export default async function messageCreate(_client: Client, message: Message) {
  if (message.author.bot || !message.guild) {
    return;
  }

  await xpService.processTextMessage(message);
  triggerHandler.handleTrigger(message);
  levelHandler.handleLevelUpNotification(message);
  levelHandler.handleRoleUpdate(message);
}
