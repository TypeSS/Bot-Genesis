import type { Client, VoiceState } from "discord.js";
import { xpService } from "../services/xpService";

export default async function voiceStateUpdate( _client: Client, oldState: VoiceState, newState: VoiceState ) {
  const member = newState.member ?? oldState.member;

  if (member!.user.bot) {
    return;
  }

  await xpService.processVoiceStateUpdate(oldState, newState);
}
