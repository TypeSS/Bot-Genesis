import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types/command";

export const pingCommand: SlashCommand = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  async execute(interaction) {
    const delay = Math.abs(interaction.createdTimestamp - Date.now());
    await interaction.reply({
      content: `Pong! Latência: ${delay}ms.`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
