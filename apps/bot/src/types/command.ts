import type { ChatInputCommandInteraction } from "discord.js";

export type SlashCommand = {
  data: any;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};
