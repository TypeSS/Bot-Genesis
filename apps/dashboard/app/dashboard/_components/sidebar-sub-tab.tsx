import { SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function SidebarSubTab({
  subTab,
  guild,
}: {
  subTab: { name: string; path: string };
  guild: { id: string };
}) {
  const selected = useSelectedLayoutSegment() === subTab.path.replace("/", "");
  return (
    <SidebarMenuSubItem key={subTab.name}>
      <SidebarMenuSubButton asChild className={cn(selected && "bg-accent")}>
        <Link href={`/dashboard/${guild.id}${subTab.path}`}>{subTab.name}</Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
