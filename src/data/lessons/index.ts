import type { Chapter, Lesson, LessonLevel } from "../../types/lesson";
import { beginnerLessons } from "./beginner";
import { intermediateLessons } from "./intermediate";
import { advancedLessons } from "./advanced";

export const allLessons: Lesson[] = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...advancedLessons,
];

export const lessonsByLevel: Record<LessonLevel, Lesson[]> = {
  beginner: beginnerLessons,
  intermediate: intermediateLessons,
  advanced: advancedLessons,
};

export function getLesson(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id);
}

function idsByChapter(arr: Lesson[], chapter: string) {
  return arr.filter((l) => l.chapter === chapter).map((l) => l.id);
}

export const chapters: Chapter[] = [
  // Beginner
  {
    id: "b-c1",
    level: "beginner",
    title: "Chapter 1：CSSの入口",
    description: "CSSの役割、書き方、セレクタの基本。",
    lessonIds: idsByChapter(beginnerLessons, "CSSの入口"),
  },
  {
    id: "b-c2",
    level: "beginner",
    title: "Chapter 2：文字と色",
    description: "color, font-size, font-weight, line-height などの基本。",
    lessonIds: idsByChapter(beginnerLessons, "文字と色"),
  },
  {
    id: "b-c3",
    level: "beginner",
    title: "Chapter 3：余白とサイズ",
    description: "width / height / margin / padding / 単位を扱う。",
    lessonIds: idsByChapter(beginnerLessons, "余白とサイズ"),
  },
  {
    id: "b-c4",
    level: "beginner",
    title: "Chapter 4：ボックスモデル",
    description: "border, radius, shadow, box-sizing, display の理解。",
    lessonIds: idsByChapter(beginnerLessons, "ボックスモデル"),
  },
  {
    id: "b-c5",
    level: "beginner",
    title: "Chapter 5：ボタンとカード",
    description: "実用UI部品としてのボタン・カードを作る。",
    lessonIds: idsByChapter(beginnerLessons, "ボタンとカード"),
  },
  {
    id: "b-c6",
    level: "beginner",
    title: "Chapter 6：画像と背景",
    description: "画像の整え方、背景色・背景画像、色の指定方法。",
    lessonIds: idsByChapter(beginnerLessons, "画像と背景"),
  },
  {
    id: "b-c7",
    level: "beginner",
    title: "Chapter 7：プロフィールカード制作",
    description: "ここまでの知識を統合して、最初の作品を仕上げる。",
    lessonIds: idsByChapter(beginnerLessons, "プロフィールカード制作"),
  },

  // Intermediate
  {
    id: "i-c1",
    level: "intermediate",
    title: "Chapter 1：Flexbox",
    description: "横並びと整列の主役、Flexbox を使い倒す。",
    lessonIds: idsByChapter(intermediateLessons, "Flexbox"),
  },
  {
    id: "i-c2",
    level: "intermediate",
    title: "Chapter 2：Grid",
    description: "二次元レイアウトと自動列数、auto-fit/minmax を扱う。",
    lessonIds: idsByChapter(intermediateLessons, "Grid"),
  },
  {
    id: "i-c3",
    level: "intermediate",
    title: "Chapter 3：レスポンシブデザイン",
    description: "media query / mobile first / clamp / max-width。",
    lessonIds: idsByChapter(intermediateLessons, "レスポンシブデザイン"),
  },
  {
    id: "i-c4",
    level: "intermediate",
    title: "Chapter 4：positionと重なり",
    description: "relative / absolute / fixed / z-index / overflow / object-fit。",
    lessonIds: idsByChapter(intermediateLessons, "positionと重なり"),
  },
  {
    id: "i-c5",
    level: "intermediate",
    title: "Chapter 5：疑似クラス・疑似要素",
    description: ":hover / :focus / :nth-child / ::before / ::after。",
    lessonIds: idsByChapter(intermediateLessons, "疑似クラス・疑似要素"),
  },
  {
    id: "i-c6",
    level: "intermediate",
    title: "Chapter 6：実践UI制作",
    description: "ボタン状態 / ナビ / モーダル / タブ / アコーディオン / カード一覧 / LP / 商品カード。",
    lessonIds: idsByChapter(intermediateLessons, "実践UI制作"),
  },
  {
    id: "i-c7",
    level: "intermediate",
    title: "Chapter 7：React / Tailwindへの接続",
    description: "ReactコンポーネントやTailwindとの橋渡しを学ぶ。",
    lessonIds: idsByChapter(intermediateLessons, "React / Tailwindへの接続"),
  },

  // Advanced
  {
    id: "a-c1",
    level: "advanced",
    title: "Chapter 1：CSS設計",
    description: "再利用・拡張・破綻防止のための設計思想。",
    lessonIds: idsByChapter(advancedLessons, "CSS設計"),
  },
  {
    id: "a-c2",
    level: "advanced",
    title: "Chapter 2：詳細度とカスケード",
    description: "詳細度・カスケード・継承・!important対策。",
    lessonIds: idsByChapter(advancedLessons, "詳細度とカスケード"),
  },
  {
    id: "a-c3",
    level: "advanced",
    title: "Chapter 3：デザインシステム",
    description: "BEM, CSS Modules, トークン, 色/余白/タイポ設計。",
    lessonIds: idsByChapter(advancedLessons, "デザインシステム"),
  },
  {
    id: "a-c4",
    level: "advanced",
    title: "Chapter 4：アクセシビリティ",
    description: "色だけに頼らない、focus-visible、コントラスト、motion-reduce。",
    lessonIds: idsByChapter(advancedLessons, "アクセシビリティ"),
  },
  {
    id: "a-c5",
    level: "advanced",
    title: "Chapter 5：アニメーション",
    description: "transition / @keyframes / transform / sticky / snap / glass。",
    lessonIds: idsByChapter(advancedLessons, "アニメーション"),
  },
  {
    id: "a-c6",
    level: "advanced",
    title: "Chapter 6：パフォーマンス",
    description: "GPU活用、CLS対策、画像最適化、軽いCSSの書き方。",
    lessonIds: idsByChapter(advancedLessons, "パフォーマンス"),
  },
  {
    id: "a-c7",
    level: "advanced",
    title: "Chapter 7：最終制作",
    description: "大規模CSSの守り方と、レスポンシブLPの最終課題。",
    lessonIds: idsByChapter(advancedLessons, "最終制作"),
  },
];

export const chaptersByLevel: Record<LessonLevel, Chapter[]> = {
  beginner: chapters.filter((c) => c.level === "beginner"),
  intermediate: chapters.filter((c) => c.level === "intermediate"),
  advanced: chapters.filter((c) => c.level === "advanced"),
};
