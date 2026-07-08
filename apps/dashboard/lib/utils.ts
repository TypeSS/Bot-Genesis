import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Guild } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGuildIcon(guild: Guild): string {
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`;
}

export function getGuildBanner(guild: Guild): string {
  return `https://cdn.discordapp.com/splashes/${guild.id}/${guild.splash}.png?size=1024`;
}

export function getGuildById(id: string, guilds: Guild[]): Guild | undefined {
  return guilds.find((g) => g.id === id);
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;

  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;

  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;

  return n.toString();
}
