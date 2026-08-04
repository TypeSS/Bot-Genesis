import type { Client, VoiceState } from "discord.js";
import { xpHandler } from "../handlers/xpHandler";

export default async function voiceStateUpdate(
  _client: Client,
  oldState: VoiceState,
  newState: VoiceState,
) {
  const member = newState.member ?? oldState.member;

  if (member!.user.bot) {
    return;
  }

  await xpHandler.processVoiceStateUpdate(oldState, newState);
}
