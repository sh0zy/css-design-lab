import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { BottomNav, type Tab } from "./components/BottomNav";
import { Welcome } from "./pages/Welcome";
import { Home } from "./pages/Home";
import { Roadmap } from "./pages/Roadmap";
import { Lessons } from "./pages/Lessons";
import { LessonDetail } from "./pages/LessonDetail";
import { Practice } from "./pages/Practice";
import { LayoutLab } from "./pages/LayoutLab";
import { Projects } from "./pages/Projects";
import { Stats } from "./pages/Stats";
import { Settings } from "./pages/Settings";
import { useProgress } from "./hooks/useProgress";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getLesson } from "./data/lessons";
import { Icon } from "./components/Icon";
import type { LessonLevel } from "./types/lesson";

type Page =
  | { name: "welcome" }
  | { name: "home" }
  | { name: "roadmap"; level?: LessonLevel }
  | { name: "lessons"; level?: LessonLevel }
  | { name: "lesson-detail"; id: string }
  | { name: "practice" }
  | { name: "lab" }
  | { name: "projects" }
  | { name: "stats" }
  | { name: "settings" };

const TAB_BY_PAGE: Record<string, Tab> = {
  home: "home",
  roadmap: "roadmap",
  lessons: "lessons",
  lab: "lab",
  stats: "stats",
};

export default function App() {
  const [welcomeSeen, setWelcomeSeen] = useLocalStorage<boolean>(
    "cssdl_welcome_seen",
    false
  );
  const [page, setPage] = useState<Page>(
    welcomeSeen ? { name: "home" } : { name: "welcome" }
  );
  const [, setHistory] = useState<Page[]>([]);

  const {
    state,
    completeLesson,
    toggleFavorite,
    toggleReview,
    completeProject,
    reset,
    seedSample,
    setGoalLessonsPerDay,
    setStudyGoal,
    setStrictMode,
  } = useProgress();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  const go = (next: Page) => {
    if (page.name !== "welcome") setHistory((h) => [...h, page]);
    setPage(next);
  };

  const goBack = () => {
    setHistory((h) => {
      if (h.length === 0) {
        setPage({ name: "home" });
        return h;
      }
      const last = h[h.length - 1];
      setPage(last);
      return h.slice(0, -1);
    });
  };

  const onTabChange = (t: Tab) => {
    setHistory([]);
    if (t === "home") setPage({ name: "home" });
    else if (t === "roadmap") setPage({ name: "roadmap" });
    else if (t === "lessons") setPage({ name: "lessons" });
    else if (t === "lab") setPage({ name: "lab" });
    else if (t === "stats") setPage({ name: "stats" });
  };

  if (page.name === "welcome") {
    return (
      <Welcome
        onStart={() => {
          setWelcomeSeen(true);
          setPage({ name: "home" });
        }}
      />
    );
  }

  const headerRight =
    page.name === "home" ? (
      <button
        onClick={() => go({ name: "settings" })}
        className="w-9 h-9 rounded-full grid place-items-center text-ink-mid hover:text-ink-high"
        aria-label="設定"
      >
        <Icon name="settings" />
      </button>
    ) : undefined;

  let headerTitle = "Home";
  let headerSubtitle = "// home";
  let onBack: undefined | (() => void) = undefined;

  switch (page.name) {
    case "home":
      headerTitle = "Dashboard";
      headerSubtitle = "// dashboard";
      break;
    case "roadmap":
      headerTitle = "Roadmap";
      headerSubtitle = "// stages";
      break;
    case "lessons":
      headerTitle = "Lessons";
      headerSubtitle = "// browse";
      break;
    case "practice":
      headerTitle = "Practice";
      headerSubtitle = "// dojo";
      onBack = goBack;
      break;
    case "lab":
      headerTitle = "Layout Lab";
      headerSubtitle = "// experiments";
      break;
    case "projects":
      headerTitle = "Mini UI";
      headerSubtitle = "// missions";
      onBack = goBack;
      break;
    case "stats":
      headerTitle = "Stats";
      headerSubtitle = "// progress";
      break;
    case "settings":
      headerTitle = "Settings";
      headerSubtitle = "// config";
      onBack = goBack;
      break;
    case "lesson-detail": {
      const l = getLesson(page.id);
      headerTitle = l?.title ?? "Lesson";
      headerSubtitle = l ? `// ${l.id}` : "// lesson";
      onBack = goBack;
      break;
    }
  }

  const activeTab: Tab =
    TAB_BY_PAGE[page.name] ?? (page.name === "lessons" ? "lessons" : "home");

  return (
    <div className="min-h-[100dvh] max-w-md mx-auto bg-bg-base">
      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        onBack={onBack}
        right={headerRight}
      />

      <main className="pt-3">
        {page.name === "home" && (
          <Home
            state={state}
            onOpenLesson={(id) => go({ name: "lesson-detail", id })}
            onGoTo={(p) => {
              if (p === "projects") go({ name: "projects" });
              else if (p === "roadmap") go({ name: "roadmap" });
              else if (p === "lessons") go({ name: "lessons" });
              else if (p === "practice") go({ name: "practice" });
              else if (p === "stats") go({ name: "stats" });
              else if (p === "lab") go({ name: "lab" });
            }}
            onToggleFavorite={toggleFavorite}
            onOpenLevel={(lv) => go({ name: "roadmap", level: lv })}
          />
        )}
        {page.name === "roadmap" && (
          <Roadmap
            state={state}
            initialLevel={page.level}
            onOpenLesson={(id) => go({ name: "lesson-detail", id })}
          />
        )}
        {page.name === "lessons" && (
          <Lessons
            state={state}
            initialLevel={page.level}
            onOpenLesson={(id) => go({ name: "lesson-detail", id })}
            onToggleFavorite={toggleFavorite}
          />
        )}
        {page.name === "practice" && (
          <Practice
            state={state}
            onOpenLesson={(id) => go({ name: "lesson-detail", id })}
            onToggleReview={toggleReview}
          />
        )}
        {page.name === "lab" && <LayoutLab />}
        {page.name === "projects" && (
          <Projects state={state} onComplete={completeProject} />
        )}
        {page.name === "stats" && (
          <Stats
            state={state}
            onOpenLesson={(id) => go({ name: "lesson-detail", id })}
          />
        )}
        {page.name === "settings" && (
          <Settings
            state={state}
            onReset={reset}
            onSeed={seedSample}
            setGoal={setGoalLessonsPerDay}
            setStudyGoal={setStudyGoal}
            setStrictMode={setStrictMode}
          />
        )}
        {page.name === "lesson-detail" &&
          (() => {
            const l = getLesson(page.id);
            if (!l)
              return (
                <div className="px-4 pt-10 text-center text-ink-mid">
                  Lessonが見つかりません
                </div>
              );
            return (
              <LessonDetail
                lesson={l}
                state={state}
                onComplete={completeLesson}
                onToggleFavorite={toggleFavorite}
                onToggleReview={toggleReview}
                onOpenLesson={(id) => go({ name: "lesson-detail", id })}
              />
            );
          })()}
      </main>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  );
}
