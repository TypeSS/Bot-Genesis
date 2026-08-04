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
    next: {
      revalidate: 60,
    },
  });

  return await res.json();
}

export async function getGuildRoles(guildId: string) {
  const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
    next: {
      revalidate: 60,
    },
  });
  return await res.json();
}

export async function getGuildChannels(guildId: string) {
  const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
    next: {
      revalidate: 60,
    },
  });
  return await res.json();
}

export async function sendEmbed(channelId: string, embedData: any) {
  const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(embedData),
  });

  console.log("Embed enviado:", await res.json());
}
