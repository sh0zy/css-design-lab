import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export type IconName =
  | "home"
  | "map"
  | "list"
  | "play"
  | "stats"
  | "settings"
  | "check"
  | "lock"
  | "star"
  | "starFilled"
  | "fire"
  | "bolt"
  | "code"
  | "rocket"
  | "back"
  | "next"
  | "search"
  | "trash"
  | "refresh"
  | "save"
  | "copy"
  | "trophy"
  | "book"
  | "alert"
  | "close"
  | "filter"
  | "wand"
  | "compass";

export function Icon({ name, ...rest }: Props) {
  const props = { ...base, ...rest };
  switch (name) {
    case "home":
      return (
        <svg {...props}>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" />
          <path d="M9 4v14M15 6v14" />
        </svg>
      );
    case "list":
      return (
        <svg {...props}>
          <path d="M8 6h13M8 12h13M8 18h13" />
          <circle cx="3.5" cy="6" r="1.2" />
          <circle cx="3.5" cy="12" r="1.2" />
          <circle cx="3.5" cy="18" r="1.2" />
        </svg>
      );
    case "play":
      return (
        <svg {...props}>
          <path d="M6 4l14 8-14 8V4z" />
        </svg>
      );
    case "stats":
      return (
        <svg {...props}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      );
    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.4 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.4l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M5 12l5 5L20 6" />
        </svg>
      );
    case "lock":
      return (
        <svg {...props}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 1 1 8 0v4" />
        </svg>
      );
    case "star":
      return (
        <svg {...props}>
          <path d="M12 3l2.9 6 6.6.6-5 4.6 1.5 6.5L12 17l-5.9 3.7L7.6 14l-5-4.5L9.1 9 12 3z" />
        </svg>
      );
    case "starFilled":
      return (
        <svg {...props} fill="currentColor">
          <path d="M12 3l2.9 6 6.6.6-5 4.6 1.5 6.5L12 17l-5.9 3.7L7.6 14l-5-4.5L9.1 9 12 3z" />
        </svg>
      );
    case "fire":
      return (
        <svg {...props}>
          <path d="M12 3s4 4 4 8a4 4 0 1 1-8 0c0-2 2-3 2-5s2-3 2-3z" />
          <path d="M8 14a4 4 0 1 0 8 0" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...props}>
          <path d="M13 2L3 14h7l-1 8 11-14h-7l0-6z" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...props}>
          <path d="M5 19c-1 1-2 4-2 4s3-1 4-2" />
          <path d="M14 4l6 6-9 9-3-3 6-12z" />
          <circle cx="15" cy="9" r="1.4" />
        </svg>
      );
    case "back":
      return (
        <svg {...props}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      );
    case "next":
      return (
        <svg {...props}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" />
        </svg>
      );
    case "trash":
      return (
        <svg {...props}>
          <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...props}>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 4v4h-4" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 20v-4h4" />
        </svg>
      );
    case "save":
      return (
        <svg {...props}>
          <path d="M5 3h12l4 4v14H3V5a2 2 0 0 1 2-2z" />
          <path d="M7 3v6h10V3M7 21v-7h10v7" />
        </svg>
      );
    case "copy":
      return (
        <svg {...props}>
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...props}>
          <path d="M8 4h8v6a4 4 0 0 1-8 0V4z" />
          <path d="M4 6H2v3a3 3 0 0 0 3 3M20 6h2v3a3 3 0 0 1-3 3M9 17h6M10 21h4M12 14v3" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z" />
          <path d="M4 17a3 3 0 0 1 3-3h11" />
        </svg>
      );
    case "alert":
      return (
        <svg {...props}>
          <path d="M12 3l10 18H2L12 3z" />
          <path d="M12 10v5M12 18v.5" />
        </svg>
      );
    case "close":
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "filter":
      return (
        <svg {...props}>
          <path d="M3 5h18l-7 9v6l-4-2v-4L3 5z" />
        </svg>
      );
    case "wand":
      return (
        <svg {...props}>
          <path d="M3 21l12-12M14 4l2 2M19 9l2 2M16 12l2 2" />
        </svg>
      );
    case "compass":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M16 8l-2 6-6 2 2-6 6-2z" />
        </svg>
      );
  }
}
