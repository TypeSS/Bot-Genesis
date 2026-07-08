"use server";

export async function getBotGuilds() {
  const req = await fetch("https://discord.com/api/v10/users/@me/guilds?with_counts=true", {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
    next: {
      revalidate: 60,
    },
  });

  return req.json();
}

export async function getGuild(guildId: string) {
  const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
  });

  return await res.json();
}
