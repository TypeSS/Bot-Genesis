import { ChatInputCommandInteraction, GuildMember, MessageFlags, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types/command";
import { levelDb } from "../database/levelDb";
import { xpDb } from "../database/xpDb";
import { calculateLevel, calculateXpForLevel } from "../utils/xpCalculator";
import { ErrorMessage } from "../constants/errormessages";

export const syncRoles: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("syncroles")
    .setDescription("Sincroniza o nível com as roles antigas")
    .addBooleanOption(input => input
      .setName("all")
      .setDescription("Define se sincroniza todos os membros")
      .setRequired(false)
    ),
  async execute(interaction) {
    const all = interaction.options.getBoolean("all", false);

    if (all != null &&
      !(interaction.member as GuildMember).roles.cache.has("1504146567924551722")
    ) {
      interaction.reply({ content: ErrorMessage.NOT_ALLOWED, ephemeral: true })
      return;
    }


    if (all) {
      await interaction.deferReply();
      await interaction.editReply({ content: "A buscar membros..." });
      let members: any
      try {
        members = await interaction.guild!.members.fetch();
      } catch (e: any) {
        console.error(e);
        console.error("data: ", e.data);
      }
      await interaction.editReply({ content: `${members.size} membros. A preparar para sincronizar...` })

      members.forEach((m: GuildMember) => {
        syncLevel(interaction, m, false);
      });

      await interaction.editReply({ content: `Feito! ${members.size} sincronizados.` })
    } else {
      syncLevel(interaction, interaction.member as GuildMember);
    }

  }
}

function syncLevel(interaction: ChatInputCommandInteraction, member: GuildMember, single = true) {

  const level = levelDb.getLevelByRoles(interaction.guildId!, member.roles.cache.map(r => r.id));
  if (level) {
    xpDb.setXp(interaction.guildId!, member.id, calculateXpForLevel(level), "text");
    if (single)
      interaction.reply({ content: `Nível ${level} atribuído a ${member.displayName}.`, flags: MessageFlags.Ephemeral });
  } else if (single) {
    interaction.reply({ content: `${member.displayName} não tem nenhuma role de nível.`, flags: MessageFlags.Ephemeral })
  }
}
