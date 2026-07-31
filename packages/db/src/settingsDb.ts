import { db } from "./db";

type TicketChannelRow = {
  ticket_channel_id: string;
};

const getTicketChannelIdStatement = db.prepare(`
  SELECT ticket_channel_id
  FROM ticket_settings
  WHERE guild_id = ?
`);

const setTicketChannelIdStatement = db.prepare(`
  INSERT INTO ticket_settings (guild_id, ticket_channel_id)
  VALUES (?, ?)
  ON CONFLICT(guild_id) DO UPDATE SET
    ticket_channel_id = excluded.ticket_channel_id
`);

function getTicketChannelId(guildId: string) {
  const row = getTicketChannelIdStatement.get(guildId) as TicketChannelRow | undefined;
  return row?.ticket_channel_id ?? null;
}

function setTicketChannelId(guildId: string, channelId: string) {
  setTicketChannelIdStatement.run(guildId, channelId);
}

export const settingsDb = {
  getTicketChannelId,
  setTicketChannelId,
};
