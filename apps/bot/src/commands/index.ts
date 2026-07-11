import { levelCommand } from "./level";
import { addXpCommand } from "./addxp";
import type { SlashCommand } from "../types/command";
import { addLevelRole } from "./addlevelrole";
import { syncRoles } from "./syncroles";
import { pingCommand } from "./ping";
import { embedCommand } from "./embed";

export const slashCommands: SlashCommand[] = [
  levelCommand,
  addXpCommand,
  addLevelRole,
  syncRoles,
  embedCommand,
  pingCommand,
];
export const slashCommandMap = new Map(
  slashCommands.map((command) => [command.data.name, command]),
);
