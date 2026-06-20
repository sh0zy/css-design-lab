import { Icon } from "./Icon";
import cssIcon from "../assets/css-icon.svg";

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

export function Header({ title, subtitle, onBack, right }: Props) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-bg-base/80 border-b border-bg-line">
      <div className="px-4 pt-[env(safe-area-inset-top)]">
        <div className="h-14 flex items-center gap-3">
          {onBack ? (
            <button
              onClick={onBack}
              aria-label="戻る"
              className="-ml-1 w-9 h-9 rounded-full grid place-items-center text-ink-mid hover:text-ink-high"
            >
              <Icon name="back" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={cssIcon}
                alt="CSS"
                className="w-7 h-7 rounded-md"
                draggable={false}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-[13px] uppercase tracking-wider text-ink-mid font-mono">
              {subtitle ?? "CSS Design Lab"}
            </div>
            <div className="text-base font-semibold text-ink-high truncate">
              {title}
            </div>
          </div>
          {right}
        </div>
      </div>
    </header>
  );
}
