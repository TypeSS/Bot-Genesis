import { TextChannel, type Client, type Message } from "discord.js";
import { xpService } from "../services/xpService";
import { xpDb } from "../database/xpDb";
import { calculateLevel } from "../utils/xpCalculator";

export default async function messageCreate(_client: Client, message: Message) {
  if (message.author.bot || !message.guild) {
    return;
  }

  await xpService.processTextMessage(message);
  handleLevelUp(message);
}

function handleLevelUp(message: Message) {
  if (!message.guildId) return;

  if (xpDb.hasLeveledUp(message.guildId, message.author.id)) {
    const xp = xpDb.getUserXp(message.guildId, message.author.id).textXp;
    if (message.channel instanceof TextChannel)
      message.channel.send(
        `parabéns, <@${message.author.id}>! subiste para o nível ${calculateLevel(xp)}, desempregado.`,
      );
    xpDb.setLeveledUp(false, message.guildId, message.author.id);
  }
}
