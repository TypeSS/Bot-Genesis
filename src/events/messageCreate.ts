import { TextChannel, type Client, type Message } from "discord.js";
import { xpService } from "../services/xpService";
import { xpDb } from "../database/xpDb";
import { calculateLevel } from "../utils/xpCalculator";
import { levelDb } from "../database/levelDb";

export default async function messageCreate(_client: Client, message: Message) {
  if (message.author.bot || !message.guild) {
    return;
  }

  await xpService.processTextMessage(message);
  handleLevelUpNotification(message);
  handleRoleUpdate(message);
}

function handleLevelUpNotification(message: Message) {
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

function handleRoleUpdate(message: Message) {
  if (!message.guildId || !message.member) return;

  const level = calculateLevel(xpDb.getUserXp(message.guildId, message.author.id).textXp);
  const correctRole = levelDb.getRoleByLevel(message.guildId, level);
  const currentRole = levelDb.getCurrentLevelRole(
    message.guildId,
    message.member.roles.cache.map((r) => r.id),
  );

  if (currentRole != correctRole) {
    if (currentRole) message.member.roles.remove(currentRole);
    message.member.roles.add(correctRole);
  }
}
