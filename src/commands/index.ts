import { levelCommand } from "./level";
import { addXpCommand } from "./addxp";
import type { SlashCommand } from "../types/command";
import { addLevelRole } from "./addlevelrole";
import { syncRoles } from "./syncroles";

export const slashCommands: SlashCommand[] = [levelCommand, addXpCommand, addLevelRole, syncRoles];
export const slashCommandMap = new Map(slashCommands.map((command) => [command.data.name, command]));
