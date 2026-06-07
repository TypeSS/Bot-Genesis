import type { Client, Message } from "discord.js";
import { xpService } from "../services/xpService";

export default async function messageCreate(_client: Client, message: Message) {
  if (message.author.bot || !message.guild) {
    return;
  }
  
  await xpService.processTextMessage(message);
}
