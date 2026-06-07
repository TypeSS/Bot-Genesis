import { levelCommand } from "./level";
import type { SlashCommand } from "../types/command";

export const slashCommands: SlashCommand[] = [levelCommand];
export const slashCommandMap = new Map(slashCommands.map((command) => [command.data.name, command]));
