import { registerFont, createCanvas, loadImage, type CanvasRenderingContext2D } from "canvas";
import path from "node:path";

const DEBUG = false;

registerFont(DEBUG ? "../assets/LeagueSpartan-VariableFont_wght.ttf" : "src/assets/LeagueSpartan-VariableFont_wght.ttf", {
  family: "LeagueSpartan"
})

const border = 20;

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
  color: string;
};

function isLightColor({ r, g, b }: { r: number; g: number; b: number }) {
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 100;
}

function hexToRgb(hex: string) {
  const value = parseInt(hex.slice(1), 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

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
  const barWidth = (310 - border) * 2;
  const barHeight = 15 * 2;
  const filledWidth = barWidth * getProgressPercent(progress);

  ctx.font = "400 32px League Spartan";
  ctx.textAlign = "left";
  ctx.fillStyle = "#f4f4f5";
  ctx.fillText(`${label} | Nível ${progress.level}`, x, y - 24);

  ctx.globalAlpha = 0.1;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, barWidth, barHeight, 4);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.font = "400 22px League Spartan";
  ctx.textAlign = "center";

  const text = `${progress.xpIntoLevel}/${progress.xpForNextLevel} XP`;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, filledWidth, barHeight, 4);

  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillText(
    text,
    x + barWidth / 2,
    y + barHeight / 2 + 7,
  );

  if (isLightColor(hexToRgb(color))) {
    ctx.save();
    ctx.clip();
    ctx.fillStyle = "#000";
    ctx.fillText(
      text,
      x + barWidth / 2,
      y + barHeight / 2 + 7,
    );
    ctx.restore();
  }

  ctx.globalAlpha = 1;



  ctx.font = "22px League Spartan";
  ctx.textAlign = "right";
  ctx.fillStyle = "#d4d4d8";
  ctx.fillText(`${progress.totalXp} XP`, x + barWidth, y + barHeight + 24);
}

export async function createLevelCard(data: LevelCardData) {
  const canvas = createCanvas(542 * 2, 213 * 2);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#131313";
  ctx.beginPath();
  ctx.roundRect(border, border, canvas.width - border * 2, canvas.height - border * 2, 20);
  ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.globalAlpha = 0.05;
  ctx.drawImage(await loadImage(path.join(process.cwd(), DEBUG ? "../assets/bg.png" : "src/assets/bg.png")), 90, 10);
  ctx.restore();
  ctx.beginPath();
  ctx.roundRect(2 + border, 2 + border, canvas.width - 4 - border * 2, canvas.height - 4 - border * 2, 20);
  ctx.strokeStyle = data.color;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.font = "600 68px League Spartan";
  ctx.textAlign = "left";
  ctx.fillStyle = data.color;
  ctx.fillText(data.username, 430, 110);

  const avatar = await loadImage(data.avatarUrl);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(213 - 188 + border, 213 - 188 + border, (188 - border) * 2, (188 - border) * 2, 6);
  ctx.clip();
  ctx.drawImage(avatar, 213 - 188 + border, 213 - 188 + border, (188 - border) * 2, (188 - border) * 2);
  ctx.restore();

  drawXpBar(ctx, "Texto", data.text, 430, 195, data.color);
  drawXpBar(ctx, "Voz", data.voice, 430, 305, data.color);

  return canvas.toBuffer("image/png");
}
