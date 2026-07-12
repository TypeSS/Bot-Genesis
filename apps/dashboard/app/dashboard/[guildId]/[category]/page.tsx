import { getGuild } from "@/app/actions/discord";
import { tabs } from "../../../config/dashboard-tabs";

export default async function DashboardCategoryPage({
  params,
}: {
  params: Promise<{ category: string; guildId: string }>;
}) {
  const { category, guildId } = await params;
  const subTab = Object.values(tabs)
    .flatMap((tab) => tab.subTabs)
    .find((subTab) => subTab.path === `/${category}`);

  if (!subTab) {
    return <div>SubTab not found</div>;
  }

  return (
    <div className="flex flex-col gap-4 m-5">
      <h1 className="text-2xl font-black font-sans">{subTab.name}</h1>
      <subTab.content guild={await getGuild(guildId)} />
    </div>
  );
}
