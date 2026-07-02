import { FaDiscord } from "react-icons/fa";
import { signIn } from "../auth";

export default function DiscordLogin() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord", {
          redirectTo: "/dashboard",
        });
      }}
    >
      <button
        className="font-mono bg-[#303AAC] border-[#5865F2] border rounded pr-4 pl-2 py-2
            hover:cursor-pointer hover:bg-[#5865F2] transition-all
            flex gap-2 items-center
            "
      >
        <FaDiscord className="w-8" />
        Entrar com o Discord
      </button>
    </form>
  );
}
