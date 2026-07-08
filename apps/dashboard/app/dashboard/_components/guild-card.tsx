import { Guild } from "@/lib/types";
import { getGuildIcon, formatNumber } from "@/lib/utils";
import Image from "next/image";

export default function GuildCard({ guild }: { guild: Guild }) {
  return (
    <>
      <Image
        src={getGuildIcon(guild)}
        alt={guild.name}
        width={512}
        height={512}
        className="h-full w-auto rounded"
      />
      <div className="flex flex-col">
        <span className="font-sans font-bold  line-clamp-1">{guild.name}</span>
        <div className="text-sm text-[#888] flex items-center">
          <div className="h-1.5 mx-2 aspect-square bg-green-500 rounded-full" />
          {formatNumber(guild.approximate_presence_count)} online
        </div>
      </div>
    </>
  );
}
