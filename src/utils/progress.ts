import type { LessonLevel } from "../types/lesson";

export const RANKS: { name: string; minXp: number; level: LessonLevel | "all" }[] = [
  { name: "CSS Rookie", minXp: 0, level: "beginner" },
  { name: "Style Beginner", minXp: 180, level: "beginner" },
  { name: "Layout Builder", minXp: 520, level: "intermediate" },
  { name: "Responsive Designer", minXp: 1100, level: "intermediate" },
  { name: "UI Stylist", minXp: 1900, level: "advanced" },
  { name: "CSS Pro Designer", minXp: 2800, level: "advanced" },
];

export function rankFromXp(xp: number) {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) current = r;
  }
  const idx = RANKS.indexOf(current);
  const next = RANKS[idx + 1];
  const progress = next
    ? Math.min(1, (xp - current.minXp) / (next.minXp - current.minXp))
    : 1;
  return { current, next, progress };
}

export function xpForLesson(difficulty: number, level: LessonLevel): number {
  const base = level === "beginner" ? 12 : level === "intermediate" ? 18 : 26;
  return base + difficulty * 4;
}
