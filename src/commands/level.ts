import { AttachmentBuilder, MessageFlags, SlashCommandBuilder, SlashCommandUserOption } from "discord.js";
import { xpService } from "../services/xpService";
import { createLevelCard } from "../utils/levelCard";
import type { SlashCommand } from "../types/command";

export const levelCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("Mostra o teu nivel atual e o XP que falta para o proximo nivel.")
    .addUserOption(option =>
      option.setName("membro")
        .setDescription("O membro para pesquisar")
        .setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    if (!interaction.guildId) {
      await interaction.editReply({
        content: "Tenta outra vez.",
      });
      return;
    }

    const user = interaction.options.getUser("membro") ?? interaction.user;
    const member = interaction.guild?.members.fetch(user.id);
    const progress = xpService.getLevelInfo(interaction.guildId, user.id);
    const image = await createLevelCard({
      username: user.tag,
      avatarUrl: user.displayAvatarURL({ extension: "jpg", size: 256 }),
      text: progress.text,
      voice: progress.voice,
      color: (await member)?.displayHexColor ?? "#fff",
    });

    const attachment = new AttachmentBuilder(image, { name: "level.png" });

    await interaction.editReply({
      files: [attachment],
    });
  },
};
