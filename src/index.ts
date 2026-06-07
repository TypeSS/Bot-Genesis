import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { loadEvents } from "./handlers/eventHandler";
import { join } from "path";

config({ path: join(__dirname, ".env") });

async function main() {
  const token = process.env.TOKEN;

  if (!token) {
    throw new Error("No token.");
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  await loadEvents(client);
  await client.login(token);
}

void main().catch((err) => {
  console.error("Erro: " + err);
  process.exit(1);
});
