export type XpSource = "text" | "voice";

export type UserXp = {
  textXp: number;
  voiceXp: number;
};

export type TextSession = {
  guildId: string;
  userId: string;
  startAt: number;
  lastMsgAt: number;
  checkpointIndex: number;
  msgsInInterval: number;
  xpPending: number;
};
