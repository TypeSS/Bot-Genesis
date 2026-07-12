import { ChannelType, GuildMember, SlashCommandBuilder, TextChannel } from "discord.js";
import { SlashCommand } from "../types/command";
import { decodeEmbedUrl } from "@genesis/core";
import { hasAnyRole } from "../utils/helper";
import { ErrorMessage } from "../constants/errormessages";
import { adminRoles } from "../constants/adminRoles";

export const embedCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Envia um embed no canal escolhido.")
    .addChannelOption((input) =>
      input
        .setName("canal")
        .setDescription("O canal para enviar o embed")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true),
    )
    .addStringOption((input) =>
      input
        .setName("url")
        .setDescription("https://glitchii.github.io/embedbuilder/?data=...")
        .setRequired(true),
    ),
  async execute(interaction) {
    if (!hasAnyRole((interaction.member as GuildMember).roles.cache, adminRoles)) {
      interaction.reply({ content: ErrorMessage.NOT_ALLOWED, ephemeral: true });
      return;
    }
    const channel = interaction.options.getChannel("canal", true) as TextChannel;
    const url = interaction.options.getString("url", true);

    if (!channel || !url) {
      await interaction.reply({
        content: "Canal ou URL não fornecidos.",
        ephemeral: true,
      });
      return;
    }

    if (!url.startsWith("https://glitchii.github.io/embedbuilder/?data=")) {
      await interaction.reply({
        content: "URL inválida. Gera o embed em https://glitchii.github.io/embedbuilder/",
        ephemeral: true,
      });
      return;
    }

    const embed = decodeEmbedUrl(url);

    if (!embed) {
      await interaction.reply({
        content: "Não foi possível decodificar o embed da URL fornecida.",
        ephemeral: true,
      });
      return;
    }

    await channel.send(embed);
    await interaction.reply({
      content: `Embed enviado com sucesso para ${channel}.`,
      ephemeral: true,
    });
  },
};
