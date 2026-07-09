"use client";
import { FaDiscord } from "react-icons/fa";
import { authClient } from "@/app/auth-client";

export default function DiscordLogin() {
  return (
    <button
      className="font-mono bg-[#303AAC] border-[#5865F2] border rounded pr-4 pl-2 py-2
            hover:cursor-pointer hover:bg-[#5865F2] transition-all
            flex gap-2 items-center
            "
      onClick={() =>
        authClient.signIn.social({
          provider: "discord",
          callbackURL: "/dashboard",
        })
      }
    >
      <FaDiscord className="w-8" />
      Entrar com o Discord
    </button>
  );
}
