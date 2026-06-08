import { GuildMember, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types/command";
import { xpDb } from "../database/xpDb";
import { XpSource } from "../types/xp";

export const addXpCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("addxp")
    .setDescription("Adiciona XP ao membro")
    .addUserOption(input => input
      .setName("membro")
      .setDescription("Membro para adicionar XP")
      .setRequired(true)
    )
    .addIntegerOption(input => input
      .setName("xp")
      .setDescription("XP a adicionar")
      .setRequired(true)
    )
    .addStringOption(input => input
      .setName("tipo")
      .setDescription("Tipo de XP")
      .setRequired(false)
      .addChoices(
        { name: "Texto", value: "text" },
        { name: "Voice", value: "voice" }
      ))
  ,
  async execute(interaction) {
    const user = interaction.options.getUser("membro", true);
    const xpAmount = interaction.options.getInteger("xp", true);
    const type = interaction.options.getString("tipo") ?? "text";

    if (!(interaction.member as GuildMember).roles.cache.has("1504146567924551722")) {
      interaction.reply({ content: "Sai daqui pa nao podes usar isto", ephemeral: true })
      return;
    }
    if (!interaction.guildId) {
      interaction.reply({ content: "Erro, tenta de novo.", ephemeral: true });
      return;
    }
    xpDb.addXp(
      interaction.guildId,
      user.id,
      xpAmount,
      type as XpSource
    )
    interaction.reply(
      { content: `Adicionaste \`${xpAmount}\`xp a ${user.displayName}` });
  }
}
