import { ActivityType, type Client } from "discord.js";
import { slashCommands } from "../commands";

export default async function clientReady(client: Client) {
  console.log(`Bot online ${client.user!.tag ?? "Bot"}.`);

  client.user!.setActivity({
    name: "/level",
    type: ActivityType.Playing,
  });

  const commandData = slashCommands.map((command) => command.data.toJSON());

  if (process.env.GUILD_ID) {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    await guild.commands.set(commandData);
  } else {
    await client.application!.commands.set(commandData);
  }

  console.log(`${commandData.length} Comandos registados.`);
}
