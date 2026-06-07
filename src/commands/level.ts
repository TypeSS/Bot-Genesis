import { AttachmentBuilder, MessageFlags, SlashCommandBuilder } from "discord.js";
import { xpService } from "../services/xpService";
import { createLevelCard } from "../utils/levelCard";
import type { SlashCommand } from "../types/command";

export const levelCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Mostra o teu nivel atual e o XP que falta para o proximo nivel."),

  async execute(interaction) {
    await interaction.deferReply();
    if (!interaction.guildId) {
      await interaction.editReply({
        content: "Tenta outra vez.",
      });
      return;
    }

    const progress = xpService.getLevelInfo(interaction.guildId, interaction.user.id);
    const image = await createLevelCard({
      username: interaction.user.tag,
      avatarUrl: interaction.user.displayAvatarURL({ extension: "jpg", size: 256 }),
      text: progress.text,
      voice: progress.voice,
    });

    const attachment = new AttachmentBuilder(image, { name: "level.png" });

    await interaction.editReply({
      files: [attachment],
    });
  },
};
