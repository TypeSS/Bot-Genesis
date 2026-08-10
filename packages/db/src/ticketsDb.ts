import { db } from "./db";

type TicketChannelRow = {
  ticket_message_id: string;
  ticket_type: string;
};

const getTicketMessageIDsStatement = db.prepare(`
  SELECT ticket_message_id, ticket_type
  FROM ticket_settings
  WHERE guild_id = ?
`);

const addTicketMessageIDStatement = db.prepare(`
  INSERT INTO ticket_settings (guild_id, ticket_message_id, ticket_type)
  VALUES (?, ?, ?)
`);

const removeTicketMessageIDStatement = db.prepare(`
  DELETE FROM ticket_settings
  WHERE guild_id = ? AND ticket_message_id = ?
`);

function getTicketMessages(guildId: string) {
  const ticket_message_ids = getTicketMessageIDsStatement.all(guildId) as
    | TicketChannelRow[]
    | undefined;
  return (
    ticket_message_ids?.map((row) => ({
      messageId: row.ticket_message_id,
      type: row.ticket_type,
    })) ?? []
  );
}

function addTicketMessage(guildId: string, messageId: string, type: string) {
  addTicketMessageIDStatement.run(guildId, messageId, type);
}

function removeTicketMessage(guildId: string, messageId: string) {
  removeTicketMessageIDStatement.run(guildId, messageId);
}

export const ticketsDb = {
  getTicketMessages,
  addTicketMessage,
  removeTicketMessage,
};
