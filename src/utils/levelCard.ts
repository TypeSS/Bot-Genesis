import { createCanvas, loadImage, type CanvasRenderingContext2D } from "canvas";

type ProgressInfo = {
  totalXp: number;
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
};

type LevelCardData = {
  username: string;
  avatarUrl: string;
  text: ProgressInfo;
  voice: ProgressInfo;
};

function getProgressPercent(progress: ProgressInfo) {
  if (progress.xpForNextLevel <= 0) {
    return 0;
  }

  return Math.min(progress.xpIntoLevel / progress.xpForNextLevel, 1);
}

function drawXpBar(
  ctx: CanvasRenderingContext2D,
  label: string,
  progress: ProgressInfo,
  x: number,
  y: number,
  color: string,
) {
  const barWidth = 610;
  const barHeight = 42;
  const filledWidth = barWidth * getProgressPercent(progress);

  ctx.font = "28px sans-serif";
  ctx.textAlign = "left";
  ctx.fillStyle = "#f4f4f5";
  ctx.fillText(`${label} - Nivel ${progress.level}`, x, y - 16);

  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#000000";
  ctx.fillRect(x, y, barWidth, barHeight);
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "#a3a3a3";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, barWidth, barHeight);

  ctx.globalAlpha = 0.75;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, filledWidth, barHeight);
  ctx.globalAlpha = 1;

  ctx.font = "22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${progress.xpIntoLevel} / ${progress.xpForNextLevel} XP`,
    x + barWidth / 2,
    y + 28,
  );

  ctx.font = "20px sans-serif";
  ctx.textAlign = "right";
  ctx.fillStyle = "#d4d4d8";
  ctx.fillText(`Total: ${progress.totalXp} XP`, x + barWidth, y + barHeight + 28);
}

export async function createLevelCard(data: LevelCardData) {
  const canvas = createCanvas(1000, 420);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#36393f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#202225";
  ctx.fillRect(30, 30, canvas.width - 60, canvas.height - 60);

  ctx.strokeStyle = "#4f545c";
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  ctx.font = "38px sans-serif";
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(data.username, 320, 100);

  const avatar = await loadImage(data.avatarUrl);

  ctx.save();
  ctx.beginPath();
  ctx.arc(170, 210, 120, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 50, 90, 240, 240);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(170, 210, 120, 0, Math.PI * 2);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();

  drawXpBar(ctx, "Texto", data.text, 320, 160, "#57f287");
  drawXpBar(ctx, "Voice", data.voice, 320, 295, "#5865f2");

  return canvas.toBuffer("image/png");
}
