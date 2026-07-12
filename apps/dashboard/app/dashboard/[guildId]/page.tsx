"use server";

import { getBotGuilds } from "@/app/actions/discord";
import { Guild } from "@/lib/types";

export async function generateStaticParams() {
  const guilds = await getBotGuilds();
  return guilds.map((guild: Guild) => ({ guildId: guild.id }));
}

export default async function GuildDashboard() {
  return <div className="w-full"></div>;
}
