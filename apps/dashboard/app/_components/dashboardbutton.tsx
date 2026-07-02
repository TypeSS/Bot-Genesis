import { TbLayoutDashboardFilled } from "react-icons/tb";
import Link from "next/link";

export default function DashboardButton() {
  return (
    <div className="flex">
      <Link
        className="font-mono bg-[#0f0f0f] border-[#242424] border rounded pr-4 pl-2 py-2
            hover:cursor-pointer hover:bg-[#242424] transition-all
            flex gap-4 items-center
            "
        href="/dashboard"
      >
        <TbLayoutDashboardFilled className="w-8" />
        Acessar Painel de Controlo
      </Link>
    </div>
  );
}
