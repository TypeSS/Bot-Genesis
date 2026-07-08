import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { TbLayoutDashboard } from "react-icons/tb";
import Link from "next/link";

export default function SidebarTab({ name, href }: { name: string; href: string }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={href}>
            <TbLayoutDashboard />
            <span className="font-sans font-semibold">{name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
