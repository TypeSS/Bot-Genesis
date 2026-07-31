import { GuildMember, MessageFlags, SlashCommandBuilder, TextChannel } from "discord.js";
import { settingsDb } from "@genesis/db";
import { SlashCommand } from "../types/command";
import { hasAnyRole } from "../utils/helper";
import { ErrorMessage } from "../constants/errormessages";
import { adminRoles } from "../constants/adminRoles";
import { embed, row } from "../services/ticketService";

export const ticketCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Inicia o sistema de suporte."),
  async execute(interaction) {
    if (!hasAnyRole((interaction.member as GuildMember).roles.cache, adminRoles)) {
      interaction.reply({ content: ErrorMessage.NOT_ALLOWED, flags: MessageFlags.Ephemeral });
      return;
    }
    if (!interaction.channel || !(interaction.channel instanceof TextChannel)) {
      interaction.reply({ content: ErrorMessage.GENERIC_ERROR, flags: MessageFlags.Ephemeral });
      return;
    }
    if (!interaction.guildId) {
      interaction.reply({ content: ErrorMessage.GENERIC_ERROR, flags: MessageFlags.Ephemeral });
      return;
    }

    settingsDb.setTicketChannelId(interaction.guildId, interaction.channel.id);
    await interaction.channel.send({ embeds: [embed], components: [row] });
    await interaction.reply({ content: "Feito!", flags: MessageFlags.Ephemeral });
  },
};
