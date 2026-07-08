import { SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import Link from "next/link";

export default function SidebarSubTab({
  subTab,
  guild,
}: {
  subTab: { name: string; path: string };
  guild: { id: string };
}) {
  return (
    <SidebarMenuSubItem key={subTab.name}>
      <SidebarMenuSubButton asChild>
        <Link href={`/dashboard/${guild.id}${subTab.path}`}>{subTab.name}</Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
