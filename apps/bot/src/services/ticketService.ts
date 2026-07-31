import {
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  ModalBuilder,
  TextInputStyle,
  LabelBuilder,
  Interaction,
  TextChannel,
  ChannelType,
  MessageFlags,
} from "discord.js";

import { settingsDb } from "@genesis/db";

const select = new StringSelectMenuBuilder()
  .setCustomId("supportoption")
  .setPlaceholder("Seleciona o motivo")
  .addOptions(
    new StringSelectMenuOptionBuilder()
      .setLabel("Dúvida")
      .setDescription("Tira dúvidas acerca do servidor.")
      .setEmoji("❓")
      .setValue("question"),
    new StringSelectMenuOptionBuilder()
      .setLabel("Queixa")
      .setDescription("Expõe um membro ou situação.")
      .setEmoji("🚨")
      .setValue("report"),
    new StringSelectMenuOptionBuilder()
      .setLabel("Outro")
      .setDescription("Outro motivo.")
      .setEmoji("✉️")
      .setValue("other"),
  );

export const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);

export const embed = new EmbedBuilder()
  .setTitle("Suporte da Genesis Portugal")
  .setDescription(
    "Aqui, podes requisitar um chat para tirar dúvidas, reportar uma situação ou membro inconveniente, ou simplesmente entrar em contacto com os membros da staff.\n\nPor favor, seleciona a opção que se relaciona com o teu problema, e responderemos o mais rápido possível!",
  )
  .setImage("https://i.imgur.com/QNwLoWc.png")
  .setColor("#131313");

export async function handleTicketRequest(interaction: Interaction) {
  if (!interaction.guildId) return;
  if (!interaction.isStringSelectMenu()) return;

  const ticketChannelId = settingsDb.getTicketChannelId(interaction.guildId);
  if (!ticketChannelId || interaction.channelId !== ticketChannelId) return;

  const selectedOption = interaction.values[0];

  const modal = new ModalBuilder()
    .setCustomId(`ticketModal-${selectedOption}`)
    .setTitle("Suporte da Genesis Portugal");

  const reason = new TextInputBuilder()
    .setCustomId("reason")
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder(
      "Explica o motivo pelo qual precisas de ajuda, para podermos tratar do teu pedido da melhor forma.",
    )
    .setRequired(true);

  const reasonLabel = new LabelBuilder().setLabel("Motivo").setTextInputComponent(reason);

  modal.addLabelComponents(reasonLabel);

  await interaction.showModal(modal);
}

export async function handleTicketCreation(interaction: Interaction) {
  if (!interaction.guildId) return;
  if (!interaction.isModalSubmit()) return;
  if (!interaction.channel || !(interaction.channel instanceof TextChannel)) return;

  const modalData = interaction.customId.split("-");
  if (modalData[0] !== "ticketModal") return;

  const reason = interaction.fields.getTextInputValue("reason");

  const type = modalData[1];
  const typeName = type === "question" ? "Dúvida" : type === "report" ? "Queixa" : "Outro";

  const ticketName = `${typeName} — ${interaction.user.username}`;
  const thread = await interaction.channel!.threads.create({
    invitable: true,
    name: ticketName,
    reason: reason,
    type: ChannelType.PrivateThread,
  });

  thread.send({
    content: `
  # Ticket de ${typeName}

**Olá**, <@${interaction.user.id}>!

Os <@&945417652862611526>s já foram **notificados** acerca deste ticket.
Pedimos que **aguardes** pela resposta de algum membro da staff para que possamos **resolver** a tua situação o mais **rápido** possível!

Motivo do ticket:
> ${reason}

-# Se quiseres adicionar **outro** membro ao ticket, só o tens que marcar (ex: **@iuriineves**). Enquanto esperas, porque não ouvir [a nossa playlist](<https://open.spotify.com/playlist/1juqqfcsK0ItIfM160nGUv?si=944c2cc2a5764ef7>)?
`,
  });

  interaction.reply({
    content: "Um chat foi requisitado. <#" + thread.id + ">",
    flags: MessageFlags.Ephemeral,
  });
}
