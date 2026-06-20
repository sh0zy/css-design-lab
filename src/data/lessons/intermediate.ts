import type { Lesson } from "../../types/lesson";

const L = (
  n: number,
  data: Omit<Lesson, "id" | "level"> & { id?: string }
): Lesson => ({
  id: data.id ?? `i-${String(n).padStart(3, "0")}`,
  level: "intermediate",
  ...data,
});

export const intermediateLessons: Lesson[] = [
  L(1, {
    chapter: "Flexbox",
    category: "Flex",
    title: "Flexboxとは",
    description: "横並び・整列レイアウトの定番、Flexboxの全体像を掴みます。",
    goals: ["display: flex; だけで横並びになる", "Flexの主な役割を一言で言える"],
    webUseCase:
      "ヘッダー、カードの中身、ボタン群、ナビゲーション。横方向の整列はFlex一強です。",
    htmlConnection: "親に display: flex を当てる → 子要素が横並びになる。",
    jsReactConnection: "Reactで <div className=\"flex\">…</div> でレイアウトを組むのが定番。",
    tailwindConnection: "flex, items-center, justify-between など、Flex系クラスが豊富。",
    explanation:
      "Flexboxは『一方向の整列』を簡単にする仕組み。親(=コンテナ)に display: flex を当て、子要素を行または列で並べます。",
    cssFileName: "style.css",
    cssExample: `.row {
  display: flex;
  gap: 12px;
}`,
    htmlExample: `<div class="row">
  <div>A</div><div>B</div><div>C</div>
</div>`,
    previewDescription: "縦に積まれていた3つのdivが、横並びになり12pxの隙間ができます。",
    visualChange: "display:flex で『縦積み → 横並び』に変わる。",
    codeExplanation: ["親に display: flex。", "gap で子の間隔を作る。"],
    commonMistakes: ["子に flex を当ててしまう（親に当てるのが正解）"],
    practice: {
      title: "横並び",
      task: ".row を Flex で横並びにし、gap 12px を入れてください。",
      hint: "display: flex; gap: 12px;",
      answer: `.row { display: flex; gap: 12px; }`,
    },
    quiz: {
      question: "Flex を効かせる場所は？",
      choices: ["子要素", "親要素", "html", "body"],
      answerIndex: 1,
      explanation: "親（コンテナ）に display: flex を当てます。",
    },
    estimatedMinutes: 6,
    difficulty: 2,
  }),

  L(2, {
    chapter: "Flexbox",
    category: "Flex",
    title: "justify-content",
    description: "Flexの主軸方向の整列を決めます。",
    goals: [
      "flex-start / center / space-between が使える",
    ],
    webUseCase: "ヘッダーの『ロゴ：左、メニュー：右』はjustify-content: space-betweenが定番。",
    htmlConnection: "親に flex を当てた状態で使う。",
    jsReactConnection: "Reactでも className=\"justify-between\" のように使う。",
    tailwindConnection: "justify-start / justify-center / justify-between / justify-around / justify-evenly。",
    explanation:
      "justify-content は主軸（デフォルトは横）方向の整列。center で中央、space-between で両端ぞろえ。",
    cssFileName: "style.css",
    cssExample: `.bar {
  display: flex;
  justify-content: space-between;
}`,
    htmlExample: `<div class="bar">
  <div>logo</div>
  <div>menu</div>
</div>`,
    previewDescription: "ロゴが左、メニューが右に分かれて配置されます。",
    visualChange: "space-between は両端寄せ＋間に等間隔の空き。",
    codeExplanation: ["主軸方向は flex-direction で決まる（既定はrow）。"],
    commonMistakes: ["flex を当てずに justify-content を書いてしまう"],
    practice: {
      title: "両端寄せ",
      task: ".header を space-between にしてください。",
      hint: "justify-content。",
      answer: `.header { display: flex; justify-content: space-between; }`,
    },
    quiz: {
      question: "両端寄せの値は？",
      choices: ["between", "space-between", "edge", "stretch"],
      answerIndex: 1,
      explanation: "space-between が両端寄せ。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(3, {
    chapter: "Flexbox",
    category: "Flex",
    title: "align-items",
    description: "Flexの交差軸方向の整列を決めます。",
    goals: ["align-items: center を使える", "縦中央寄せの定番が書ける"],
    webUseCase: "アイコン＋テキストを縦中央で揃えるのは定番。",
    htmlConnection: "<div class=\"row\"><Icon /><span>テキスト</span></div> のような構造。",
    jsReactConnection: "icon + label の小さい部品で頻繁に使う。",
    tailwindConnection: "items-center, items-start, items-end。",
    explanation:
      "align-items は交差軸（rowなら縦）方向の整列。center で縦中央寄せ。",
    cssFileName: "style.css",
    cssExample: `.row {
  display: flex;
  align-items: center;
  gap: 8px;
}`,
    htmlExample: `<div class="row">
  <span class="icon">★</span>
  <span>お気に入り</span>
</div>`,
    previewDescription: "星マークと文字が縦のラインで揃います。",
    visualChange: "上端 → 中央へ、視線が揃って気持ちよくなる。",
    codeExplanation: ["align-items が交差軸方向の整列。", "row のときは縦方向、column のときは横方向。"],
    commonMistakes: ["justify-content と取り違える"],
    practice: {
      title: "縦中央",
      task: ".row を縦中央寄せにしてください。",
      hint: "align-items。",
      answer: `.row { display: flex; align-items: center; }`,
    },
    quiz: {
      question: "Flexの縦中央寄せに使うのは？",
      choices: ["justify-content", "align-items", "text-align", "vertical-align"],
      answerIndex: 1,
      explanation: "縦方向（交差軸）は align-items。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(4, {
    chapter: "Flexbox",
    category: "Flex",
    title: "gap",
    description: "Flex/Gridの子要素間の隙間。margin不要。",
    goals: ["gap で間隔を作るシンプルさを体感する"],
    webUseCase: "カード一覧の隙間、ナビメニューの間隔、フォームの行間。",
    htmlConnection: "親に gap を書くだけ、子に margin は要らない。",
    jsReactConnection: "Reactで gap-4 のクラスをつけるだけで完成。",
    tailwindConnection: "gap-2, gap-4, gap-6。",
    explanation:
      "gap は子の間に入る隙間。row方向 / column方向 まとめて指定できるため、margin で個別に作るよりずっと楽。",
    cssFileName: "style.css",
    cssExample: `.list {
  display: flex;
  gap: 12px;
}`,
    htmlExample: `<div class="list">
  <div>A</div><div>B</div><div>C</div>
</div>`,
    previewDescription: "ABCの間に12pxの均等な隙間ができます。",
    visualChange: "間隔がきれいに揃う。",
    codeExplanation: ["gap は親に1ヶ所書くだけで全部の間に効く。"],
    commonMistakes: ["子に margin を書いて、両端だけ余分に空く"],
    practice: {
      title: "16px の gap",
      task: ".grid に gap: 16px を入れてください。",
      hint: "gap。",
      answer: `.grid { display: flex; gap: 16px; }`,
    },
    quiz: {
      question: "Flex/Gridの隙間に使うのは？",
      choices: ["margin", "padding", "gap", "border-spacing"],
      answerIndex: 2,
      explanation: "gap が現代的で楽。",
    },
    estimatedMinutes: 4,
    difficulty: 2,
  }),

  L(5, {
    chapter: "Flexbox",
    category: "Flex",
    title: "flex-direction",
    description: "Flexの並ぶ方向を行/列に切り替えます。",
    goals: ["row と column の違いがわかる"],
    webUseCase: "スマホでは縦積み、PCでは横並び、というレスポンシブの基本に使う。",
    htmlConnection: "親の flex-direction を切り替えるだけ。",
    jsReactConnection: "メディアクエリで切り替えるのが定番。",
    tailwindConnection: "flex-row, flex-col。",
    explanation:
      "flex-direction: row（既定・横）、column（縦）、row-reverse、column-reverse。",
    cssFileName: "style.css",
    cssExample: `.col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}`,
    htmlExample: `<div class="col">
  <div>1</div><div>2</div><div>3</div>
</div>`,
    previewDescription: "縦に積まれた3つの要素になります。",
    visualChange: "row だと横、column だと縦に積む。",
    codeExplanation: ["column にすると主軸が縦に切り替わる。"],
    commonMistakes: ["column にしたとき justify と align の役割が逆になることに気づかない"],
    practice: {
      title: "縦積み",
      task: ".col を flex-direction: column にしてください。",
      hint: "flex-direction。",
      answer: `.col { display: flex; flex-direction: column; }`,
    },
    quiz: {
      question: "縦に積むときの値は？",
      choices: ["row", "column", "vertical", "stack"],
      answerIndex: 1,
      explanation: "column です。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(6, {
    chapter: "Flexbox",
    category: "Flex",
    title: "flex-wrap",
    description: "子要素の折り返しの有無を決めます。",
    goals: ["flex-wrap: wrap でカードグリッドが書ける"],
    webUseCase: "カード一覧で『画面幅に応じて折り返し』を作りたい時の基本。",
    htmlConnection: "親に flex-wrap: wrap を入れるだけ。",
    jsReactConnection: "Reactでも同じ。Tailwindなら flex-wrap。",
    tailwindConnection: "flex-wrap, flex-nowrap。",
    explanation:
      "flex-wrap: nowrap（既定）だと1行に詰める。wrap だと折り返す。レスポンシブの基本。",
    cssFileName: "style.css",
    cssExample: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.cards > * {
  flex: 1 1 200px;
}`,
    htmlExample: `<div class="cards">
  <div>1</div><div>2</div><div>3</div><div>4</div>
</div>`,
    previewDescription: "幅に合わせて、カードが2列、3列、4列と折り返されます。",
    visualChange: "1行に詰まる→画面幅で自然に折り返す。",
    codeExplanation: ["flex: 1 1 200px は『最低200pxで伸び縮み』の指定。"],
    commonMistakes: ["wrap を忘れてはみ出す", "子の幅を固定しすぎてレスポンシブにならない"],
    practice: {
      title: "折り返しレイアウト",
      task: ".cards に flex-wrap: wrap; を追加してください。",
      hint: "flex-wrap。",
      answer: `.cards { display: flex; flex-wrap: wrap; }`,
    },
    quiz: {
      question: "折り返したい時の値は？",
      choices: ["nowrap", "wrap", "break", "fit"],
      answerIndex: 1,
      explanation: "wrap で折り返します。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(7, {
    chapter: "Flexbox",
    category: "Flex",
    title: "flex-grow / flex-shrink / flex-basis",
    description: "子要素の伸び縮みのルールを設定します。",
    goals: ["flex: 1 の意味がわかる"],
    webUseCase: "アイコン以外を残り全部使って広げたいときに使う。",
    htmlConnection: "子に flex プロパティを書く。",
    jsReactConnection: "状態で flex を切り替えると、エクスパンドUIが作れる。",
    tailwindConnection: "flex-1, flex-none, basis-32。",
    explanation:
      "flex: 1 1 0 は『grow=1, shrink=1, basis=0』の意味。flex: 1 と書けば残り空間を均等に取り合う。",
    cssFileName: "style.css",
    cssExample: `.bar { display: flex; gap: 8px; }
.icon { flex: 0 0 32px; }
.text { flex: 1 1 0; }`,
    htmlExample: `<div class="bar">
  <div class="icon">★</div>
  <div class="text">本文の領域が伸びる</div>
</div>`,
    previewDescription: "アイコンは32px固定、テキストが残り全部の幅を使います。",
    visualChange: "サイドバー＋本文のような『一部固定・残り伸縮』が作れる。",
    codeExplanation: [
      "flex-grow=1 で『余白を分配して広がる』。",
      "flex-shrink=1 で『足りないとき縮む』。",
      "flex-basis は基本サイズ。",
    ],
    commonMistakes: ["flex: 1 を子全部に入れて意図と違う比率になる"],
    practice: {
      title: "残り全部",
      task: ".text を flex: 1 にしてください。",
      hint: "flex プロパティ。",
      answer: `.text { flex: 1; }`,
    },
    quiz: {
      question: "flex: 1 の意味は？",
      choices: [
        "サイズ1px",
        "残り余白を均等に広げる",
        "縮まない",
        "1番目の要素",
      ],
      answerIndex: 1,
      explanation: "flex: 1 は残り余白を取り合う指定。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(8, {
    chapter: "Grid",
    category: "Grid",
    title: "Gridとは",
    description: "縦横どちらも揃える、二次元のレイアウト。",
    goals: ["Grid の使い所がわかる", "Flex との違いを言える"],
    webUseCase: "カードグリッド、複雑なレイアウト、ダッシュボード。",
    htmlConnection: "親に display: grid。",
    jsReactConnection: "ダッシュボードや表っぽいUIで使うと強力。",
    tailwindConnection: "grid, grid-cols-2, gap-4。",
    explanation:
      "Flex は『1方向』、Grid は『縦横2方向』を一気に整える。複雑なレイアウトはGrid 一択。",
    cssFileName: "style.css",
    cssExample: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}`,
    htmlExample: `<div class="grid">
  <div>1</div><div>2</div><div>3</div>
  <div>4</div><div>5</div><div>6</div>
</div>`,
    previewDescription: "3列・2行のカードグリッドが作れます。",
    visualChange: "縦も横も等間隔に揃う。",
    codeExplanation: [
      "grid-template-columns: repeat(3, 1fr) で『等幅3列』。",
      "1fr は『余りスペースの1分』。",
    ],
    commonMistakes: ["1fr を px と混同する"],
    practice: {
      title: "3列グリッド",
      task: ".grid に grid-template-columns: repeat(3, 1fr) を指定してください。",
      hint: "Gridの基本。",
      answer: `.grid { display: grid; grid-template-columns: repeat(3, 1fr); }`,
    },
    quiz: {
      question: "Gridを始める指定は？",
      choices: ["display: flex;", "display: grid;", "grid: 1;", "layout: grid;"],
      answerIndex: 1,
      explanation: "display: grid。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(9, {
    chapter: "Grid",
    category: "Grid",
    title: "grid-template-columns",
    description: "列数と各列の幅を決めます。",
    goals: ["repeat と 1fr が読める"],
    webUseCase: "カード一覧、ダッシュボードの左メニュー＋本文。",
    htmlConnection: "Gridコンテナの基本設定。",
    jsReactConnection: "メディアクエリで列数を変えるとレスポンシブに。",
    tailwindConnection: "grid-cols-2, grid-cols-3。",
    explanation:
      "1fr は余りスペースの分配単位。repeat(3, 1fr) は『1fr を3つ』の略記。",
    cssFileName: "style.css",
    cssExample: `.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}`,
    htmlExample: `<div class="layout">
  <aside>サイドバー</aside>
  <main>本文</main>
</div>`,
    previewDescription: "左200pxのサイドバー、残りが本文という2カラムが作れます。",
    visualChange: "1fr が『残り全部』として効く。",
    codeExplanation: ["最初は固定px、最後は1frで残り。", "repeat() で同じ値を繰り返せる。"],
    commonMistakes: ["1fr と % を混在させて意図しない幅になる"],
    practice: {
      title: "2カラム",
      task: ".layout に左240px・残り1fr を設定してください。",
      hint: "grid-template-columns。",
      answer: `.layout { display: grid; grid-template-columns: 240px 1fr; }`,
    },
    quiz: {
      question: "repeat(3, 1fr) は？",
      choices: ["3行", "等幅3列", "幅1pxを3個", "3つの1rem"],
      answerIndex: 1,
      explanation: "等幅の3列です。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(10, {
    chapter: "Grid",
    category: "Grid",
    title: "grid-template-rows / grid gap",
    description: "行の指定と、行と列の隙間を決めます。",
    goals: ["row 指定と gap の使い分けができる"],
    webUseCase: "ダッシュボードの上部・本文・フッターの3行構成。",
    htmlConnection: "Gridコンテナで設定する。",
    jsReactConnection: "レイアウト用の <Grid> コンポーネントを作る土台。",
    tailwindConnection: "grid-rows-3, gap-4。",
    explanation:
      "grid-template-rows: 60px 1fr 60px のような書き方。gap で行間と列間をまとめて指定。",
    cssFileName: "style.css",
    cssExample: `.app {
  display: grid;
  grid-template-rows: 56px 1fr 56px;
  gap: 8px;
  height: 100dvh;
}`,
    htmlExample: `<div class="app">
  <header>Header</header>
  <main>Main</main>
  <nav>BottomNav</nav>
</div>`,
    previewDescription: "上下56px固定、中央が画面いっぱいの3行レイアウトに。",
    visualChange: "アプリの基本骨格が一気にできる。",
    codeExplanation: ["100dvh は動的なビューポート高さ。スマホで便利。"],
    commonMistakes: ["100vh だと iOS Safari で挙動が崩れる場面がある"],
    practice: {
      title: "3行構成",
      task: ".app に grid-template-rows: 64px 1fr 64px を指定してください。",
      hint: "grid-template-rows。",
      answer: `.app { display: grid; grid-template-rows: 64px 1fr 64px; }`,
    },
    quiz: {
      question: "Gridの行と列の隙間に使うのは？",
      choices: ["margin", "gap", "spacing", "border-spacing"],
      answerIndex: 1,
      explanation: "Grid でも gap が使えます。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(11, {
    chapter: "レスポンシブデザイン",
    category: "レスポンシブ",
    title: "レスポンシブデザインとは",
    description: "画面サイズに応じてレイアウトが変化するUI設計です。",
    goals: ["Mobile/Tablet/PC で見せ方を変える発想を得る"],
    webUseCase: "モバイル7割、PC3割の今、レスポンシブは必須。",
    htmlConnection: "1つのHTMLで複数サイズに対応する。",
    jsReactConnection: "JSで判定するより、CSSのメディアクエリでやるのが基本。",
    tailwindConnection: "sm:, md:, lg: の prefix。",
    explanation:
      "media query を使い、画面幅に応じてCSSを切り替える。現代は『モバイルを基本に書き、広い画面で上書き』という考え方（モバイルファースト）。",
    cssFileName: "style.css",
    cssExample: `.cards { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 600px) {
  .cards { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 960px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}`,
    htmlExample: `<div class="cards">
  <div>1</div><div>2</div><div>3</div>
</div>`,
    previewDescription: "スマホ1列、タブレット2列、PC3列に変化します。",
    visualChange: "ウィンドウ幅で並びが切り替わる。",
    codeExplanation: ["min-width で『◯px以上で〜』というルールを書ける。"],
    commonMistakes: ["max-width だらけで読みづらくなる（モバイルファースト推奨）"],
    practice: {
      title: "2段階の切替",
      task: ".cards をスマホ1列、600px以上で2列にしてください。",
      hint: "media query。",
      answer: `.cards { grid-template-columns: 1fr; }
@media (min-width: 600px) { .cards { grid-template-columns: 1fr 1fr; } }`,
    },
    quiz: {
      question: "モバイルファーストとは？",
      choices: [
        "PC基準で書いて狭い時に上書き",
        "モバイル基準で書いて広い時に上書き",
        "モバイル専用にする",
        "PCを無視する",
      ],
      answerIndex: 1,
      explanation: "モバイルが基準、広い画面は上書き。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(12, {
    chapter: "レスポンシブデザイン",
    category: "レスポンシブ",
    title: "media query",
    description: "画面サイズや特性に応じてCSSを切り替える機能です。",
    goals: ["@media (min-width: 600px) の書き方を覚える"],
    webUseCase: "モバイルのナビは縦、PCは横、のような切り替えに必須。",
    htmlConnection: "1つのCSSで複数サイズに対応できる。",
    jsReactConnection: "useEffect でリサイズを監視するより、CSSが軽くて速い。",
    tailwindConnection: "sm:flex md:grid lg:gap-8。",
    explanation:
      "@media (min-width: 600px) { .... } の中に書いたCSSは、画面幅600px以上のときだけ効く。",
    cssFileName: "style.css",
    cssExample: `.menu { display: none; }
@media (min-width: 768px) {
  .menu { display: flex; }
}`,
    htmlExample: `<nav class="menu">PC用メニュー</nav>`,
    previewDescription: "768px未満のとき非表示、それ以上で表示されます。",
    visualChange: "条件に応じてCSSがON/OFFされる。",
    codeExplanation: ["min-width は『以上』、max-width は『以下』。"],
    commonMistakes: ["min-width と max-width を混同する"],
    practice: {
      title: "PCのみ表示",
      task: ".pc-only を 1024px以上で display: block にしてください。",
      hint: "@media (min-width: 1024px)。",
      answer: `@media (min-width: 1024px) { .pc-only { display: block; } }`,
    },
    quiz: {
      question: "min-width: 768px は？",
      choices: ["768px以下", "768px以上", "768px丁度", "768pxを除外"],
      answerIndex: 1,
      explanation: "min-width は『以上』。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(13, {
    chapter: "レスポンシブデザイン",
    category: "レスポンシブ",
    title: "mobile first の書き方",
    description: "スマホ用CSSを基本に、広い画面で上書きするスタイル。",
    goals: ["min-width で段階的に拡張できる"],
    webUseCase: "スマホUIから設計するのが自然な順序。",
    htmlConnection: "1つの構造で全部対応。",
    jsReactConnection: "コンポーネント構造もモバイルファーストで考えるのがおすすめ。",
    tailwindConnection: "Tailwindの prefix（sm: md: lg:）はそのままモバイルファースト思想。",
    explanation:
      "ベースのCSSがスマホ。@media (min-width: 〜)で段階的に上書きする書き方。",
    cssFileName: "style.css",
    cssExample: `.title { font-size: 22px; }
@media (min-width: 768px) { .title { font-size: 28px; } }
@media (min-width: 1200px) { .title { font-size: 36px; } }`,
    htmlExample: `<h1 class="title">レスポンシブな見出し</h1>`,
    previewDescription: "幅に応じて見出しのサイズが3段階に変わります。",
    visualChange: "段階的にサイズアップ。",
    codeExplanation: ["小さい順に書くのがコツ。"],
    commonMistakes: ["pcから書き始めて、media queryだらけになる"],
    practice: {
      title: "見出しのサイズ階段",
      task: ".title を 22→28→36px の順に切り替えてください。",
      hint: "min-width。",
      answer: `.title { font-size: 22px; }
@media (min-width: 768px) { .title { font-size: 28px; } }`,
    },
    quiz: {
      question: "モバイルファーストの基準値は？",
      choices: ["min-width: 1280px", "min-width: 0（既定）", "max-width: 1280px", "media: print"],
      answerIndex: 1,
      explanation: "ベースが既定、広い画面で上書き。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(14, {
    chapter: "レスポンシブデザイン",
    category: "レスポンシブ",
    title: "max-width / min-width / container",
    description: "幅の上限と下限。読みやすい行幅は約65文字。",
    goals: ["max-width: 720px のような『読みやすい幅』を意識できる"],
    webUseCase: "本文が広がりすぎると読みにくい。max-widthで止めるのが定番。",
    htmlConnection: "コンテナ用divに max-width を入れて中央寄せ。",
    jsReactConnection: "<Container>コンポーネントで囲うのが定番。",
    tailwindConnection: "max-w-md, max-w-3xl。",
    explanation:
      "max-width は『これ以上広がらない』、min-width は『これ以下にならない』。コンテンツ幅は720〜960pxくらいが読みやすい。",
    cssFileName: "style.css",
    cssExample: `.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px;
}`,
    htmlExample: `<div class="container">本文</div>`,
    previewDescription: "PCでも幅720pxで止まり、中央寄せに。",
    visualChange: "本文が広がりすぎず読みやすく。",
    codeExplanation: ["max-width と margin: 0 auto はセットで使うのが定番。"],
    commonMistakes: ["padding を入れず端ギリギリで読みづらい"],
    practice: {
      title: "コンテナ幅",
      task: ".container を最大720px・中央寄せにしてください。",
      hint: "max-width と margin。",
      answer: `.container { max-width: 720px; margin: 0 auto; }`,
    },
    quiz: {
      question: "本文の読みやすい幅の目安は？",
      choices: ["1200px以上", "720px前後", "300px", "1ピクセル"],
      answerIndex: 1,
      explanation: "65文字前後が読みやすい→だいたい720px。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(15, {
    chapter: "レスポンシブデザイン",
    category: "レスポンシブ",
    title: "clamp() で可変サイズ",
    description: "minとmaxの間で滑らかに変化するサイズ指定です。",
    goals: ["clamp() の意味と使い方がわかる"],
    webUseCase: "見出しが画面幅に応じてなめらかに大きくなる『流体タイポグラフィ』。",
    htmlConnection: "見出し・コンテナ幅などに使う。",
    jsReactConnection: "JSでリサイズを監視しなくても、CSSだけで流動UIになる。",
    tailwindConnection: "Tailwindでも arbitrary value で text-[clamp(...)] が使える。",
    explanation:
      "clamp(min, preferred, max) で『最小・基準・最大』を一度に指定。media query が要らなくなることも。",
    cssFileName: "style.css",
    cssExample: `.title {
  font-size: clamp(20px, 4vw, 36px);
}`,
    htmlExample: `<h1 class="title">流体タイポ</h1>`,
    previewDescription: "幅が狭い時20px、広いと36pxまで連続的にサイズが変わります。",
    visualChange: "段階ではなく連続的に変わる。",
    codeExplanation: ["4vw は『画面幅の4%』。", "min と max で範囲を制限する。"],
    commonMistakes: ["minとmaxが逆", "vw だけで小さすぎる"],
    practice: {
      title: "見出しを流体に",
      task: ".heading を clamp(18px, 3vw, 28px) にしてください。",
      hint: "clamp。",
      answer: `.heading { font-size: clamp(18px, 3vw, 28px); }`,
    },
    quiz: {
      question: "clamp() の3つの値の意味は？",
      choices: [
        "min, preferred, max",
        "max, min, preferred",
        "preferred, max, min",
        "値1, 値2, 値3 同じ",
      ],
      answerIndex: 0,
      explanation: "min, preferred, max の順。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(16, {
    chapter: "positionと重なり",
    category: "Position",
    title: "position: relative",
    description: "通常配置のままで、位置の基準になります。",
    goals: ["relative は『基準』だと理解する"],
    webUseCase: "親に relative を付けて、子に absolute を使うパターンが定番。",
    htmlConnection: "親のdivに relative を当てる。",
    jsReactConnection: "Tooltip, Popover などのコンポーネント設計で必須。",
    tailwindConnection: "relative。",
    explanation:
      "relative は通常の位置のまま。top/left を書くと自分の元の位置から動く。子要素の absolute の基準にもなる。",
    cssFileName: "style.css",
    cssExample: `.parent {
  position: relative;
}`,
    htmlExample: `<div class="parent">
  <div class="badge">NEW</div>
</div>`,
    previewDescription: "見た目は変わらないが、子の絶対配置の基準になる準備が整います。",
    visualChange: "見た目自体は変わらない。",
    codeExplanation: ["relative は『そこにいるけど、基準になる』ポジション。"],
    commonMistakes: ["子に absolute を当てたのに親に relative がない（body基準になる）"],
    practice: {
      title: "親に relative",
      task: ".card を position: relative にしてください。",
      hint: "position。",
      answer: `.card { position: relative; }`,
    },
    quiz: {
      question: "absolute の基準になるのは？",
      choices: ["body", "親に position が指定された要素", "html", "近くのspan"],
      answerIndex: 1,
      explanation: "親に position 指定があれば、それが基準になる。",
    },
    estimatedMinutes: 5,
    difficulty: 3,
  }),

  L(17, {
    chapter: "positionと重なり",
    category: "Position",
    title: "position: absolute",
    description: "親（relative の付いた要素）を基準に自由に配置できます。",
    goals: ["absolute + top/right で角に配置できる"],
    webUseCase: "バッジ、閉じるボタン、ホバー時のチップ。",
    htmlConnection: "親に relative、子に absolute がワンセット。",
    jsReactConnection: "Tooltip, Popover はこの組み合わせが基本。",
    tailwindConnection: "absolute, top-2, right-2。",
    explanation:
      "absolute は通常の流れから外れて、最も近い position 指定の親を基準に動く。",
    cssFileName: "style.css",
    cssExample: `.card { position: relative; }
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #EF4444;
  color: #fff;
  padding: 2px 6px;
  border-radius: 999px;
}`,
    htmlExample: `<div class="card">
  <span class="badge">NEW</span>
</div>`,
    previewDescription: "カードの右上にNEWバッジが固定で表示されます。",
    visualChange: "通常の流れから外れて、自由位置に配置できる。",
    codeExplanation: ["top, right, bottom, left で位置を決める。"],
    commonMistakes: ["親に relative を付け忘れて、画面全体の右上に飛ぶ"],
    practice: {
      title: "右上バッジ",
      task: ".badge を absolute、top:8px, right:8px に配置してください。",
      hint: "position: absolute。",
      answer: `.badge { position: absolute; top: 8px; right: 8px; }`,
    },
    quiz: {
      question: "absolute は何を基準に動く？",
      choices: ["親", "近くの position 指定の祖先", "body のみ", "画面"],
      answerIndex: 1,
      explanation: "最も近い position 指定の祖先が基準。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(18, {
    chapter: "positionと重なり",
    category: "Position",
    title: "position: fixed",
    description: "画面に対して固定。スクロールしても動かない。",
    goals: ["フローティングボタンや固定ヘッダーが作れる"],
    webUseCase: "スマホアプリのボトムナビ、戻るボタン、固定ヘッダー。",
    htmlConnection: "<header> や <nav> に fixed を当てるのが定番。",
    jsReactConnection: "Reactでも同じ使い方。z-index と組み合わせる。",
    tailwindConnection: "fixed, top-0, left-0, z-30。",
    explanation:
      "fixed は viewport（画面）が基準。スクロールしても位置が変わらない。",
    cssFileName: "style.css",
    cssExample: `.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 56px;
  background: #0F172A;
}`,
    htmlExample: `<header class="header">サイトロゴ</header>`,
    previewDescription: "ヘッダーが画面上部に貼り付き、スクロールしても動きません。",
    visualChange: "スクロールしても固定。",
    codeExplanation: ["top:0; left:0; right:0; で横幅いっぱい。"],
    commonMistakes: ["fixed のせいでコンテンツが下に隠れる（padding-top で逃がす）"],
    practice: {
      title: "固定ヘッダー",
      task: ".header を fixed・top 0・left 0・right 0 にしてください。",
      hint: "position: fixed。",
      answer: `.header { position: fixed; top: 0; left: 0; right: 0; }`,
    },
    quiz: {
      question: "fixed の基準は？",
      choices: ["親", "祖先", "viewport（画面）", "body の上端"],
      answerIndex: 2,
      explanation: "fixed は viewport 基準。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(19, {
    chapter: "positionと重なり",
    category: "Position",
    title: "z-index（重なりの順番）",
    description: "値が大きいほど前面に来ます。",
    goals: ["z-index の使いどころがわかる"],
    webUseCase: "モーダル、ドロップダウン、ツールチップ。",
    htmlConnection: "重なる要素に position と z-index をセットで指定。",
    jsReactConnection: "Modal や Drawer を作るときに必須。",
    tailwindConnection: "z-10, z-50。",
    explanation:
      "z-index は数字が大きいほど前。position が指定された要素にだけ効くのがポイント。",
    cssFileName: "style.css",
    cssExample: `.modal { position: fixed; inset: 0; z-index: 50; }
.backdrop { position: fixed; inset: 0; z-index: 40; background: rgba(0,0,0,.5); }`,
    htmlExample: `<div class="backdrop"></div>
<div class="modal">モーダル</div>`,
    previewDescription: "背景の半透明オーバーレイの上に、モーダルが表示されます。",
    visualChange: "前後関係が制御できる。",
    codeExplanation: ["position 指定がないと z-index は効かない。"],
    commonMistakes: ["z-index: 9999 を乱発して破綻する"],
    practice: {
      title: "前面に",
      task: ".modal を z-index: 50 にしてください。",
      hint: "z-index。",
      answer: `.modal { z-index: 50; }`,
    },
    quiz: {
      question: "z-index が効く条件は？",
      choices: ["全ての要素", "position が auto 以外", "Flexの子", "Gridの子"],
      answerIndex: 1,
      explanation: "position 指定が必要です。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(20, {
    chapter: "positionと重なり",
    category: "オーバーフロー",
    title: "overflow",
    description: "はみ出した内容をどう見せるかを決めます。",
    goals: ["hidden / scroll / auto の違いがわかる"],
    webUseCase: "横スクロールリスト、固定高さの本文エリア。",
    htmlConnection: "中身が多い要素に overflow を当てる。",
    jsReactConnection: "Drawer の中身が長くなったときの定番。",
    tailwindConnection: "overflow-hidden, overflow-x-auto。",
    explanation:
      "overflow: hidden は隠す、scroll は常時スクロールバー、auto は必要なら出る。",
    cssFileName: "style.css",
    cssExample: `.scroll-x {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: thin;
}`,
    htmlExample: `<div class="scroll-x">
  <div>1</div><div>2</div><div>3</div><div>4</div>
</div>`,
    previewDescription: "横にはみ出した分だけスクロールできるようになります。",
    visualChange: "横スワイプUIが作れる。",
    codeExplanation: ["overflow-x と overflow-y は別々に指定可。"],
    commonMistakes: ["親に高さがなくて scroll が効かない"],
    practice: {
      title: "横スクロール",
      task: ".tags に overflow-x: auto を入れてください。",
      hint: "overflow-x。",
      answer: `.tags { overflow-x: auto; }`,
    },
    quiz: {
      question: "はみ出しを切り取るのは？",
      choices: ["scroll", "auto", "hidden", "visible"],
      answerIndex: 2,
      explanation: "hidden で切り取り。",
    },
    estimatedMinutes: 5,
    difficulty: 3,
  }),

  L(21, {
    chapter: "positionと重なり",
    category: "画像",
    title: "object-fit / aspect-ratio",
    description: "画像の縦横比を保ったままトリミング、または比率を固定。",
    goals: ["cover/contain と aspect-ratio が使える"],
    webUseCase: "サムネイル一覧で画像の縦横比をきれいに揃える。",
    htmlConnection: "img タグに使う。",
    jsReactConnection: "Next.js Image とも相性が良い。",
    tailwindConnection: "aspect-square, aspect-video, object-cover。",
    explanation:
      "aspect-ratio: 16/9; object-fit: cover; のセットでサムネ画像が崩れない。",
    cssFileName: "style.css",
    cssExample: `.thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 12px;
}`,
    htmlExample: `<img class="thumb" src="/cover.jpg" alt="" />`,
    previewDescription: "16:9のサムネイル画像が、はみ出した分はトリミングされます。",
    visualChange: "比率が揃ってカード一覧がきれいに整列する。",
    codeExplanation: ["aspect-ratio で比率を固定、object-fit でトリミングルールを決める。"],
    commonMistakes: ["object-fit を抜いて画像が伸びる"],
    practice: {
      title: "正方形サムネ",
      task: ".square に aspect-ratio: 1 / 1; object-fit: cover; を指定。",
      hint: "1:1。",
      answer: `.square { aspect-ratio: 1/1; object-fit: cover; }`,
    },
    quiz: {
      question: "object-fit: cover は？",
      choices: ["全部表示", "中身いっぱいトリミング", "縮小して全部表示", "繰り返し"],
      answerIndex: 1,
      explanation: "cover は容器いっぱい埋めるためにはみ出しをトリミング。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(22, {
    chapter: "疑似クラス・疑似要素",
    category: "状態",
    title: ":hover / :focus / :active",
    description: "ユーザー操作に応じた状態を表します。",
    goals: ["3つの違いを言える"],
    webUseCase: "ボタン、リンク、入力欄。アクセシビリティに直結。",
    htmlConnection: "ほぼすべての操作可能要素に。",
    jsReactConnection: "JSで切り替えるよりCSSの方が速くて軽い。",
    tailwindConnection: "hover:, focus:, active:。",
    explanation:
      "hover はマウスが乗っている、focus はキーボード/タップでフォーカス中、active は押している瞬間。",
    cssFileName: "style.css",
    cssExample: `.btn:hover  { background: #3B82F6; }
.btn:focus  { outline: 2px solid #38BDF8; outline-offset: 2px; }
.btn:active { transform: translateY(1px); }`,
    htmlExample: `<button class="btn">操作してみよう</button>`,
    previewDescription: "ホバー、フォーカス、押下の3状態で見た目が変わります。",
    visualChange: "状態ごとに反応するUIに。",
    codeExplanation: [":focus はアクセシビリティに必須。", ":active は触感を伝える。"],
    commonMistakes: ["focus の outline を消してアクセシビリティ低下"],
    practice: {
      title: "押した時の沈み",
      task: ".btn:active で transform: translateY(1px); を入れてください。",
      hint: "active。",
      answer: `.btn:active { transform: translateY(1px); }`,
    },
    quiz: {
      question: "キーボードフォーカス時の状態は？",
      choices: [":hover", ":focus", ":active", ":visited"],
      answerIndex: 1,
      explanation: ":focus がそれです。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(23, {
    chapter: "疑似クラス・疑似要素",
    category: "セレクタ",
    title: ":nth-child",
    description: "兄弟の中の何番目かを条件にスタイルを当てます。",
    goals: ["nth-child(odd/even/3n) の使い方"],
    webUseCase: "ストライプ表、3つに1つ強調するUI。",
    htmlConnection: "ul の li に交互の色を付けるなど。",
    jsReactConnection: "JS で計算しなくてもCSSだけで縞模様。",
    tailwindConnection: "odd:, even: が便利。",
    explanation: "li:nth-child(odd) で奇数番目、even で偶数番目。3n は3の倍数。",
    cssFileName: "style.css",
    cssExample: `li:nth-child(odd) { background: #18222F; }
li:nth-child(even) { background: #111827; }`,
    htmlExample: `<ul>
  <li>A</li><li>B</li><li>C</li><li>D</li>
</ul>`,
    previewDescription: "リストの行が交互に背景色違いになります。",
    visualChange: "縞模様のリストに。",
    codeExplanation: ["odd/even は読みやすい縞模様の鉄板。"],
    commonMistakes: ["nth-of-type と nth-child を混同"],
    practice: {
      title: "縞模様",
      task: "li:nth-child(odd) に背景色 #18222F を当ててください。",
      hint: "nth-child(odd)。",
      answer: `li:nth-child(odd) { background: #18222F; }`,
    },
    quiz: {
      question: "偶数番目を表すのは？",
      choices: ["odd", "even", "2n+1", "first"],
      answerIndex: 1,
      explanation: "even が偶数番目。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(24, {
    chapter: "疑似クラス・疑似要素",
    category: "セレクタ",
    title: "::before / ::after",
    description: "要素の前後に装飾を追加できる疑似要素。",
    goals: ["content: '' の意味がわかる", "アイコンを差し込める"],
    webUseCase: "見出しの装飾線、引用符、チェックマークなど。",
    htmlConnection: "HTMLを増やさずに装飾を足せる。",
    jsReactConnection: "HTMLが汚れないので、装飾はCSSに寄せる。",
    tailwindConnection: "before:content-['*'] before:text-red-500 のように書ける。",
    explanation:
      "::before と ::after は要素の前後に仮想的な要素を挿入する。content プロパティが必須。",
    cssFileName: "style.css",
    cssExample: `.required::after {
  content: '*';
  color: #EF4444;
  margin-left: 4px;
}`,
    htmlExample: `<label class="required">名前</label>`,
    previewDescription: "ラベルの後ろに赤いアスタリスクが付き、必須項目とわかる表示に。",
    visualChange: "HTMLを増やさず装飾できる。",
    codeExplanation: ["content は必須。空でも content: '' と書く。"],
    commonMistakes: ["content を書き忘れて表示されない"],
    practice: {
      title: "必須マーク",
      task: ".req::after で content: '*' を出してください。",
      hint: "::after と content。",
      answer: `.req::after { content: '*'; color: red; }`,
    },
    quiz: {
      question: "::before/::after で必須のプロパティは？",
      choices: ["display", "content", "position", "color"],
      answerIndex: 1,
      explanation: "content がないと出ません。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(25, {
    chapter: "実践UI制作",
    category: "フォーム",
    title: "フォームのCSS",
    description: "input/select の見た目を整えます。",
    goals: ["フォーム要素のスタイル統一ができる"],
    webUseCase: "問い合わせ、ログイン、検索。フォームは必ず登場。",
    htmlConnection: "input/select/textarea を class で揃える。",
    jsReactConnection: "Reactの controlled input でも見た目はCSSが担当。",
    tailwindConnection: "@tailwindcss/forms を使う手もある。",
    explanation:
      "デフォルトの見た目はOSによってバラバラ。border, padding, border-radius, font-size を揃えると統一感が出る。",
    cssFileName: "style.css",
    cssExample: `.input {
  display: block;
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #243049;
  background: #18222F;
  color: #E6EDF7;
}
.input:focus { outline: 2px solid #38BDF8; outline-offset: 2px; }`,
    htmlExample: `<input class="input" placeholder="メール" />`,
    previewDescription: "入力欄が暗い背景・角丸・フォーカス時に水色のリングが出ます。",
    visualChange: "OS デフォルトのバラつきが消えて統一感に。",
    codeExplanation: ["display: block + width: 100% で行いっぱいに。"],
    commonMistakes: ["focus の outline を消してアクセシビリティ低下"],
    practice: {
      title: "入力欄",
      task: ".input に padding 12px 14px と border-radius 12px を入れてください。",
      hint: "padding と border-radius。",
      answer: `.input { padding: 12px 14px; border-radius: 12px; }`,
    },
    quiz: {
      question: "フォームの見た目を統一するために最初にやるのは？",
      choices: ["色を変える", "padding と border を整える", "font-family を変える", "JSで動かす"],
      answerIndex: 1,
      explanation: "枠と余白を統一すると一気に揃う。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(26, {
    chapter: "実践UI制作",
    category: "ボタン",
    title: "ボタン状態の設計",
    description: "default/hover/active/disabled の4状態を全部考えます。",
    goals: ["disabled の表現も忘れない"],
    webUseCase: "送信ボタンが押せない時、ユーザーは『なぜ？』が知りたい。",
    htmlConnection: "<button disabled> を活かす。",
    jsReactConnection: "状態によって disabled の切替が必要。",
    tailwindConnection: "disabled:opacity-50 disabled:cursor-not-allowed。",
    explanation:
      "default/hover/active/disabled の4状態をスタイルで表現すると、UIの完成度が一気に上がる。",
    cssFileName: "style.css",
    cssExample: `.btn { background: #38BDF8; color: #0F172A; }
.btn:hover { background: #3B82F6; color: #fff; }
.btn:active { transform: translateY(1px); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }`,
    htmlExample: `<button class="btn">通常</button>
<button class="btn" disabled>無効</button>`,
    previewDescription: "通常／ホバー／押下／無効化の4パターンが表示されます。",
    visualChange: "状態ごとに見た目が違うと安心して操作できる。",
    codeExplanation: [":disabled は HTML側に disabled 属性が必要。"],
    commonMistakes: ["disabled なのにホバーで色が変わって混乱する"],
    practice: {
      title: "disabled状態",
      task: ".btn:disabled で opacity: 0.5; cursor: not-allowed; を当ててください。",
      hint: ":disabled。",
      answer: `.btn:disabled { opacity: 0.5; cursor: not-allowed; }`,
    },
    quiz: {
      question: "押せないボタンを表す疑似クラスは？",
      choices: [":hover", ":active", ":disabled", ":focus"],
      answerIndex: 2,
      explanation: ":disabled です。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(27, {
    chapter: "実践UI制作",
    category: "ナビ",
    title: "ナビゲーションUI",
    description: "ロゴ＋メニュー＋アクションのヘッダーを作ります。",
    goals: ["Flex で3パートのヘッダーが書ける"],
    webUseCase: "ほぼすべてのサイトでヘッダーは登場。",
    htmlConnection: "<header>の中で flex + justify-between が定番。",
    jsReactConnection: "<Header /> コンポーネントとして再利用。",
    tailwindConnection: "flex justify-between items-center。",
    explanation:
      "ロゴを左、メニューを中央、アクションを右に分けて並べる。スマホではメニューを隠してハンバーガー化。",
    cssFileName: "style.css",
    cssExample: `.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  background: #0F172A;
}`,
    htmlExample: `<header class="header">
  <div>Logo</div>
  <nav>Menu</nav>
  <button>Sign in</button>
</header>`,
    previewDescription: "ロゴ・メニュー・サインインが横一列でバランス良く配置されます。",
    visualChange: "プロっぽいヘッダーに。",
    codeExplanation: ["align-items: center で縦中央揃え。"],
    commonMistakes: ["スマホで横が足りずに崩れる"],
    practice: {
      title: "ヘッダー",
      task: ".header を flex / align-items: center / justify-content: space-between にしてください。",
      hint: "3つのプロパティ。",
      answer: `.header { display: flex; align-items: center; justify-content: space-between; }`,
    },
    quiz: {
      question: "ヘッダーの3パート配置に向くプロパティは？",
      choices: ["space-between", "center", "evenly", "start"],
      answerIndex: 0,
      explanation: "両端寄せ＋中央均等にするなら space-between。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(28, {
    chapter: "実践UI制作",
    category: "モーダル",
    title: "モーダルUI",
    description: "オーバーレイと中央配置のモーダルを作ります。",
    goals: ["fixed + Flex 中央揃え + z-index で実装できる"],
    webUseCase: "確認ダイアログ、ログインフォーム、画像拡大。",
    htmlConnection: "<div class=\"backdrop\"><div class=\"modal\">…</div></div>。",
    jsReactConnection: "Reactでも同じ構造。Portal で body 直下に出すと安全。",
    tailwindConnection: "fixed inset-0 z-50 grid place-items-center bg-black/60。",
    explanation:
      "背景に半透明オーバーレイ、その上に中央配置のモーダル。inset: 0 で全画面、grid place-items-center で中央寄せ。",
    cssFileName: "style.css",
    cssExample: `.backdrop {
  position: fixed; inset: 0;
  background: rgba(15,23,42,0.7);
  display: grid; place-items: center;
  z-index: 50;
}
.modal {
  background: #18222F;
  padding: 24px;
  border-radius: 16px;
  width: 90%; max-width: 360px;
}`,
    htmlExample: `<div class="backdrop">
  <div class="modal">本当に削除しますか？</div>
</div>`,
    previewDescription: "暗い背景の上に、中央寄せのモーダルが浮かびます。",
    visualChange: "前後関係と中央寄せが組み合わさる。",
    codeExplanation: ["place-items: center は align + justify を一気に中央。"],
    commonMistakes: ["スマホで横スクロールが出る → max-width で抑える"],
    practice: {
      title: "モーダル背景",
      task: ".backdrop を fixed inset:0、半透明黒(rgba 0,0,0,0.6)にしてください。",
      hint: "fixed と inset。",
      answer: `.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); }`,
    },
    quiz: {
      question: "中央寄せに使えるショートハンドは？",
      choices: ["align: center;", "place-items: center;", "center: 1;", "auto"],
      answerIndex: 1,
      explanation: "Grid の place-items: center が便利。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(29, {
    chapter: "実践UI制作",
    category: "タブ",
    title: "タブUI",
    description: "横並びのタブと選択状態の表現。",
    goals: ["選択時のアンダーライン表現ができる"],
    webUseCase: "プロフィールの『投稿/フォロワー/フォロー中』など。",
    htmlConnection: "ボタンのリストにクラスで状態を付ける。",
    jsReactConnection: "選択中タブを useState で管理して className を切り替える。",
    tailwindConnection: "border-b-2 を選択時だけ付ける。",
    explanation:
      "横並びにして、選択中だけ下にアンダーラインを出すのが定番。",
    cssFileName: "style.css",
    cssExample: `.tabs { display: flex; gap: 16px; border-bottom: 1px solid #243049; }
.tab { padding: 10px 4px; color: #94A3B8; }
.tab.active { color: #E6EDF7; border-bottom: 2px solid #38BDF8; }`,
    htmlExample: `<div class="tabs">
  <button class="tab active">All</button>
  <button class="tab">New</button>
  <button class="tab">Done</button>
</div>`,
    previewDescription: "選択中のタブだけ下に水色のラインが出ます。",
    visualChange: "状態が一目でわかるUIに。",
    codeExplanation: ["親のbottom borderと、選択中の border で重ねる。"],
    commonMistakes: ["親の border-bottom と active の太さが違って段差ができる"],
    practice: {
      title: "アクティブタブ",
      task: ".tab.active に border-bottom: 2px solid #38BDF8 を当ててください。",
      hint: "border-bottom。",
      answer: `.tab.active { border-bottom: 2px solid #38BDF8; }`,
    },
    quiz: {
      question: "選択中タブを示す定番表現は？",
      choices: ["背景色のみ", "下線と色の変化", "影", "サイズアップ"],
      answerIndex: 1,
      explanation: "アンダーライン＋色変化が定番。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(30, {
    chapter: "実践UI制作",
    category: "アコーディオン",
    title: "アコーディオンUI",
    description: "クリックで開閉する FAQ風のUIを作ります。",
    goals: ["details/summary でCSSのみで実装できる"],
    webUseCase: "FAQ、サイドナビの折りたたみ。",
    htmlConnection: "<details><summary>title</summary>本文</details>。",
    jsReactConnection: "Reactでは状態でclassを切り替えてもOK。",
    tailwindConnection: "open:bg-slate-800 などで状態スタイル。",
    explanation:
      "details/summary タグだけでJSなしの開閉UIになる。CSSで矢印やhoverを整える。",
    cssFileName: "style.css",
    cssExample: `details {
  background: #18222F;
  border-radius: 12px;
  padding: 12px 16px;
}
summary {
  cursor: pointer;
  font-weight: 700;
}
details[open] summary { color: #38BDF8; }`,
    htmlExample: `<details>
  <summary>よくある質問</summary>
  <p>回答内容</p>
</details>`,
    previewDescription: "クリックで開閉するQ&AUIになります。",
    visualChange: "JSなしで開閉。",
    codeExplanation: ["details[open] で開いている時のスタイル。"],
    commonMistakes: ["summary に cursor: pointer を入れず、押せると気づかれない"],
    practice: {
      title: "開時の色",
      task: "details[open] summary を color: #38BDF8 にしてください。",
      hint: "属性セレクタ。",
      answer: `details[open] summary { color: #38BDF8; }`,
    },
    quiz: {
      question: "JSなしで開閉できるタグは？",
      choices: ["accordion", "details/summary", "toggle", "flap"],
      answerIndex: 1,
      explanation: "details/summary が標準で開閉できる。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(31, {
    chapter: "実践UI制作",
    category: "レイアウト",
    title: "レスポンシブカード一覧",
    description: "Grid + minmax で『画面幅に合わせて自動列数』のレイアウト。",
    goals: ["auto-fit + minmax の魔法を使える"],
    webUseCase: "商品一覧、ブログ一覧、ギャラリー。",
    htmlConnection: "div.grid > div.card * N。",
    jsReactConnection: "リストを map で展開するだけで完成。",
    tailwindConnection: "grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4。",
    explanation:
      "grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); で『最低220px、可能な限り並べて余ったら均等に伸ばす』ができる。",
    cssFileName: "style.css",
    cssExample: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`,
    htmlExample: `<div class="cards">
  <div class="card">A</div><div class="card">B</div>
  <div class="card">C</div><div class="card">D</div>
</div>`,
    previewDescription: "幅に応じて1〜4列に勝手に切り替わるカード一覧になります。",
    visualChange: "media query なしでレスポンシブが完成。",
    codeExplanation: ["auto-fit と auto-fill は微妙に違う（fit は空き列を潰す）。"],
    commonMistakes: ["minmax の min 値が大きすぎて、スマホで1列にならない"],
    practice: {
      title: "auto-fit",
      task: "grid-template-columns に repeat(auto-fit, minmax(200px, 1fr)) を指定。",
      hint: "minmax と auto-fit。",
      answer: `.cards { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }`,
    },
    quiz: {
      question: "auto-fit の特徴は？",
      choices: [
        "常に固定列数",
        "空き列を潰して均等に伸ばす",
        "JSで列数指定",
        "ランダム配置",
      ],
      answerIndex: 1,
      explanation: "auto-fit は余った空き列を潰します。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(32, {
    chapter: "実践UI制作",
    category: "LP",
    title: "LPヒーロー制作",
    description: "見出し・サブ・CTAの大きなビジュアル領域を作ります。",
    goals: ["clamp + Flex でヒーローが書ける"],
    webUseCase: "サービスのトップページのファーストビュー。",
    htmlConnection: "<section class=\"hero\">…</section>。",
    jsReactConnection: "<Hero />コンポーネント。",
    tailwindConnection: "py-16 text-center。",
    explanation:
      "縦中央寄せ、見出しは clamp で可変、CTA ボタンを大きく。",
    cssFileName: "style.css",
    cssExample: `.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 64px 16px;
  gap: 16px;
}
.hero h1 { font-size: clamp(28px, 6vw, 48px); }
.hero p  { color: #94A3B8; max-width: 480px; }`,
    htmlExample: `<section class="hero">
  <h1>あなたのCSSを次のレベルへ</h1>
  <p>1日5分で学ぶデザイン実装</p>
  <button class="btn">始める</button>
</section>`,
    previewDescription: "中央寄せの大きなヒーローセクションができます。",
    visualChange: "ファーストビューが完成形に。",
    codeExplanation: ["max-width で本文の行幅を読みやすく。"],
    commonMistakes: ["スマホで padding が大きすぎて余白だらけ"],
    practice: {
      title: "ヒーロー",
      task: ".hero を flex column + 中央寄せ + padding: 64px 16px にしてください。",
      hint: "Flex 中央寄せ。",
      answer: `.hero { display: flex; flex-direction: column; align-items: center; padding: 64px 16px; }`,
    },
    quiz: {
      question: "可変サイズの見出しに使うのは？",
      choices: ["px固定", "clamp()", "calc()", "vw だけ"],
      answerIndex: 1,
      explanation: "clamp() で min/max の制限付き可変サイズに。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(33, {
    chapter: "実践UI制作",
    category: "EC",
    title: "商品カード制作",
    description: "画像・タイトル・価格・ボタンの商品カードを作ります。",
    goals: ["aspect-ratio と Flex の組み合わせ"],
    webUseCase: "ECサイト、ポートフォリオの作品紹介。",
    htmlConnection: "<article>の中に img / h3 / p / button。",
    jsReactConnection: "<ProductCard product={...} />。",
    tailwindConnection: "rounded-2xl shadow p-3 hover:shadow-lg。",
    explanation:
      "aspect-ratio: 4/3 でサムネ、価格を強調、ボタンを下端に配置。",
    cssFileName: "style.css",
    cssExample: `.product {
  background: #18222F;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.product img { aspect-ratio: 4/3; object-fit: cover; border-radius: 12px; }
.product .price { font-size: 18px; font-weight: 700; color: #38BDF8; }`,
    htmlExample: `<article class="product">
  <img src="/item.jpg" alt="" />
  <h3>商品名</h3>
  <p class="price">¥2,980</p>
  <button class="btn">カートに追加</button>
</article>`,
    previewDescription: "サムネイル付きの商品カードが完成します。",
    visualChange: "ECサイトでよく見るあのカード。",
    codeExplanation: ["価格は font-weight 700 と色で強調。"],
    commonMistakes: ["価格が他の文字と紛れて目立たない"],
    practice: {
      title: "価格を強調",
      task: ".price を font-size: 18px、color: #38BDF8 にしてください。",
      hint: "強調表示。",
      answer: `.price { font-size: 18px; color: #38BDF8; }`,
    },
    quiz: {
      question: "サムネ画像の比率指定は？",
      choices: ["aspect-ratio", "object-position", "size", "ratio"],
      answerIndex: 0,
      explanation: "aspect-ratio で比率を固定。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(34, {
    chapter: "React / Tailwindへの接続",
    category: "React",
    title: "CSSからReactコンポーネントへ",
    description: "繰り返すUIをReactのコンポーネントに切り出します。",
    goals: ["CSS と JSX の分担を理解する"],
    webUseCase: "同じカードを何度も書くより、<Card /> 1つで済ませる。",
    htmlConnection: "JSX は HTML とほぼ同じ書き方。",
    jsReactConnection: "props で値を渡し、className で見た目を当てる。",
    tailwindConnection: "Tailwindならコンポーネント単位で完結する。",
    explanation:
      "繰り返し使うUIは関数コンポーネント化。CSSは外部ファイル or Tailwind にする。",
    cssFileName: "Card.tsx",
    cssExample: `/* Card.tsx (擬似コード) */
function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}`,
    htmlExample: `<Card title="Hello" body="React + CSS" />`,
    previewDescription: "JSX で書かれたコンポーネントが、CSSのクラスで装飾されます。",
    visualChange: "再利用しやすい形に進化。",
    codeExplanation: [
      "JSXのclass属性は className。",
      "props で内容を切り替え、見た目はCSSが担当。",
    ],
    commonMistakes: ["class と書いてしまう（JSXは className）"],
    practice: {
      title: "再利用",
      task: ".card のスタイルを別ファイルに切り出す利点を1つ書いてください。",
      hint: "DRY。",
      answer: "1ヶ所直せば全カードに反映でき、保守がラク。",
    },
    quiz: {
      question: "Reactでクラス指定の属性名は？",
      choices: ["class", "className", "cssClass", "classes"],
      answerIndex: 1,
      explanation: "className です。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(35, {
    chapter: "React / Tailwindへの接続",
    category: "Tailwind",
    title: "TailwindでスタイルしてReactと組み合わせる",
    description: "Reactコンポーネント + Tailwind の最短コンビ。",
    goals: ["Tailwindクラスをpropで切り替える発想がわかる"],
    webUseCase: "今っぽいフロントエンドの王道セット。",
    htmlConnection: "JSX に className=\"...\" を並べるだけ。",
    jsReactConnection: "variant に応じてクラスを組み合わせる関数（clsx等）が便利。",
    tailwindConnection: "本人。",
    explanation:
      "<Button variant=\"primary\">のようにpropで分岐し、bg-sky-500 などのクラスを切り替える。",
    cssFileName: "Button.tsx",
    cssExample: `/* Button.tsx 抜粋 */
const cls = variant === "primary"
  ? "bg-sky-500 text-slate-900"
  : "bg-transparent text-sky-400 border border-sky-500";

return <button className={"px-4 py-2 rounded-xl " + cls}>{children}</button>;`,
    htmlExample: `<Button variant="primary">保存</Button>`,
    previewDescription: "variant に応じて見た目が切り替わるボタンになります。",
    visualChange: "状態違いの実装が一気に楽に。",
    codeExplanation: ["bg-sky-500 ≒ #0EA5E9", "rounded-xl ≒ border-radius: 0.75rem"],
    commonMistakes: ["クラス文字列を + で繋いで読みづらい → clsx を使う"],
    practice: {
      title: "ghost variant",
      task: "ghost のときは bg-transparent text-sky-400 border にしてください。",
      hint: "三項演算子。",
      answer:
        `variant === "ghost" ? "bg-transparent text-sky-400 border border-sky-500" : "bg-sky-500 text-slate-900"`,
    },
    quiz: {
      question: "Tailwindでクラス組み合わせを楽にする定番ライブラリは？",
      choices: ["lodash", "clsx / classnames", "uuid", "date-fns"],
      answerIndex: 1,
      explanation: "clsx / classnames が定番。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(36, {
    chapter: "実践UI制作",
    category: "ナビ",
    title: "スマホ向けボトムナビ",
    description: "画面下部のタブ型ナビを作ります。",
    goals: ["fixed + grid-cols でボトムナビが書ける"],
    webUseCase: "スマホアプリ風のUIには欠かせない。",
    htmlConnection: "<nav class=\"bottom-nav\"> に5タブを並べる。",
    jsReactConnection: "active タブを useState で管理。",
    tailwindConnection: "fixed bottom-0 inset-x-0 grid grid-cols-5。",
    explanation:
      "position: fixed で下に固定。grid-template-columns: repeat(5, 1fr) で均等割。",
    cssFileName: "style.css",
    cssExample: `.bnav {
  position: fixed; left: 0; right: 0; bottom: 0;
  display: grid; grid-template-columns: repeat(5, 1fr);
  background: #0F172A; border-top: 1px solid #243049;
  padding-bottom: env(safe-area-inset-bottom);
}`,
    htmlExample: `<nav class="bnav">
  <button>Home</button><button>Map</button><button>+</button><button>Like</button><button>Me</button>
</nav>`,
    previewDescription: "画面下に5タブのナビが固定表示されます。",
    visualChange: "アプリっぽい仕上がりに。",
    codeExplanation: ["safe-area-inset-bottom はiPhoneの下端の余白対策。"],
    commonMistakes: ["safe-area を考えず iPhone でホームバーに被る"],
    practice: {
      title: "5タブ",
      task: ".bnav を fixed + grid 5cols + bottom 0 にしてください。",
      hint: "3つの要素。",
      answer: `.bnav { position: fixed; bottom: 0; left: 0; right: 0; display: grid; grid-template-columns: repeat(5, 1fr); }`,
    },
    quiz: {
      question: "iPhoneのホームバー対策に使うのは？",
      choices: ["padding: 16px;", "env(safe-area-inset-bottom)", "margin-bottom: 32px;", "JSで判定"],
      answerIndex: 1,
      explanation: "env(safe-area-inset-bottom) を使う。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(37, {
    chapter: "実践UI制作",
    category: "状態",
    title: "ローディング・スケルトンUI",
    description: "読込中の見た目を整えてユーザーを待たせる工夫。",
    goals: ["@keyframes で簡単なシマー演出"],
    webUseCase: "API待ち中の体感速度向上。",
    htmlConnection: "div に skeleton クラスを当てるだけ。",
    jsReactConnection: "isLoading のときに Skeleton を出す。",
    tailwindConnection: "animate-pulse。",
    explanation:
      "背景にグラデーションを設定し、@keyframes でずらすとシマー感が出る。",
    cssFileName: "style.css",
    cssExample: `.skel {
  background: linear-gradient(90deg, #1E293B, #243049, #1E293B);
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
  border-radius: 8px;
  height: 16px;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
    htmlExample: `<div class="skel" style="width: 80%"></div>`,
    previewDescription: "薄い灰色のバーが、流れるような光で読込中を表現します。",
    visualChange: "白い空白より体感が速い。",
    codeExplanation: ["@keyframes でアニメーションを定義。"],
    commonMistakes: ["長く動かしすぎてうるさい"],
    practice: {
      title: "シマー",
      task: ".skel に animation: shimmer 1.4s linear infinite を当ててください。",
      hint: "animation。",
      answer: `.skel { animation: shimmer 1.4s linear infinite; }`,
    },
    quiz: {
      question: "アニメーション定義に使うのは？",
      choices: ["transition", "keyframes", "animate", "motion"],
      answerIndex: 1,
      explanation: "@keyframes で定義します。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(38, {
    chapter: "実践UI制作",
    category: "アクセシビリティ",
    title: "コントラストと可読性",
    description: "色の組み合わせは『見えるか』が最優先。",
    goals: ["WCAG AA基準のコントラストを意識する"],
    webUseCase: "薄いグレーに白文字は読めない。",
    htmlConnection: "テキストと背景の組み合わせ。",
    jsReactConnection: "テーマ色を決めるとき必ずチェック。",
    tailwindConnection: "Tailwind公式が一覧してくれる。",
    explanation:
      "本文と背景のコントラスト比は 4.5:1 以上が推奨（AA）。",
    cssFileName: "style.css",
    cssExample: `/* ❌ 読みにくい */
.bad { color: #94A3B8; background: #243049; }
/* ✅ 読みやすい */
.good { color: #E6EDF7; background: #18222F; }`,
    htmlExample: `<p class="bad">読みにくい</p>
<p class="good">読みやすい</p>`,
    previewDescription: "コントラストの違いで読みやすさが大きく変わります。",
    visualChange: "薄い色は見落とされる。",
    codeExplanation: ["WebAIM Contrast Checker などで計測できる。"],
    commonMistakes: ["『おしゃれ』と『読みやすい』を取り違える"],
    practice: {
      title: "可読性",
      task: ".body に color: #E6EDF7、background: #18222F を当ててください。",
      hint: "コントラスト。",
      answer: `.body { color: #E6EDF7; background: #18222F; }`,
    },
    quiz: {
      question: "WCAG AA の本文コントラスト比は？",
      choices: ["1.5:1", "3:1", "4.5:1", "7:1"],
      answerIndex: 2,
      explanation: "本文は 4.5:1 以上が AA。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(39, {
    chapter: "Flexbox",
    category: "Flex",
    title: "align-self と flex-grow を子要素で",
    description: "子要素ごとに整列や伸縮を上書きできます。",
    goals: ["align-self の使い所がわかる"],
    webUseCase: "1つだけ大きさや位置を変えたい時。",
    htmlConnection: "Flexの子に追加で書く。",
    jsReactConnection: "選択中の要素だけ flex-grow を上げる演出。",
    tailwindConnection: "self-start, self-center。",
    explanation:
      "親の align-items を、特定の子だけ align-self で上書き。",
    cssFileName: "style.css",
    cssExample: `.bar { display: flex; align-items: center; gap: 8px; }
.bar .grow { flex: 1; }
.bar .top  { align-self: flex-start; }`,
    htmlExample: `<div class="bar">
  <span>label</span>
  <span class="grow">伸びる</span>
  <span class="top">上端</span>
</div>`,
    previewDescription: "ラベル・伸びる本体・上端寄せの右ラベル、の3つが並びます。",
    visualChange: "1つだけ違う動きをさせられる。",
    codeExplanation: ["align-self は子に対する上書き。"],
    commonMistakes: ["align-items と align-self を混同する"],
    practice: {
      title: "上端寄せ",
      task: ".item を align-self: flex-start にしてください。",
      hint: "align-self。",
      answer: `.item { align-self: flex-start; }`,
    },
    quiz: {
      question: "親の整列を子1つだけ上書きするのは？",
      choices: ["justify-self", "align-self", "self-align", "override-align"],
      answerIndex: 1,
      explanation: "align-self が子側の指定。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(40, {
    chapter: "Grid",
    category: "Grid",
    title: "Grid の場所指定（grid-column）",
    description: "子要素を何列目から何列目まで占有するか指定できます。",
    goals: ["grid-column: 1 / 3 が読める"],
    webUseCase: "ヒーローを2列ぶん使ったり、要素を斜めに配置したり。",
    htmlConnection: "Gridの子に grid-column を書く。",
    jsReactConnection: "状態によって占有列数を切り替える。",
    tailwindConnection: "col-span-2。",
    explanation:
      "grid-column: 1 / 3 は『1番目の線から3番目の線まで』、つまり2列ぶん。",
    cssFileName: "style.css",
    cssExample: `.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.hero { grid-column: 1 / -1; }`,
    htmlExample: `<div class="grid">
  <div class="hero">ヒーロー</div>
  <div>1</div><div>2</div><div>3</div><div>4</div>
</div>`,
    previewDescription: "1行目を全幅で使うヒーロー、その下に4つのカードが並びます。",
    visualChange: "Gridの中で配置が自由になる。",
    codeExplanation: ["-1 は『最後の線』を表す。"],
    commonMistakes: ["span を使うか / 線番号を使うかでつまづく"],
    practice: {
      title: "全幅",
      task: ".hero を grid-column: 1 / -1 にしてください。",
      hint: "全列ぶん使う指定。",
      answer: `.hero { grid-column: 1 / -1; }`,
    },
    quiz: {
      question: "1〜全幅まで使う書き方は？",
      choices: ["1 / 100", "1 / -1", "all", "full"],
      answerIndex: 1,
      explanation: "1 / -1 で『最後まで』。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(41, {
    chapter: "実践UI制作",
    category: "アバター",
    title: "アバター + 文字",
    description: "丸アバターの中に頭文字を表示する。",
    goals: ["Flexの中央寄せの活用"],
    webUseCase: "コメント、ユーザーリスト、チャット。",
    htmlConnection: "<div class=\"avatar\">K</div>。",
    jsReactConnection: "name の頭文字を計算してアバターに。",
    tailwindConnection: "rounded-full grid place-items-center。",
    explanation:
      "正方形 + border-radius: 50% + Flex 中央寄せ + 文字色背景色。",
    cssFileName: "style.css",
    cssExample: `.avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: #38BDF8;
  color: #0F172A;
  display: grid;
  place-items: center;
  font-weight: 700;
}`,
    htmlExample: `<div class="avatar">K</div>`,
    previewDescription: "青い円の中に黒い K の文字が中央に表示されます。",
    visualChange: "個性のあるアバターが画像なしで作れる。",
    codeExplanation: ["place-items: center で完璧な中央寄せ。"],
    commonMistakes: ["display: grid を忘れて place-items が効かない"],
    practice: {
      title: "頭文字アバター",
      task: ".avatar を 40x40・border-radius 50%・grid place-items: center に。",
      hint: "Grid 中央寄せ。",
      answer: `.avatar { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; }`,
    },
    quiz: {
      question: "正方形を完全な円にする値は？",
      choices: ["100%", "50%", "999px", "round"],
      answerIndex: 1,
      explanation: "50% で円に。999pxも可。",
    },
    estimatedMinutes: 5,
    difficulty: 3,
  }),

  L(42, {
    chapter: "実践UI制作",
    category: "リスト",
    title: "リストのスタイル",
    description: "ul/ol の余計な装飾を消し、整ったリストを作ります。",
    goals: ["list-style: none と padding: 0 のリセット"],
    webUseCase: "ナビ、設定一覧、メニューなど。",
    htmlConnection: "<ul><li>...</li></ul>。",
    jsReactConnection: "リストレンダリングは React の基本。",
    tailwindConnection: "list-none p-0。",
    explanation:
      "ul/ol はデフォルトでマーカーが付き、padding-left もある。リセットしてから整える。",
    cssFileName: "style.css",
    cssExample: `.list {
  list-style: none;
  padding: 0; margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.list li {
  background: #18222F;
  padding: 12px;
  border-radius: 12px;
}`,
    htmlExample: `<ul class="list">
  <li>Item 1</li><li>Item 2</li><li>Item 3</li>
</ul>`,
    previewDescription: "マーカーが消えた、カード型のリストになります。",
    visualChange: "情報が整列して見やすい。",
    codeExplanation: ["list-style: none で点や数字が消える。"],
    commonMistakes: ["padding: 0 を忘れて左に空きが出る"],
    practice: {
      title: "リストリセット",
      task: ".list に list-style: none; padding: 0; margin: 0; を当ててください。",
      hint: "3行リセット。",
      answer: `.list { list-style: none; padding: 0; margin: 0; }`,
    },
    quiz: {
      question: "ul/ol のマーカーを消す指定は？",
      choices: ["list-style: none;", "marker: none;", "bullets: 0;", "decoration: none;"],
      answerIndex: 0,
      explanation: "list-style: none です。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(43, {
    chapter: "実践UI制作",
    category: "テキスト",
    title: "テキスト省略（line-clamp）",
    description: "長文を行数で省略して『…』を表示します。",
    goals: ["line-clamp の使い方が分かる"],
    webUseCase: "カードの説明文を3行までで切る。",
    htmlConnection: "p や div に当てる。",
    jsReactConnection: "コンポーネントで「3行で省略」のスタイルを共通化。",
    tailwindConnection: "line-clamp-3。",
    explanation:
      "display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; のセット。",
    cssFileName: "style.css",
    cssExample: `.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`,
    htmlExample: `<p class="clamp-3">長い文章…</p>`,
    previewDescription: "長文が3行で切れて『…』が表示されます。",
    visualChange: "カード一覧でレイアウトが揃う。",
    codeExplanation: ["セットで4行書くのが定番。"],
    commonMistakes: ["overflow: hidden を抜くと省略されない"],
    practice: {
      title: "2行省略",
      task: ".clamp-2 で2行省略するスタイルを書いてください。",
      hint: "-webkit-line-clamp: 2。",
      answer: `.clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }`,
    },
    quiz: {
      question: "行数省略に必要なdisplay値は？",
      choices: ["block", "-webkit-box", "flex", "grid"],
      answerIndex: 1,
      explanation: "-webkit-box が必要。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(44, {
    chapter: "実践UI制作",
    category: "アニメ",
    title: "transition + transform",
    description: "ホバー時に少し動かすと押せそう感が増します。",
    goals: ["translate / scale を transition と組み合わせられる"],
    webUseCase: "ボタン、カード、アイコン。",
    htmlConnection: "ほぼ全要素に。",
    jsReactConnection: "Reactでも CSS のままでOK。",
    tailwindConnection: "hover:scale-105 transition。",
    explanation:
      "transform: translateY(-2px) scale(1.02); で、軽く浮く動き。",
    cssFileName: "style.css",
    cssExample: `.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}`,
    htmlExample: `<div class="card">浮くカード</div>`,
    previewDescription: "ホバーしたとき、わずかに浮き上がる動きが付きます。",
    visualChange: "微妙な動きで品が出る。",
    codeExplanation: ["transform は GPU で処理されて軽い。"],
    commonMistakes: ["scale を大きくしすぎてかえって不格好"],
    practice: {
      title: "ホバーで浮く",
      task: ".card:hover に transform: translateY(-2px) を当ててください。",
      hint: "transform。",
      answer: `.card:hover { transform: translateY(-2px); }`,
    },
    quiz: {
      question: "GPUで処理される軽いプロパティは？",
      choices: ["margin", "transform", "padding", "width"],
      answerIndex: 1,
      explanation: "transform / opacity は軽いです。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(45, {
    chapter: "React / Tailwindへの接続",
    category: "総合",
    title: "中級まとめ：UIキットを意識する",
    description: "ボタン・入力・カードなど共通部品をUIキットとして整える。",
    goals: ["再利用前提の設計を意識できる"],
    webUseCase: "アプリ全体のトーン＆マナーを揃える。",
    htmlConnection: "汎用クラス + 拡張クラスの組み合わせ。",
    jsReactConnection: "Atomic Design / コンポーネントライブラリの考え方へ。",
    tailwindConnection: "shadcn/ui や DaisyUI などの利用を視野に。",
    explanation:
      "色・余白・サイズ・角丸・影 を 3〜5段階のスケールに固定し、全UIで使い回す。",
    cssFileName: "style.css",
    cssExample: `:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
}`,
    htmlExample: `<div class="card" style="border-radius: var(--radius-lg);">統一感のあるUI</div>`,
    previewDescription:
      "サイト全体で角丸や余白が同じ値になり、一貫したUIになります。",
    visualChange: "統一感が一気に出る。",
    codeExplanation: ["CSS変数（custom properties）でスケールを定義。"],
    commonMistakes: ["毎回違う数字を使い、UIがバラつく"],
    practice: {
      title: "スケール",
      task: ":root に --space-3: 12px を追加してください。",
      hint: "CSS変数。",
      answer: `:root { --space-3: 12px; }`,
    },
    quiz: {
      question: "デザインシステムの基本は？",
      choices: [
        "場面ごとに自由に値を決める",
        "色・余白・サイズを段階的に決めて使い回す",
        "全部Tailwindに任せる",
        "Figmaがあれば不要",
      ],
      answerIndex: 1,
      explanation: "スケールを決めて使い回すのが基本。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(46, {
    chapter: "Grid",
    category: "Grid",
    title: "place-items / place-content",
    description: "Gridの中央寄せはこの2つで完結します。",
    goals: ["place-items と place-content の違いがわかる"],
    webUseCase: "完璧な中央寄せが1行で書ける。",
    htmlConnection: "Gridコンテナに当てる。",
    jsReactConnection: "ローディング画面の中央配置で頻出。",
    tailwindConnection: "place-items-center, place-content-center。",
    explanation:
      "place-items は『各セル内の中身の整列』、place-content は『コンテンツ全体の整列』。",
    cssFileName: "style.css",
    cssExample: `.center {
  display: grid;
  place-items: center;
  height: 200px;
}`,
    htmlExample: `<div class="center"><span>Hi</span></div>`,
    previewDescription: "高さ200pxのエリアの中央に Hi が表示されます。",
    visualChange: "1行で完璧な中央寄せ。",
    codeExplanation: ["place-items は justify-items + align-items のショートハンド。"],
    commonMistakes: ["place-content と取り違える"],
    practice: {
      title: "中央寄せ",
      task: ".center に display: grid; place-items: center; を入れてください。",
      hint: "Grid。",
      answer: `.center { display: grid; place-items: center; }`,
    },
    quiz: {
      question: "中身を中央に置くショートハンドは？",
      choices: ["text-align: center;", "place-items: center;", "margin: auto;", "center: 1;"],
      answerIndex: 1,
      explanation: "Grid + place-items: center が最強。",
    },
    estimatedMinutes: 5,
    difficulty: 3,
  }),

  L(47, {
    chapter: "実践UI制作",
    category: "テーマ",
    title: "ダークモードの基本",
    description: "prefers-color-scheme を使って自動切替。",
    goals: ["ダークモード対応の基本構造を作れる"],
    webUseCase: "iOS/AndroidのダークモードでUIが自動で切り替わる。",
    htmlConnection: "html や body にテーマを当てる。",
    jsReactConnection: "Reactでは状態でテーマクラスを切替えるのも一般的。",
    tailwindConnection: "dark:bg-slate-900。",
    explanation:
      "@media (prefers-color-scheme: dark) で、OSのテーマに応じてCSSを切り替えられる。",
    cssFileName: "style.css",
    cssExample: `:root { color-scheme: light dark; }
body { background: #ffffff; color: #0F172A; }
@media (prefers-color-scheme: dark) {
  body { background: #0F172A; color: #E6EDF7; }
}`,
    htmlExample: `<body>テーマ自動切替</body>`,
    previewDescription: "OSがダークモードのときはダーク、ライトのときはライトに切り替わります。",
    visualChange: "ユーザー環境に合わせて見やすさが変わる。",
    codeExplanation: ["color-scheme は input 等のフォームの色も最適化する。"],
    commonMistakes: ["背景だけ変えて文字色を変えず読めなくなる"],
    practice: {
      title: "ダーク対応",
      task: "@media (prefers-color-scheme: dark) で body の color を #E6EDF7 にしてください。",
      hint: "media query。",
      answer: `@media (prefers-color-scheme: dark) { body { color: #E6EDF7; } }`,
    },
    quiz: {
      question: "OSのテーマを取得する media は？",
      choices: ["prefers-color-scheme", "prefers-dark", "color-mode", "theme"],
      answerIndex: 0,
      explanation: "prefers-color-scheme です。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),
];
