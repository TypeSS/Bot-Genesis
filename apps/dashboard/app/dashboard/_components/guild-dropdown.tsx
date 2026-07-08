import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Guild } from "@/lib/types";
import { TbChevronDown } from "react-icons/tb";
import GuildCard from "./guild-card";
import Link from "next/link";

export default function GuildDropdown({
  selectedGuild,
  guilds,
}: {
  selectedGuild: Guild;
  guilds: Guild[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="h-15 w-full hover:cursor-pointer">
          <GuildCard guild={selectedGuild} />
          <TbChevronDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {guilds
          .filter((g) => g !== selectedGuild)
          .map((g: Guild) => (
            <DropdownMenuItem key={g.id}>
              <Link
                href={`/dashboard/${g.id}`}
                className="h-10 flex flex-row items-center gap-2 w-full"
              >
                <GuildCard guild={g} />
              </Link>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
