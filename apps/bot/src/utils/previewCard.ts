import { writeFileSync } from "fs";
import { createLevelCard } from "./levelCard";

async function run() {
  const buffer = await createLevelCard({
    username: "iuriineves",
    avatarUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
    text: {
      totalXp: 1200,
      level: 5,
      xpIntoLevel: 200,
      xpForNextLevel: 500,
    },
    voice: {
      totalXp: 800,
      level: 4,
      xpIntoLevel: 100,
      xpForNextLevel: 400,
    },
    color: "#FF0000"
  });

  writeFileSync("src/utils/preview.png", buffer);
}

run();
