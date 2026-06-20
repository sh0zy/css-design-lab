import { Icon, type IconName } from "./Icon";

export type Tab = "home" | "roadmap" | "lessons" | "lab" | "stats";

const tabs: { key: Tab; label: string; icon: IconName }[] = [
  { key: "home", label: "Home", icon: "home" },
  { key: "roadmap", label: "Roadmap", icon: "map" },
  { key: "lessons", label: "Lessons", icon: "list" },
  { key: "lab", label: "Lab", icon: "wand" },
  { key: "stats", label: "Stats", icon: "stats" },
];

type Props = {
  active: Tab;
  onChange: (t: Tab) => void;
};

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed left-0 right-0 bottom-0 z-30 bg-bg-base/95 backdrop-blur border-t border-bg-line">
      <ul className="grid grid-cols-5 max-w-md mx-auto pb-[env(safe-area-inset-bottom)]">
        {tabs.map((t) => {
          const on = active === t.key;
          return (
            <li key={t.key}>
              <button
                onClick={() => onChange(t.key)}
                className={`w-full h-16 flex flex-col items-center justify-center gap-1 ${
                  on ? "text-accent-css" : "text-ink-mid"
                }`}
                aria-current={on ? "page" : undefined}
              >
                <span className={on ? "scale-110 transition" : "transition"}>
                  <Icon name={t.icon} width={22} height={22} />
                </span>
                <span className="text-[10px] font-mono tracking-wider">
                  {t.label}
                </span>
                <span
                  className={`h-0.5 w-6 rounded-full ${
                    on ? "bg-accent-css" : "bg-transparent"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
