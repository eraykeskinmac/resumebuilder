import { Lines } from "../../types";

export const BULLET_POINTS = [
  "⋅",
  "∙",
  "🞄",
  "•",
  "⦁",
  "⚫︎",
  "●",
  "⬤",
  "⚬",
  "○",
];

const getFirstBulletPointLineIdx = (lines: Lines): number | undefined => {
  for (let i = 0; i < lines.length; i++) {
    for (let item of lines[i]) {
      if (BULLET_POINTS.some((bullet) => item.text.includes(bullet))) {
        return i;
      }
    }
  }
  return undefined;
};

export const getDescriptionLineIdx = (lines: Lines): number | undefined => {
  let idx = getFirstBulletPointLineIdx(lines);

  if (idx === undefined) {
    for (let i = 0; i < lines.length; i++) {
      for (let item of lines[i]) {
        if (item.text.includes("•")) {
          return i;
        }
      }
    }
  }
};
