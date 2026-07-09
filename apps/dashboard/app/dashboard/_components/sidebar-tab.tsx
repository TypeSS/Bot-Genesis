import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { TbLayoutDashboard } from "react-icons/tb";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SidebarTab({ name, href }: { name: string; href: string }) {
  const selected = useSelectedLayoutSegment() === null;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={href} className={cn(selected && "bg-accent")}>
            <TbLayoutDashboard />
            <span className="font-sans font-semibold">{name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
