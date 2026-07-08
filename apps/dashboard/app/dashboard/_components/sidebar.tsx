"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { tabs } from "../../config/dashboard-tabs";

import { Guild } from "@/lib/types";
import { getGuildById } from "@/lib/utils";

import GuildDropdown from "./guild-dropdown";
import SidebarCollapsibleTab from "./sidebar-collapsible-tab";
import SidebarTab from "./sidebar-tab";

export default function DashboardSidebar({
  guildId,
  guilds,
}: {
  guildId: string;
  guilds: Guild[];
}) {
  const guild = getGuildById(guildId, guilds)!;

  return (
    <Sidebar className="top-20">
      <SidebarHeader className="list-none">
        <SidebarMenuItem>
          <GuildDropdown selectedGuild={guild} guilds={guilds} />
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent className="mx-2">
        <SidebarTab name="Vista Geral" href={`/dashboard/${guild.id}`} />
        {Object.entries(tabs).map(([name, tab]) => (
          <SidebarCollapsibleTab key={name} name={name} tab={tab} guild={guild} />
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
