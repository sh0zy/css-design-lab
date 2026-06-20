type Props = {
  value: number; // 0-1
  className?: string;
  color?: "css" | "beginner" | "intermediate" | "advanced";
  height?: number;
};

const COLORS = {
  css: "bg-accent-css",
  beginner: "bg-accent-beginner",
  intermediate: "bg-accent-intermediate",
  advanced: "bg-accent-advanced",
};

export function ProgressBar({
  value,
  className = "",
  color = "css",
  height = 6,
}: Props) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <div
      className={`w-full bg-bg-soft rounded-full overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        className={`${COLORS[color]} h-full rounded-full transition-all`}
        style={{ width: `${v * 100}%` }}
      />
    </div>
  );
}
