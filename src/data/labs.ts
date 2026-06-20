import type { Lab } from "../types/lab";

export const labs: Lab[] = [
  {
    id: "lab-flex-row",
    title: "横並びの基本（Flex row）",
    category: "flex",
    goal: "Flexで要素を横並びにし、間隔を揃える。",
    description:
      "Flexbox の最初の一歩。display:flex と gap だけで、横並びの基礎ができる。",
    cssExample: `.row {
  display: flex;
  gap: 12px;
}`,
    htmlExample: `<div class="row">
  <div>A</div><div>B</div><div>C</div>
</div>`,
    whereToUse:
      "ヘッダー、ボタン群、タグ一覧、横並びのアイコンなど。",
    responsiveNote:
      "スマホで縦に積みたい場合は flex-direction: column に切り替える、または flex-wrap: wrap を使う。",
    commonMistakes: [
      "子に display:flex を書く（親に書く）",
      "margin で間隔を作って両端に余白が出る",
    ],
    practice: ".row の gap を 16px に変えて間隔の違いを確認しよう。",
  },
  {
    id: "lab-flex-center",
    title: "完璧な中央寄せ",
    category: "alignment",
    goal: "Flex で縦横中央に1つの要素を置く。",
    description:
      "Flex の justify-content と align-items を組み合わせると完璧な中央寄せになる。",
    cssExample: `.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}`,
    htmlExample: `<div class="center"><span>中央</span></div>`,
    whereToUse:
      "ローディング、空状態、ロゴなど『1つの要素を真ん中に』置きたい場面。",
    responsiveNote:
      "高さは min-height: 100dvh などで viewport 全体にもできる。",
    commonMistakes: [
      "親に高さがなく、中央に見えない",
      "place-items は Grid 用なのに Flex で書いてしまう（Flex は place-content）",
    ],
    practice: ".center を Grid + place-items: center で書き直してみよう。",
  },
  {
    id: "lab-flex-between",
    title: "両端寄せヘッダー",
    category: "flex",
    goal: "ロゴ：左、メニュー：右。space-between の鉄板パターン。",
    description:
      "ヘッダーやツールバーで最も使う Flex のレシピ。",
    cssExample: `.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
}`,
    htmlExample: `<header class="bar">
  <div>Logo</div>
  <button>Menu</button>
</header>`,
    whereToUse: "サイトヘッダー、アプリのトップバー、リスト行の値表示。",
    responsiveNote:
      "メニューが多い場合はスマホで折りたたみ（display:none + ハンバーガー）を併用。",
    commonMistakes: [
      "中央に align-items を書き忘れて高さが揃わない",
      "padding を入れず端ギリギリになる",
    ],
    practice: ".bar に gap: 8px を入れて変化を見てみよう。",
  },
  {
    id: "lab-flex-wrap",
    title: "折り返しタグリスト",
    category: "flex",
    goal: "幅が足りなくなったら折り返すタグ一覧。",
    description:
      "flex-wrap: wrap で、子要素が折り返される。タグやチップに最適。",
    cssExample: `.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag { padding: 4px 10px; border-radius: 999px; background: #1E293B; color: #38BDF8; }`,
    htmlExample: `<div class="tags">
  <span class="tag">React</span><span class="tag">CSS</span>
  <span class="tag">UI</span><span class="tag">Tailwind</span>
</div>`,
    whereToUse: "タグ、フィルター、技術スタック表示。",
    responsiveNote:
      "wrap 自体がレスポンシブ的に効く。狭くなれば自然に縦に積み重なる。",
    commonMistakes: ["flex-wrap を抜き、はみ出す", "子要素に固定幅を入れすぎる"],
    practice: ".tags の gap を 4px / 12px に変えて差を確認しよう。",
  },
  {
    id: "lab-grid-3col",
    title: "3列カードグリッド",
    category: "grid",
    goal: "Grid で等幅3列のカードを並べる。",
    description: "repeat(3, 1fr) で等幅3列。最も基本的なGridレシピ。",
    cssExample: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
    htmlExample: `<div class="grid">
  <div>1</div><div>2</div><div>3</div>
</div>`,
    whereToUse: "商品一覧、画像一覧、カードリスト。",
    responsiveNote:
      "スマホでは grid-template-columns: 1fr に切り替え。media query で書き分ける。",
    commonMistakes: ["1fr と px を混在", "gap を margin で代用してしまう"],
    practice: "repeat(2, 1fr) に変えて2列にしてみよう。",
  },
  {
    id: "lab-grid-auto",
    title: "auto-fit + minmax で自動列数",
    category: "grid",
    goal: "media query なしでレスポンシブグリッド。",
    description:
      "repeat(auto-fit, minmax(220px, 1fr)) で『最低220px、可能な限り並べる』が実現。",
    cssExample: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`,
    htmlExample: `<div class="cards">
  <div class="card">A</div><div class="card">B</div>
  <div class="card">C</div><div class="card">D</div>
</div>`,
    whereToUse: "ニュース、ブログ、商品の一覧で『どんな画面でも崩れない』レイアウトに。",
    responsiveNote:
      "minmax の min を変えるだけで全画面サイズの挙動が変わる。",
    commonMistakes: ["minを大きくしすぎてスマホで1列にならない"],
    practice: "minmax の min を 280px に変えて差を見よう。",
  },
  {
    id: "lab-grid-layout",
    title: "サイドバー + 本文",
    category: "grid",
    goal: "左固定 + 右伸縮の2カラムを Grid で。",
    description: "grid-template-columns: 240px 1fr; が定番。",
    cssExample: `.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 16px;
  min-height: 100dvh;
}`,
    htmlExample: `<div class="app">
  <aside>サイドバー</aside>
  <main>本文</main>
</div>`,
    whereToUse: "管理画面、設定画面、ブログのサイドバー。",
    responsiveNote:
      "スマホでは grid-template-columns: 1fr に折りたたみ、サイドバーは隠す。",
    commonMistakes: ["1fr と px の順序を間違える", "min-width をサイドバーに付け忘れる"],
    practice: "サイドバーを 320px / 200px に変えて変化を見よう。",
  },
  {
    id: "lab-stack",
    title: "Stack（縦積み）",
    category: "spacing",
    goal: "Flex column + gap で縦にきれいに積む。",
    description:
      "Stack は『縦積みコンポーネント』として再利用しやすい。",
    cssExample: `.stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}`,
    htmlExample: `<div class="stack">
  <div>1</div><div>2</div><div>3</div>
