import { GuildMember, MessageFlags, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types/command";
import { levelDb } from "../database/levelDb";
import { ErrorMessage } from "../constants/errormessages";

export const addLevelRole: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("addlevelrole")
    .setDescription("Adiciona uma nova role de nível")
    .addNumberOption(input => input
      .setName("level")
      .setDescription("Level que terá a role")
      .setRequired(true)
    )
    .addRoleOption(input => input
      .setName("role")
      .setDescription("Role a dar")
      .setRequired(true)
    ),
  async execute(interaction) {
    const level = interaction.options.getNumber("level", true);
    const role = interaction.options.getRole("role", true);

    if (!(interaction.member as GuildMember).roles.cache.has("1504146567924551722")) {
      interaction.reply({ content: ErrorMessage.NOT_ALLOWED, flags: MessageFlags.Ephemeral })
      return;
    }

    if (!interaction.guildId) {
      interaction.reply({ content: ErrorMessage.GENERIC_ERROR, flags: MessageFlags.Ephemeral });
      return;
    }

    levelDb.addRole(interaction.guildId, level, role.id);
    interaction.reply({ content: `Role \`${role.name}\` adicionada ao nível ${level}.`, flags: MessageFlags.Ephemeral })
  }
}
