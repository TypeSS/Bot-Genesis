"use server";
import { getGuild } from "@/app/actions/discord";
import { getGuildBanner } from "@/lib/utils";
import Image from "next/image";

export default async function GuildDashboard({ params }: { params: { guildId: string } }) {
  const { guildId } = await params;
  const guild = await getGuild(guildId);

  return <div className="w-full"></div>;
}
