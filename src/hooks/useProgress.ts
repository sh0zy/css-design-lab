import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { todayKey, diffDays } from "../utils/date";
import { rankFromXp, xpForLesson } from "../utils/progress";
import type { Lesson, LessonLevel } from "../types/lesson";

export type ProgressState = {
  xp: number;
  completed: Record<string, true>;
  favorites: Record<string, true>;
  review: Record<string, true>;
  weakCategories: Record<string, number>;
  completedProjects: Record<string, true>;
  streak: { count: number; lastDay: string | null };
  goalLessonsPerDay: number;
  studyGoal: string;
  todayCount: number;
  todayDate: string;
  strictMode: boolean;
};

const KEY = "cssdl_progress_v1";

const initial: ProgressState = {
  xp: 0,
  completed: {},
  favorites: {},
  review: {},
  weakCategories: {},
  completedProjects: {},
  streak: { count: 0, lastDay: null },
  goalLessonsPerDay: 2,
  studyGoal: "毎日少しずつでも続けて、CSSで思い通りのUIを作れるようになる。",
  todayCount: 0,
  todayDate: todayKey(),
  strictMode: false,
};

export function useProgress() {
  const [rawState, setState] = useLocalStorage<ProgressState>(KEY, initial);
  const state: ProgressState = { ...initial, ...rawState };

  const today = todayKey();
  const ensureToday = useCallback(
    (s: ProgressState): ProgressState => {
      if (s.todayDate !== today) {
        return { ...s, todayDate: today, todayCount: 0 };
      }
      return s;
    },
    [today]
  );

  const completeLesson = useCallback(
    (lesson: Lesson, opts?: { quizCorrect?: boolean }) => {
      setState((s) => {
        const base = ensureToday(s);
        const already = base.completed[lesson.id] === true;
        const gainedXp = already ? 0 : xpForLesson(lesson.difficulty, lesson.level);
        let streak = base.streak;
        if (!already) {
          if (!streak.lastDay) {
            streak = { count: 1, lastDay: today };
          } else if (streak.lastDay === today) {
            // same day, no change
          } else {
            const d = diffDays(streak.lastDay, today);
            streak =
              d === 1
                ? { count: streak.count + 1, lastDay: today }
                : { count: 1, lastDay: today };
          }
        }
        const weak = { ...base.weakCategories };
        if (opts?.quizCorrect === false) {
          weak[lesson.category] = (weak[lesson.category] ?? 0) + 1;
        }
        return {
          ...base,
          xp: base.xp + gainedXp,
          completed: { ...base.completed, [lesson.id]: true },
          weakCategories: weak,
          todayCount: already ? base.todayCount : base.todayCount + 1,
          streak,
        };
      });
    },
    [setState, ensureToday, today]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setState((s) => {
        const next = { ...s.favorites };
        if (next[id]) delete next[id];
        else next[id] = true;
        return { ...s, favorites: next };
      });
    },
    [setState]
  );

  const toggleReview = useCallback(
    (id: string) => {
      setState((s) => {
        const next = { ...s.review };
        if (next[id]) delete next[id];
        else next[id] = true;
        return { ...s, review: next };
      });
    },
    [setState]
  );

  const completeProject = useCallback(
    (id: string) => {
      setState((s) => ({
        ...s,
        completedProjects: { ...s.completedProjects, [id]: true },
        xp: s.xp + 60,
      }));
    },
    [setState]
  );

  const reset = useCallback(() => {
    setState({ ...initial, todayDate: todayKey() });
  }, [setState]);

  const seedSample = useCallback(() => {
    setState((s) => {
      const sample: Record<string, true> = { ...s.completed };
      ["b-001", "b-002", "b-003", "b-004", "b-005", "b-006"].forEach((id) => {
        sample[id] = true;
      });
      return {
        ...s,
        completed: sample,
        xp: Math.max(s.xp, 140),
        streak: { count: Math.max(2, s.streak.count), lastDay: today },
        todayCount: Math.max(1, s.todayCount),
      };
    });
  }, [setState, today]);

  const setGoalLessonsPerDay = useCallback(
    (n: number) => setState((s) => ({ ...s, goalLessonsPerDay: n })),
    [setState]
  );

  const setStudyGoal = useCallback(
    (text: string) => setState((s) => ({ ...s, studyGoal: text })),
    [setState]
  );

  const setStrictMode = useCallback(
    (v: boolean) => setState((s) => ({ ...s, strictMode: v })),
    [setState]
  );

  const rank = useMemo(() => rankFromXp(state.xp), [state.xp]);

  const counts = useMemo(() => {
    const c: Record<LessonLevel, number> = {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
    return { c };
  }, []);

  return {
    state,
    rank,
    counts,
    completeLesson,
    toggleFavorite,
    toggleReview,
    completeProject,
    reset,
    seedSample,
    setGoalLessonsPerDay,
    setStudyGoal,
    setStrictMode,
  };
}
