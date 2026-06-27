import { type Client, type Message } from "discord.js";
import { xpService } from "../services/xpService";
import { levelService } from "../services/levelService";

export default async function messageCreate(_client: Client, message: Message) {
  if (message.author.bot || !message.guild) {
    return;
  }

  await xpService.processTextMessage(message);
  levelService.handleLevelUpNotification(message);
  levelService.handleRoleUpdate(message);
}
