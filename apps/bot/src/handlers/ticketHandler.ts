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
  ButtonBuilder,
  ChannelSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  RoleSelectMenuBuilder,
  UserSelectMenuBuilder,
  StringSelectMenuInteraction,
  FileUploadBuilder,
  ModalSubmitInteraction,
  ButtonStyle,
} from "discord.js";

import { ticketsDb } from "@genesis/db";

type ActionRowComponent =
  | ButtonBuilder
  | StringSelectMenuBuilder
  | UserSelectMenuBuilder
  | RoleSelectMenuBuilder
  | MentionableSelectMenuBuilder
  | ChannelSelectMenuBuilder;

const rows: Record<string, ActionRowBuilder<ActionRowComponent>> = {
  support: new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("supportoption")
      .setPlaceholder("Seleciona o motivo")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Minecraft")
          .setDescription("Recebe acesso ao servidor de Minecraft.")
          .setEmoji("⛏️")
          .setValue("minecraft"),
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
      ),
  ),
  gala: new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("gala")
      .setLabel("Submeter arte")
      .setEmoji("🎨")
      .setStyle(ButtonStyle.Secondary),
  ),
};

const embeds: Record<string, EmbedBuilder> = {
  support: new EmbedBuilder()
    .setTitle("Suporte da Genesis Portugal")
    .setDescription(
      "Aqui, podes requisitar um chat para tirar dúvidas, reportar uma situação ou membro inconveniente, ou simplesmente entrar em contacto com os membros da staff.\n\nPor favor, seleciona a opção que se relaciona com o teu problema, e responderemos o mais rápido possível!",
    )
    .setImage("https://i.imgur.com/QNwLoWc.png")
    .setColor("#131313"),
  gala: new EmbedBuilder()
    .setTitle("Gala das Artes")
    .setDescription(
      "Aqui, podes submeter a tua arte para o concurso da Gala das Artes. Por favor, carrega a tua arte e adiciona uma descrição da mesma. A equipa da Genesis Portugal irá analisar a tua submissão e entrar em contacto contigo caso seja necessário.",
    )
    .setImage("https://i.imgur.com/QSUgxNq.png")
    .setColor("#131313"),
};

function makeSupportModal(type: string) {
  const modal = new ModalBuilder()
    .setCustomId(`support-${type}`)
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

  return modal;
}

function makeGalaModal() {
  const modal = new ModalBuilder().setCustomId(`gala`).setTitle("Gala das Artes");

  const art = new FileUploadBuilder()
    .setCustomId("art")
    .setMaxValues(1)
    .setMinValues(1)
    .setRequired(true);

  const artLabel = new LabelBuilder()
    .setLabel("Arte")
    .setFileUploadComponent(art)
    .setDescription("Carrega a tua arte para o concurso da Gala das Artes.");

  const description = new TextInputBuilder()
    .setCustomId("description")
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder("Fala um bocadinho sobre a tua peça!")
    .setRequired(true);

  const descriptionLabel = new LabelBuilder()
    .setLabel("Descrição")
    .setTextInputComponent(description);

  modal.addLabelComponents(artLabel, descriptionLabel);

  return modal;
}

export async function handleTicketRequest(interaction: Interaction) {
  if (!interaction.guildId) return;
  if (!interaction.isMessageComponent()) return;

  const messageIds = ticketsDb.getTicketMessages(interaction.guildId);
  const messageId = interaction.message.id;

  const messageData = messageIds.find((m) => m.messageId === messageId);
  if (!messageData) return;

  let makeModal: ModalBuilder;
  switch (messageData.type) {
    case "support":
      makeModal = makeSupportModal((interaction as StringSelectMenuInteraction).values[0]);
      break;
    case "gala":
      makeModal = makeGalaModal();
      break;
    default:
      return;
  }
  await interaction.showModal(makeModal);
}

const typeNames = {
  "minecraft": "Minecraft",
  "question": "Dúvida",
  "report": "Queixa",
  "other": "Outro"
}

type TicketType = keyof typeof typeNames;

async function handleSupportTicketCreation(interaction: ModalSubmitInteraction, type: TicketType) {
  const reason = interaction.fields.getTextInputValue("reason");
  
  const typeName = typeNames[type];

  const channel = interaction.channel as TextChannel;
  const ticketName = `${typeName} — ${interaction.user.username}`;
  const thread = await channel.threads.create({
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

async function handleGalaTicketCreation(interaction: ModalSubmitInteraction) {
  const description = interaction.fields.getTextInputValue("description");
  const art = interaction.fields.getUploadedFiles("art", true).first();

  if (!art) {
    interaction.reply({
      content: "Não foi possível obter a tua submissão. Por favor, tenta novamente.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const channel = interaction.channel as TextChannel;
  const ticketName = `Gala das Artes — ${interaction.user.username}`;
  const thread = await channel.threads.create({
    invitable: true,
    name: ticketName,
    reason: description,
    type: ChannelType.PrivateThread,
  });

  thread.send({
    content: `
# Submissão de Arte

**Olá**, <@${interaction.user.id}>!

A tua submissão foi **recebida** com sucesso! A equipa da Genesis Portugal irá analisar a tua submissão e entrar em contacto contigo caso seja necessário.

Descrição da submissão:
> ${description}

-# Obrigado por participares no concurso da Gala das Artes! Enquanto esperas, porque não ouvir [a nossa playlist](<https://open.spotify.com/playlist/1juqqfcsK0ItIfM160nGUv?si=944c2cc2a5764ef7>)?
`,
    files: [
      {
        attachment: art.url,
        name: art.name,
      },
    ],
  });

  interaction.reply({
    content: "A tua submissão foi recebida com sucesso. <#" + thread.id + ">",
    flags: MessageFlags.Ephemeral,
  });
}

export async function handleTicketCreation(interaction: Interaction) {
  if (!interaction.guildId) return;
  if (!interaction.isModalSubmit()) return;
  if (!interaction.channel || !(interaction.channel instanceof TextChannel)) return;

  const modalData = interaction.customId.split("-");

  switch (modalData[0]) {
    case "support":
      await handleSupportTicketCreation(interaction, modalData[1] as TicketType);
      break;
    case "gala":
      await handleGalaTicketCreation(interaction);
      break;
    default:
      return;
  }
}

export const ticketHandler = { handleTicketRequest, handleTicketCreation, embeds, rows };
