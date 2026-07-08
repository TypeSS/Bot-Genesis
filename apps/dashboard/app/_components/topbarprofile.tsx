import Image from "next/image";
import { auth, signOut } from "../auth";
import DiscordLogin from "./discordlogin";
import LoggedIn from "./LoggedIn";
import { HiOutlineLogout } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default async function Profile() {
  const session = await auth();
  return (
    <LoggedIn
      is={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              width={512}
              height={512}
              className="h-full w-auto rounded-full border border-[#242424] hover:cursor-pointer"
              src={session?.user?.image!}
              alt={session?.user?.name!}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>A Minha Conta</DropdownMenuLabel>
              <DropdownMenuItem className="hover:cursor-pointer">
                <TbLayoutDashboard />
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={async () => {
                  "use server";
                  await signOut();
                }}
                className="hover:cursor-pointer"
              >
                <HiOutlineLogout />
                Sair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      }
      isnot={<DiscordLogin />}
    />
  );
}
