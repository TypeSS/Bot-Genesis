const TEXT_CHECKPOINT_BASE_XP = 8;
const COMPLETED_SESSION_BONUS_XP = 15;
const VOICE_XP_PER_MINUTE = 5;
const MAX_VOICE_XP_PER_SESSION = 120;
const LEVEL_XP_CURVE = 50;

export function calculateTextCheckpointXp(messageCount: number): number {
  if (messageCount <= 0) {
    return 0;
  }
  return Math.round(TEXT_CHECKPOINT_BASE_XP * Math.log2(messageCount + 1));
}

export function calculateCompletedSessionBonus(completedCheckpoints: number): number {
  if (completedCheckpoints <= 0) {
    return 0;
  }

  return Math.round(COMPLETED_SESSION_BONUS_XP * Math.min(completedCheckpoints / 5, 1));
}

export function calculateVoiceXp(durationMs: number): number {
  if (durationMs <= 0) {
    return 0;
  }

  const minutes = durationMs / 60_000;
  return Math.floor(Math.min(minutes * VOICE_XP_PER_MINUTE, MAX_VOICE_XP_PER_SESSION));
}

export function calculateLevel(totalXp: number): number {
  if (totalXp <= 0) {
    return 0;
  }

  return Math.floor(Math.sqrt(totalXp / LEVEL_XP_CURVE));
}

export function calculateXpForLevel(level: number): number {
  if (level <= 0) {
    return 0;
  }

  return Math.ceil(level ** 2 * LEVEL_XP_CURVE);
}

export function calculateXpToNextLevel(totalXp: number): number {
  const currentLevel = calculateLevel(totalXp);
  const nextLevelXp = calculateXpForLevel(currentLevel + 1);

  return Math.max(nextLevelXp - totalXp, 0);
}
