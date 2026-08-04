import { MessageFlags, type Client, type Interaction } from "discord.js";
import { slashCommandMap } from "../commands";
import { handleTicketCreation, handleTicketRequest } from "../handlers/ticketHandler";

export default async function interactionCreate(_client: Client, interaction: Interaction) {
  handleTicketRequest(interaction);
  handleTicketCreation(interaction);

  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = slashCommandMap.get(interaction.commandName);
  if (!command) {
    await interaction.reply({
      content: "Comando desconhecido.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  await command.execute(interaction);
}
