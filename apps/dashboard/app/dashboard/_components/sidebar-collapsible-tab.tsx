import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Guild, SidebarTab } from "@/lib/types";
import { TbChevronDown } from "react-icons/tb";
import SidebarSubTab from "./sidebar-sub-tab";

export default function SidebarCollapsibleTab({
  name,
  tab,
  guild,
}: {
  name: string;
  tab: SidebarTab;
  guild: Guild;
}) {
  return (
    <SidebarMenu key={name}>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <CollapsibleTrigger className="hover:cursor-pointer">
              <tab.icon />
              <span className="font-sans font-semibold">{name}</span>
              <span className="ml-auto" />
              <TbChevronDown className="transition-transform duration-100 -rotate-90 group-data-[state=open]/collapsible:rotate-0" />
            </CollapsibleTrigger>
          </SidebarMenuButton>
          <CollapsibleContent>
            <SidebarMenuSub>
              {tab.subTabs.map((subTab: { name: string; path: string }) => (
                <SidebarSubTab key={subTab.name} subTab={subTab} guild={guild} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}