</div>`,
    whereToUse: "フォーム、設定リスト、見出し+本文+ボタンの組。",
    responsiveNote:
      "スマホUIではほぼ全てがStackで構成される。",
    commonMistakes: [
      "子に margin を書いて、Stack の役割が壊れる",
    ],
    practice: "gap を 4px / 24px に変えて、密度の違いを体感しよう。",
  },
  {
    id: "lab-cluster",
    title: "Cluster（折り返し付き横並び）",
    category: "alignment",
    goal: "サイズの違うものを横並びさせ、はみ出したら折り返す。",
    description:
      "タグ、ナビ、コントロール群など『サイズが揃わない子』に強い。",
    cssExample: `.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}`,
    htmlExample: `<div class="cluster">
  <span>NEW</span><button>+ 追加</button><a href="#">詳細</a>
</div>`,
    whereToUse: "タグ、メニュー、コントロール群。",
    responsiveNote: "スマホでも自動で折り返してくれる。",
    commonMistakes: ["align-items を抜いて高さが揃わない"],
    practice: "flex-wrap を nowrap にして崩れ方を観察しよう。",
  },
  {
    id: "lab-spacing",
    title: "余白スケールで揃える",
    category: "spacing",
    goal: "4 / 8 / 12 / 16 / 24 / 32 のスケールで全余白を揃える。",
    description: "中途半端な値を排除すると、UIに統一感が生まれる。",
    cssExample: `:root {
  --s-1: 4px; --s-2: 8px; --s-3: 12px;
  --s-4: 16px; --s-6: 24px; --s-8: 32px;
}
.card { padding: var(--s-4); }`,
    htmlExample: `<div class="card">統一余白</div>`,
    whereToUse: "アプリ全体・デザインシステムの基礎。",
    responsiveNote: "スマホとPCで使うスケールを統一する。",
    commonMistakes: ["13pxなど中途半端な値を使う", "場面ごとに違う数字"],
    practice: "padding を --s-2 / --s-6 に切替えて密度の違いを比較しよう。",
  },
  {
    id: "lab-responsive",
    title: "モバイルファーストの段階拡張",
    category: "responsive",
    goal: "1列 → 2列 → 3列 と段階的に列数を増やす。",
    description:
      "モバイルファーストは、ベースを狭い画面に書き、min-width で広い画面用を上書きする。",
    cssExample: `.cards { display:grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 600px) { .cards { grid-template-columns: 1fr 1fr; } }
