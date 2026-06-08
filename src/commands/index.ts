import { levelCommand } from "./level";
import { addXpCommand } from "./addxp";
import type { SlashCommand } from "../types/command";

export const slashCommands: SlashCommand[] = [levelCommand, addXpCommand];
export const slashCommandMap = new Map(slashCommands.map((command) => [command.data.name, command]));
