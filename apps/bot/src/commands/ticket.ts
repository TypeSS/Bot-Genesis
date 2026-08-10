import { GuildMember, MessageFlags, SlashCommandBuilder, TextChannel } from "discord.js";
import { SlashCommand } from "../types/command";
import { hasAnyRole } from "../utils/helper";
import { ErrorMessage } from "../constants/errormessages";
import { adminRoles } from "../constants/adminRoles";
import { ticketHandler } from "../handlers/ticketHandler";
import { ticketsDb } from "@genesis/db";

export const ticketCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .addStringOption((input) =>
      input
        .addChoices(
          { name: "Suporte", value: "suporte" },
          { name: "Gala das Artes", value: "gala" },
        )
        .setName("type")
        .setDescription("Tipo de ticket")
        .setRequired(true),
    )
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

    const type = interaction.options.getString("type", true);

    const message = await interaction.channel.send({
      embeds: [ticketHandler.embeds[interaction.options.getString("type", true)]],
      components: [ticketHandler.rows[interaction.options.getString("type", true)]],
    });
    ticketsDb.addTicketMessage(interaction.guildId, message.id, type);
    await interaction.reply({ content: "Feito!", flags: MessageFlags.Ephemeral });
  },
};