@media (min-width: 960px) { .cards { grid-template-columns: repeat(3, 1fr); } }`,
    htmlExample: `<div class="cards">
  <div>1</div><div>2</div><div>3</div>
</div>`,
    whereToUse: "あらゆるリスト・グリッド。",
    responsiveNote:
      "BPは少なめに（2〜3個）。auto-fit で済むならそれが最強。",
    commonMistakes: ["max-width だらけの『PCファースト』", "BPだらけ"],
    practice: "BPを600/900に変えて違いを観察しよう。",
  },
  {
    id: "lab-clamp",
    title: "Fluid Typography",
    category: "responsive",
    goal: "見出しサイズを画面幅に応じて滑らかに変化させる。",
    description:
      "clamp(min, preferred, max) で『最小〜最大』の範囲で連続変化。media query が要らなくなる場面も多い。",
    cssExample: `h1 {
  font-size: clamp(24px, 4vw + 8px, 48px);
  line-height: 1.2;
}`,
    htmlExample: `<h1>滑らかに変わる見出し</h1>`,
    whereToUse:
      "ヒーローの大見出しなど、幅で大きく見え方が変わる文字。",
    responsiveNote:
      "小さい画面で読めるサイズ、大きい画面で気持ちいいサイズの両方を確保する。",
    commonMistakes: ["min と max が逆", "vw だけで小さすぎる"],
    practice: "min/max を変えて挙動を確認しよう。",
  },
  {
    id: "lab-position",
    title: "右上にバッジを置く",
    category: "alignment",
    goal: "親 relative + 子 absolute の鉄板配置。",
    description:
      "位置をピンポイントで指定したい時はこの組み合わせ。",
    cssExample: `.card { position: relative; }
.badge {
  position: absolute;
  top: 8px; right: 8px;
  background: #EF4444; color: #fff;
  padding: 2px 6px; border-radius: 999px;
}`,
    htmlExample: `<div class="card">
  <span class="badge">NEW</span>
  カード本体
</div>`,
    whereToUse: "通知バッジ、閉じるボタン、商品の『SALE』表示。",
    responsiveNote:
      "absolute は親の relative がないと viewport 基準で飛ぶので注意。",
    commonMistakes: ["親に relative を付け忘れる", "z-index 不足で隠れる"],
    practice: "top/right の値を変えて配置を変えてみよう。",
  },
  {
    id: "lab-sticky",
    title: "Stickyヘッダー",
    category: "alignment",
    goal: "スクロールしても貼り付くヘッダー。",
    description:
      "position: sticky + top: 0 で実現。fixed と違い、要素の流れに沿って動く。",
    cssExample: `.header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: #0F172A;
  height: 56px;
}`,
    htmlExample: `<header class="header">サイトロゴ</header>`,
    whereToUse: "サイトのヘッダー、セクション見出し、テーブルの見出し行。",
    responsiveNote:
      "親に overflow: hidden が無いか確認。あると効かない。",
    commonMistakes: ["親 overflow:hidden で効かない", "top を書き忘れて固定されない"],
    practice: "top: 8px に変えると吸着位置がずれる挙動を確認しよう。",
  },
  {
    id: "lab-snap",
    title: "横スクロール + scroll-snap",
    category: "flex",
    goal: "横スワイプでカードがピタッと止まるカルーセル。",
    description:
      "scroll-snap-type と scroll-snap-align で、心地よい横スクロールUIに。",
    cssExample: `.carousel {
  display: flex; gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 8px;
}
.carousel > * {
  flex: 0 0 80%;
  scroll-snap-align: center;
}`,
    htmlExample: `<div class="carousel">
  <div>1</div><div>2</div><div>3</div>
</div>`,
    whereToUse: "おすすめカード、画像ビューア、ストーリーズ風UI。",
    responsiveNote:
      "flex の幅を 90% / 60% などに変えると、画面に映る枚数が変わる。",
    commonMistakes: ["子の幅を100%にしてスナップが効かない"],
    practice: "flex の値を 0 0 60% に変えて枚数の見え方を変えよう。",
  },
];
