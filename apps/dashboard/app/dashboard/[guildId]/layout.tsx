import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "../_components/sidebar";
import { getBotGuilds } from "../../actions/discord";

export default async function DashboardLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ guildId: string }>;
  children: React.ReactNode;
}>) {
  const guilds = await getBotGuilds();

  return (
    <SidebarProvider>
      <DashboardSidebar guilds={guilds} guildId={(await params).guildId} />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
}
