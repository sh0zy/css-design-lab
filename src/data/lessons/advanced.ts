import type { Lesson } from "../../types/lesson";

const L = (
  n: number,
  data: Omit<Lesson, "id" | "level"> & { id?: string }
): Lesson => ({
  id: data.id ?? `a-${String(n).padStart(3, "0")}`,
  level: "advanced",
  ...data,
});

export const advancedLessons: Lesson[] = [
  L(1, {
    chapter: "CSS設計",
    category: "設計",
    title: "プロが考えるCSS設計",
    description: "場当たり的に書かないために、設計の方針を持ちます。",
    goals: ["『再利用・拡張・破綻させない』の3観点を持つ"],
    webUseCase: "規模が大きくなるほど、設計があるかないかで開発速度が大きく変わる。",
    htmlConnection: "HTMLとCSSの境界を意識して名前を付ける。",
    jsReactConnection: "コンポーネント単位で完結させ、責務を分離する。",
    tailwindConnection: "Tailwindは『設計の負担をフレームワーク側に寄せる』選択肢。",
    explanation:
      "良いCSS設計は『誰が読んでも同じ意図に解釈できる名前』『他と独立して動く』『同じ部品を何度も書かない』が揃う。BEM、OOCSS、SMACSS、Utility-first などの方針がある。",
    cssFileName: "design-principle.css",
    cssExample: `/* ❌ 場当たり: 何度も書かれる */
.profile-card-button { background: #38BDF8; padding: 8px 16px; }
.product-card-button { background: #38BDF8; padding: 8px 16px; }

/* ✅ 設計: 1つの部品として切り出す */
.btn { background: #38BDF8; padding: 8px 16px; }
.btn--primary { color: #0F172A; }`,
    htmlExample: `<button class="btn btn--primary">統一されたボタン</button>`,
    previewDescription:
      "見た目は同じですが、コードの量と保守性が大きく違います。",
    visualChange: "設計の差は『そのとき』には見えず、『あとで』効いてくる。",
    codeExplanation: ["共通: .btn / バリエーション: .btn--primary に分ける。"],
    commonMistakes: ["場面ごとに新しいクラスを作りまくる"],
    practice: {
      title: "ボタン共通化",
      task: "2つのカードでバラバラに書かれていたボタンを、共通の .btn に統一するメリットを書いてください。",
      hint: "保守性。",
      answer:
        "1ヶ所修正するだけで全画面のボタンが揃う。コード量が減り、UIに統一感が出る。",
    },
    quiz: {
      question: "CSS設計の主な目的は？",
      choices: ["容量削減のみ", "再利用・拡張・破綻防止", "見た目をきれいに", "JSの代わり"],
      answerIndex: 1,
      explanation: "規模に強いコードを作るための方針です。",
    },
    estimatedMinutes: 8,
    difficulty: 4,
  }),

  L(2, {
    chapter: "詳細度とカスケード",
    category: "詳細度",
    title: "CSSの詳細度",
    description: "どのCSSが勝つかを決めるルール。",
    goals: ["インライン > id > class > タグ の順を理解する"],
    webUseCase: "上書きが効かない時の99%は詳細度の話。",
    htmlConnection: "HTML側で id を使うと詳細度が一気に上がる。",
    jsReactConnection: "Reactでも CSS Modules で詳細度を低く保つのが基本。",
    tailwindConnection: "Tailwindはほぼ class セレクタなので詳細度が均一で扱いやすい。",
    explanation:
      "詳細度は (インライン, id, class/属性/疑似クラス, 要素/疑似要素) の4タプルで決まる。同じ詳細度なら『後勝ち』。",
    cssFileName: "specificity.css",
    cssExample: `/* (0, 1, 0, 0) */
#title { color: red; }
/* (0, 0, 1, 0) */
.title { color: blue; }`,
    htmlExample: `<h1 id="title" class="title">どっちの色？</h1>`,
    previewDescription: "id の方が詳細度が高いため、赤くなります。",
    visualChange: "詳細度のルールでどの色が勝つかが決まる。",
    codeExplanation: ["id > class なので id 側が勝つ。", "上書きしたいなら詳細度を上げる必要がある。"],
    commonMistakes: ["id を使いまくり、後から上書きできなくなる"],
    practice: {
      title: "詳細度の比較",
      task: ".btn と #btn-1 と <button style=\"...\"> のうち、最も強いのはどれ？",
      hint: "インライン。",
      answer: "インラインスタイル。次に #btn-1、最後が .btn。",
    },
    quiz: {
      question: "最も強い詳細度は？",
      choices: ["タグ", "class", "id", "インライン style"],
      answerIndex: 3,
      explanation: "インラインが最強。次にid。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(3, {
    chapter: "詳細度とカスケード",
    category: "詳細度",
    title: "カスケード（上書きの順序）",
    description: "詳細度・記述順・由来 によって勝敗が決まる。",
    goals: ["カスケード3原則を理解する"],
    webUseCase: "同じセレクタを2回書いたとき、後者が勝つ仕組みを理解する。",
    htmlConnection: "HTMLからの読み込み順がそのままカスケードの順。",
    jsReactConnection: "React のCSS Modules はファイルごとにスコープが切れて事故が減る。",
    tailwindConnection: "Tailwindは設計上、ほぼフラットな詳細度。",
    explanation:
      "①由来（ユーザーエージェント vs 著者）②詳細度 ③記述順 でCSSの勝敗が決まる。",
    cssFileName: "cascade.css",
    cssExample: `/* 同じ詳細度なら後者が勝つ */
.btn { background: #38BDF8; }
.btn { background: #3B82F6; } /* これが勝つ */`,
    htmlExample: `<button class="btn">後勝ちで色が決まる</button>`,
    previewDescription: "ボタンは2つ目に書いた色になります。",
    visualChange: "後ろに書いたCSSが勝つ。",
    codeExplanation: ["読み込み順 = 記述順。CSSのファイル順序にも要注意。"],
    commonMistakes: ["なぜか色が変わらない → 後で別ファイルに上書きされている"],
    practice: {
      title: "後勝ち",
      task: "同じセレクタで2回 background を書いたら、どちらが効きますか？",
      hint: "後勝ち。",
      answer: "あとに書かれた方が効きます（同じ詳細度の場合）。",
    },
    quiz: {
      question: "同じ詳細度のCSSが2つあるとき、どちらが勝つ？",
      choices: ["先に書いた方", "後に書いた方", "短い方", "長い方"],
      answerIndex: 1,
      explanation: "後勝ちです。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(4, {
    chapter: "詳細度とカスケード",
    category: "詳細度",
    title: "継承（inherit）",
    description: "親から子に自動的に引き継がれるプロパティがあります。",
    goals: ["color や font-family が継承されることを知る"],
    webUseCase: "body に1度書けば全テキストに効く、のは継承のおかげ。",
    htmlConnection: "親→子に流れる関係を意識する。",
    jsReactConnection: "コンポーネントの親で文字色を決めると、中身に伝わる。",
    tailwindConnection: "色や font は親に当てておくと子も継承される。",
    explanation:
      "color, font-family, line-height などはデフォルトで継承される。一方で margin や width は継承されない。",
    cssFileName: "inheritance.css",
    cssExample: `body { color: #E6EDF7; font-family: system-ui; }
.card { /* 子は color/font を引き継ぐ */ }`,
    htmlExample: `<body><div class="card">親のフォント色を継ぐ</div></body>`,
    previewDescription: "body に当てた color と font-family が、中の全要素に効きます。",
    visualChange: "親側に書くと一括で揃う。",
    codeExplanation: ["継承するもの: color, font-*, line-height, text-align など。"],
    commonMistakes: ["margin が継承されると思い込んで悩む"],
    practice: {
      title: "ベースの色",
      task: "body に color: #E6EDF7 を書いて全体に継承させてください。",
      hint: "継承。",
      answer: `body { color: #E6EDF7; }`,
    },
    quiz: {
      question: "継承されるプロパティは？",
      choices: ["margin", "padding", "color", "width"],
      answerIndex: 2,
      explanation: "color は継承される。レイアウト系は継承されない。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(5, {
    chapter: "詳細度とカスケード",
    category: "詳細度",
    title: "詳細度の衝突を解消する",
    description: "上書きしたい時の3つの戦略。",
    goals: ["セレクタを強くする / 順序を変える / リファクタする の選択肢を持つ"],
    webUseCase: "他の人が書いたCSSを上書きしたい時に役立つ。",
    htmlConnection: "HTMLの構造を変えて解決する手もある。",
    jsReactConnection: "CSS Modules / Scoped CSS で衝突自体を起こさないのがベスト。",
    tailwindConnection: "Utility-first だと詳細度がフラットで衝突が起きにくい。",
    explanation:
      "①詳細度を上げる（.parent .child）②順序を変える（後に書く）③そもそも詳細度を低く保つ（リファクタ）。基本は③が最善。",
    cssFileName: "specificity-fix.css",
    cssExample: `/* 詳細度を上げて勝つ例 */
.card .title { color: red; }      /* これが効く */
.title       { color: blue; }     /* 負ける */`,
    htmlExample: `<div class="card"><h3 class="title">どっちが勝つ？</h3></div>`,
    previewDescription: ".card .title の方が詳細度が高いので赤になります。",
    visualChange: "セレクタを足すと詳細度が上がる。",
    codeExplanation: ["セレクタを足すほど強くなるが、保守性は下がる。"],
    commonMistakes: ["!important で殴って、後で困る"],
    practice: {
      title: "詳細度アップ",
      task: ".btn より強くしたい時、どんなセレクタにする？",
      hint: ".container .btn など。",
      answer: ".container .btn { ... } のように親を含めて書くと詳細度が上がります。",
    },
    quiz: {
      question: "上書きの最終手段としてよく使われる（が推奨されない）のは？",
      choices: ["!important", "inherit", "@media", "calc()"],
      answerIndex: 0,
      explanation: "!important は乱用厳禁。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(6, {
    chapter: "詳細度とカスケード",
    category: "実務",
    title: "!important を避ける設計",
    description: "!important に頼らない書き方を身につけます。",
    goals: ["!important が必要になる前にやることがわかる"],
    webUseCase: "外部ライブラリのスタイルを上書きする時、最後の手段にする。",
    htmlConnection: "HTML側のクラス構造を整える。",
    jsReactConnection: "コンポーネント単位で完結させる設計が予防策。",
    tailwindConnection: "Tailwindは詳細度がフラットなので !important がほぼ不要。",
    explanation:
      "詳細度を上げる、順序を変える、CSS Modules を使う、設計を見直す。これでも勝てない時の最終手段が !important。",
    cssFileName: "important.css",
    cssExample: `/* ❌ */
.btn { color: red !important; }
/* ✅ より良い */
.theme-dark .btn { color: red; }`,
    htmlExample: `<div class="theme-dark"><button class="btn">テーマ別の色</button></div>`,
    previewDescription:
      "テーマクラスを親に付けて、子のボタンの色を切り替えられます。",
    visualChange: "!important なしで上書きできる。",
    codeExplanation: ["親クラスを付与すると詳細度が上がり、上書きしやすい。"],
    commonMistakes: ["最初から !important で書いてしまう"],
    practice: {
      title: "!importantを避ける",
      task: ".btn の color を !important なしでテーマごとに変える方法を書いてください。",
      hint: "親クラスを足す。",
      answer: ".theme-dark .btn { color: ...; } のように親クラスで詳細度を上げる。",
    },
    quiz: {
      question: "!important を使う前に試すべきは？",
      choices: ["JSで強制適用", "詳細度を上げる/順序変更", "別のフレームワークに変える", "あきらめる"],
      answerIndex: 1,
      explanation: "詳細度や順序の調整がまず先。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(7, {
    chapter: "デザインシステム",
    category: "命名",
    title: "BEM 命名規則",
    description: "Block / Element / Modifier の命名規則です。",
    goals: ["BEM の3要素を使い分けられる"],
    webUseCase: "中規模以上のチーム開発で読みやすさが上がる。",
    htmlConnection: "HTMLにクラス名で意図を埋め込む。",
    jsReactConnection: "コンポーネント名と BEM の Block 名を揃えると理解しやすい。",
    tailwindConnection: "Tailwindでは BEM を使わないことが多いが、考え方は応用可能。",
    explanation:
      "Block: 部品（card）、Element: 子要素（card__title）、Modifier: 状態違い（card--featured）。__ と -- が記号。",
    cssFileName: "bem.css",
    cssExample: `.card { padding: 16px; background: #18222F; border-radius: 12px; }
.card__title { font-weight: 700; color: #E6EDF7; }
.card__body  { color: #94A3B8; }
.card--featured { border: 2px solid #38BDF8; }`,
    htmlExample: `<div class="card card--featured">
  <h3 class="card__title">タイトル</h3>
  <p class="card__body">本文</p>
</div>`,
    previewDescription: "意図が伝わるクラス名で構造が読みやすくなります。",
    visualChange: "見た目は同じでも、コードの意図が読みやすい。",
    codeExplanation: ["Block__Element--Modifier の構造で、関係性が明確に。"],
    commonMistakes: ["__ と -- を取り違える", "Block 内に別 Block を入れて命名が混乱"],
    practice: {
      title: "BEM",
      task: ".alert--danger を 赤背景・白文字 にしてください。",
      hint: "Modifier クラス。",
      answer: `.alert--danger { background: #EF4444; color: #fff; }`,
    },
    quiz: {
      question: "BEM の Modifier の記号は？",
      choices: ["--", "__", "//", "::"],
      answerIndex: 0,
      explanation: "Modifier は -- です。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(8, {
    chapter: "デザインシステム",
    category: "設計",
    title: "CSS Modules の考え方",
    description: "コンポーネントごとにCSSをスコープ化します。",
    goals: ["クラス名衝突を防ぐ仕組みがわかる"],
    webUseCase: "中規模以上のSPAでクラス名の衝突を防げる。",
    htmlConnection: "import styles from './Card.module.css' で読み込む。",
    jsReactConnection: "Reactで一番使われる手法の1つ。",
    tailwindConnection: "Tailwindと併用する場合は Tailwind 優先で十分なことも。",
    explanation:
      "ビルド時にクラス名がハッシュ化され、他ファイルと絶対に衝突しなくなる。",
    cssFileName: "Card.module.css",
    cssExample: `/* Card.module.css */
.card { padding: 16px; background: #18222F; }
.title { font-weight: 700; }`,
    htmlExample: `import s from "./Card.module.css";
<div className={s.card}><h3 className={s.title}>...</h3></div>`,
    previewDescription:
      "クラス名が自動でユニーク化され、他のCSSと衝突しません。",
    visualChange: "見た目は普通のCSSと同じ。安心して命名できる。",
    codeExplanation: ["import で named export 扱い。", "クラス名はハッシュが付く。"],
    commonMistakes: ["普通の class 属性で書いてしまう"],
    practice: {
      title: "Modules",
      task: "CSS Modules の最大のメリットを1文で。",
      hint: "クラス名衝突。",
      answer: "クラス名がコンポーネントごとにスコープ化され、衝突しない。",
    },
    quiz: {
      question: "CSS Modules の特徴は？",
      choices: ["JSで動的生成", "クラス名のスコープ化", "アニメーションが速い", "色が変わる"],
      answerIndex: 1,
      explanation: "スコープ化が最大の魅力。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(9, {
    chapter: "デザインシステム",
    category: "設計",
    title: "Design Tokens（デザイントークン）",
    description: "色・余白・フォントを変数化して『真実の源』を1つにします。",
    goals: ["CSS変数で token を定義できる"],
    webUseCase: "ブランドカラー変更が1ヶ所で済む。",
    htmlConnection: "全ページの var(--color-primary) が一括変わる。",
    jsReactConnection: "Reactでも token を JS から参照できる。",
    tailwindConnection: "tailwind.config.js の theme.extend がトークン定義の場所。",
    explanation:
      "CSS変数（--color-primary など）で色・余白・サイズを定義。すべてのCSSが var() で参照する。",
    cssFileName: "tokens.css",
    cssExample: `:root {
  --color-primary: #38BDF8;
  --color-bg: #0F172A;
  --space-4: 16px;
  --radius-md: 12px;
}
.btn { background: var(--color-primary); padding: var(--space-4); border-radius: var(--radius-md); }`,
    htmlExample: `<button class="btn">トークンで作るボタン</button>`,
    previewDescription:
      "トークンを書き換えるだけで、全UIの色や余白が一気に切り替わります。",
    visualChange: "1ヶ所の変更が全体に波及する。",
    codeExplanation: ["var(--name) で参照。", "トークンは多くて中間にレイヤーを置く。"],
    commonMistakes: ["どこにも var() を使わずトークンが死蔵される"],
    practice: {
      title: "primary を変える",
      task: "--color-primary を #3B82F6 に変えると、何が起きますか？",
      hint: "全体の色。",
      answer: "var(--color-primary) を使っているすべての要素が新しい色に切り替わる。",
    },
    quiz: {
      question: "Design Tokens の主目的は？",
      choices: ["コード量を減らす", "真実の源を1つにする", "JSの軽量化", "URLを短くする"],
      answerIndex: 1,
      explanation: "Single Source of Truth がポイント。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(10, {
    chapter: "デザインシステム",
    category: "設計",
    title: "色設計の原則",
    description: "色のスケール（50〜900）を持つことで一貫性が生まれる。",
    goals: ["色のスケールを設計できる"],
    webUseCase: "Tailwindのような色スケールを自分で持っておく。",
    htmlConnection: "ボタン、カード、テキスト、影、すべての色は1つのスケールから引く。",
    jsReactConnection: "色を乱発せず、トークンから引く運用に。",
    tailwindConnection: "Tailwindの sky-50 〜 sky-900 がまさにスケールの典型。",
    explanation:
      "1色につき 50/100/200/.../900 のスケールを持ち、用途で決まった段階を使う（背景100、テキスト800など）。",
    cssFileName: "color-scale.css",
    cssExample: `:root {
  --sky-50:  #F0F9FF;
  --sky-300: #7DD3FC;
  --sky-500: #0EA5E9;
  --sky-700: #0369A1;
  --sky-900: #0C4A6E;
}
.btn { background: var(--sky-500); }`,
    htmlExample: `<button class="btn">スケールから取る色</button>`,
    previewDescription: "スケールを使うことで、同じ系統の色が安定して使えます。",
    visualChange: "ばらばらだった色が体系化される。",
    codeExplanation: ["色相を1〜数本に絞り、明度の段階で表現する。"],
    commonMistakes: ["新しい場面ごとに新しい色を発明する"],
    practice: {
      title: "色スケール",
      task: "ブランドカラーの 50, 500, 900 の3段階を定義してください。",
      hint: "薄→濃。",
      answer: `:root { --brand-50: #...; --brand-500: #...; --brand-900: #...; }`,
    },
    quiz: {
      question: "色スケールの利点は？",
      choices: ["色数が増える", "一貫性が出て管理が楽", "JSが速くなる", "印刷で綺麗"],
      answerIndex: 1,
      explanation: "一貫性と管理性が大きなメリット。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(11, {
    chapter: "デザインシステム",
    category: "設計",
    title: "余白設計（Spacing Scale）",
    description: "4 / 8 / 12 / 16 / 24 / 32 などのスケールを決めて使い回す。",
    goals: ["余白スケールが設計できる"],
    webUseCase: "余白がそろうとUIが急にプロっぽく見える。",
    htmlConnection: "全コンポーネントが同じ余白スケールを使う。",
    jsReactConnection: "props で size=\"sm\" のような指定にする。",
    tailwindConnection: "p-1 (4px) ・p-2 (8px)・p-4 (16px)…と既にスケール化されている。",
    explanation:
      "4の倍数または 8の倍数のスケールが扱いやすい。連続的な数字より、決まった段階を使う方が揃う。",
    cssFileName: "spacing.css",
    cssExample: `:root {
  --s-1: 4px;
  --s-2: 8px;
  --s-3: 12px;
  --s-4: 16px;
  --s-6: 24px;
  --s-8: 32px;
}
.card { padding: var(--s-4); }`,
    htmlExample: `<div class="card">統一された余白</div>`,
    previewDescription: "全UIが同じ余白で揃い、整った印象になります。",
    visualChange: "細かい数字のばらつきが消える。",
    codeExplanation: ["スケールから外れる値はなるべく避ける。"],
    commonMistakes: ["13px や 17px など中途半端な値で揃わない"],
    practice: {
      title: "余白スケール",
      task: "8px ベースのスケールで --s-1〜--s-8 を作ってください。",
      hint: "8, 16, 24, 32...。",
      answer: `:root { --s-1: 8px; --s-2: 16px; --s-3: 24px; --s-4: 32px; }`,
    },
    quiz: {
      question: "おすすめの余白スケールの倍数は？",
      choices: ["3", "4 または 8", "5", "7"],
      answerIndex: 1,
      explanation: "4 / 8 が一般的。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(12, {
    chapter: "デザインシステム",
    category: "設計",
    title: "タイポグラフィ設計",
    description: "見出しと本文のサイズ階段を設計します。",
    goals: ["3〜5段階のサイズ階段を持てる"],
    webUseCase: "見出しと本文のサイズが揃うと、視線の動きが整理される。",
    htmlConnection: "h1〜h6 と本文のサイズを統一。",
    jsReactConnection: "Heading 系コンポーネントを作る。",
    tailwindConnection: "text-xs〜text-3xl までのスケールを参考に。",
    explanation:
      "サイズ・行間・太さをセットでスタイル化する。本文/見出し1〜3 くらいで十分。",
    cssFileName: "typography.css",
    cssExample: `:root {
  --text-base: 16px;
  --text-md:   18px;
  --text-lg:   24px;
  --text-xl:   32px;
}
.h1 { font-size: var(--text-xl); line-height: 1.3; font-weight: 800; }
.h2 { font-size: var(--text-lg); line-height: 1.35; font-weight: 700; }
.body { font-size: var(--text-base); line-height: 1.7; }`,
    htmlExample: `<h1 class="h1">見出し</h1>
<h2 class="h2">小見出し</h2>
<p class="body">本文</p>`,
    previewDescription: "サイズ・行間・太さがセットで決まり、整った階層が表現されます。",
    visualChange: "情報のヒエラルキーが明確に。",
    codeExplanation: ["サイズだけでなく行間と太さもセットで決めるのがコツ。"],
    commonMistakes: ["サイズだけ決めて行間がバラバラ"],
    practice: {
      title: "見出し階段",
      task: "h1=32px / h2=24px / body=16px の3段階を CSS変数で定義してください。",
      hint: "var()。",
      answer: `:root { --text-xl: 32px; --text-lg: 24px; --text-base: 16px; }`,
    },
    quiz: {
      question: "タイポ設計でセットにすべきは？",
      choices: ["色だけ", "サイズだけ", "サイズ＋行間＋太さ", "フォント名だけ"],
      answerIndex: 2,
      explanation: "サイズ・行間・太さは1セット。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(13, {
    chapter: "デザインシステム",
    category: "設計",
    title: "コンポーネント設計",
    description: "再利用される部品としてUIを切り出します。",
    goals: ["Button/Card/Input などの粒度の決め方"],
    webUseCase: "Atomic Design や Headless UI の発想に通じる。",
    htmlConnection: "props 的に切り替えるパラメータを意識して書く。",
    jsReactConnection: "Reactと最も相性が良い設計。",
    tailwindConnection: "@apply でTailwindを再利用パーツに固める手もある。",
    explanation:
      "原子（Button） → 分子（CardWithButton） → 有機体（HeroSection） とサイズで階層化する。",
    cssFileName: "components.css",
    cssExample: `/* Atom */
.btn { padding: 10px 16px; border-radius: 12px; }
.btn--primary { background: #38BDF8; color: #0F172A; }
/* Molecule */
.formField { display: flex; flex-direction: column; gap: 6px; }`,
    htmlExample: `<div class="formField">
  <label>名前</label>
  <input class="input" />
  <button class="btn btn--primary">送信</button>
</div>`,
    previewDescription:
      "小さい部品を組み合わせて、いろんな画面を組み立てられます。",
    visualChange: "再利用性とテストのしやすさが上がる。",
    codeExplanation: ["小さい単位に分けるほど再利用しやすい。"],
    commonMistakes: ["1コンポーネントにあれこれ詰め込みすぎる"],
    practice: {
      title: "粒度",
      task: "<LoginForm> はAtomic Designのどの階層か？",
      hint: "複数の要素を含む。",
      answer: "Organism（有機体）レベル。Atom（input/button）が組み合わさっている。",
    },
    quiz: {
      question: "Atomic Designで一番小さな単位は？",
      choices: ["Atom", "Molecule", "Organism", "Template"],
      answerIndex: 0,
      explanation: "Atom が最小です。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(14, {
    chapter: "デザインシステム",
    category: "設計",
    title: "レイアウト設計（Stack / Cluster）",
    description: "余白も部品として捉える Every Layout 流の発想。",
    goals: ["Stack/Cluster/Grid を意識的に使い分けられる"],
    webUseCase: "余白を『部品』として明示することで、UIが破綻しなくなる。",
    htmlConnection: "Stack コンポーネントで子要素を縦に積む。",
    jsReactConnection: "<Stack gap=4> のような専用コンポーネント化。",
    tailwindConnection: "space-y-4 や gap-4 で表現できる。",
    explanation:
      "Stack: 縦積み + gap、Cluster: 横並び + gap + wrap、Grid: 二次元。状況で使い分ける。",
    cssFileName: "layout.css",
    cssExample: `.stack > * + * { margin-top: 16px; }
.cluster { display: flex; flex-wrap: wrap; gap: 8px; }`,
    htmlExample: `<div class="stack">
  <div>1</div><div>2</div><div>3</div>
</div>`,
    previewDescription: "Stackで縦積み、Clusterで折り返し付き横並びが作れます。",
    visualChange: "余白の責務が明確になる。",
    codeExplanation: ["* + * セレクタは『隣接した子』を指す。"],
    commonMistakes: ["コンポーネントの中に余白を持たせて再利用が壊れる"],
    practice: {
      title: "Stack",
      task: ".stack > * + * { margin-top: 12px } を書いてください。",
      hint: "隣接セレクタ。",
      answer: `.stack > * + * { margin-top: 12px; }`,
    },
    quiz: {
      question: "Cluster は？",
      choices: ["縦に積む", "折り返し付き横並び", "1要素中央", "左寄せ固定"],
      answerIndex: 1,
      explanation: "Cluster は wrap 付き横並び。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(15, {
    chapter: "デザインシステム",
    category: "実務",
    title: "レスポンシブ設計の実務",
    description: "ブレークポイントの決め方と運用方針。",
    goals: ["『スマホ→タブレット→PC』の3段が基本だと知る"],
    webUseCase: "プロジェクト全体で BP を統一する。",
    htmlConnection: "メディアクエリの記述順を一貫させる。",
    jsReactConnection: "useMediaQuery で JS 側で判定するのは最終手段。",
    tailwindConnection: "sm: 640 / md: 768 / lg: 1024 / xl: 1280 が定番。",
    explanation:
      "BPを増やしすぎない。Tailwindの 640/768/1024/1280 は実務で十分。",
    cssFileName: "responsive.css",
    cssExample: `:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
}
@media (min-width: 768px) { /* PC寄り */ }`,
    htmlExample: `<div>レスポンシブな何か</div>`,
    previewDescription: "BPを統一すれば、どの画面サイズでも一貫して見えます。",
    visualChange: "ブレークポイントの統一はチーム全員のミスを減らす。",
    codeExplanation: ["BPはCSS変数化しても良い。"],
    commonMistakes: ["コンポーネントごとに違うBPを使う"],
    practice: {
      title: "標準BP",
      task: "Tailwindの md/lg のpx値は？",
      hint: "768 / 1024。",
      answer: "md=768px, lg=1024px。",
    },
    quiz: {
      question: "BPは何個くらいが扱いやすい？",
      choices: ["1〜2個", "3〜4個", "10個", "コンポーネントの数だけ"],
      answerIndex: 1,
      explanation: "3〜4個に絞るのが実務的。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(16, {
    chapter: "デザインシステム",
    category: "実務",
    title: "Fluid Typography",
    description: "media queryなしで滑らかにサイズ変化させる手法。",
    goals: ["clamp + vw の組み合わせを使える"],
    webUseCase: "段階ではなく連続的に変えたい見出しに。",
    htmlConnection: "h1 などの大きい文字に。",
    jsReactConnection: "JSなしでレスポンシブが完結。",
    tailwindConnection: "text-[clamp(...)] で指定可。",
    explanation:
      "font-size: clamp(min, vw, max); で画面幅に応じて連続変化。",
    cssFileName: "fluid.css",
    cssExample: `h1 { font-size: clamp(28px, 4vw + 1rem, 56px); }`,
    htmlExample: `<h1>連続して大きくなる見出し</h1>`,
    previewDescription:
      "ウィンドウサイズに応じて、見出しのサイズが切れ目なく変化します。",
    visualChange: "段階の切替が消えて滑らかに。",
    codeExplanation: ["vw + rem の式が滑らかさの秘訣。"],
    commonMistakes: ["最低値が小さすぎてスマホで読めない"],
    practice: {
      title: "Fluid",
      task: "h2 を clamp(20px, 2vw + 16px, 32px) にしてください。",
      hint: "clamp。",
      answer: `h2 { font-size: clamp(20px, 2vw + 16px, 32px); }`,
    },
    quiz: {
      question: "Fluid Typography に使うのは？",
      choices: ["calc()", "clamp()", "media query", "rem"],
      answerIndex: 1,
      explanation: "clamp() が中心。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(17, {
    chapter: "デザインシステム",
    category: "実務",
    title: "Container Query",
    description: "親要素のサイズに応じてスタイルを切り替えます。",
    goals: ["Container Query の基本構文を知る"],
    webUseCase: "同じカードを、サイドバーの中とメイン内で違う見た目にできる。",
    htmlConnection: "親に container を当て、子で @container で分岐。",
    jsReactConnection: "コンポーネント単体でレスポンシブが完結する。",
    tailwindConnection: "@container/cardname のプラグインが用意されている。",
    explanation:
      "viewport ではなく『コンテナ幅』で分岐できる新機能。コンポーネント志向と相性抜群。",
    cssFileName: "container.css",
    cssExample: `.card { container-type: inline-size; }
@container (min-width: 320px) {
  .card-title { font-size: 20px; }
}`,
    htmlExample: `<section class="card"><h3 class="card-title">タイトル</h3></section>`,
    previewDescription: "親の幅が320px以上のときに、カード内タイトルが大きくなります。",
    visualChange: "ページ全体ではなく、カード単体でレスポンシブ。",
    codeExplanation: ["container-type を親に書くのを忘れずに。"],
    commonMistakes: ["@media と感覚的に同じだと思って混同する"],
    practice: {
      title: "Container",
      task: ".card を container-type: inline-size に。",
      hint: "container-type。",
      answer: `.card { container-type: inline-size; }`,
    },
    quiz: {
      question: "Container Query が分岐の基準にするのは？",
      choices: ["viewport", "親要素のサイズ", "ユーザー操作", "JSの変数"],
      answerIndex: 1,
      explanation: "親（コンテナ）のサイズです。",
    },
    estimatedMinutes: 7,
    difficulty: 5,
  }),

  L(18, {
    chapter: "デザインシステム",
    category: "実務",
    title: "CSS変数（Custom Properties）",
    description: "テーマ切替やトークン定義に使う最重要機能。",
    goals: ["var() と --変数 を自在に使える"],
    webUseCase: "テーマ切替、コンポーネントのカスタマイズに。",
    htmlConnection: ":root に書けばグローバル、コンポーネントに書けば局所。",
    jsReactConnection: "JSから setProperty で動的に変更できる。",
    tailwindConnection: "Tailwind v3 以降、内部でも CSS変数を使っている。",
    explanation:
      "--name: value; で定義し var(--name) で参照。継承される。",
    cssFileName: "vars.css",
    cssExample: `.btn {
  --bg: #38BDF8;
  background: var(--bg);
}
.btn--danger { --bg: #EF4444; }`,
    htmlExample: `<button class="btn">通常</button>
<button class="btn btn--danger">削除</button>`,
    previewDescription: "ボタンの色違いをCSS変数の差し替えだけで作れます。",
    visualChange: "1行の変更で見た目が変わる。",
    codeExplanation: ["変数は継承するため、子要素に局所的に上書きできる。"],
    commonMistakes: ["デフォルト値を持たせず、未定義時に空白で詰まる"],
    practice: {
      title: "テーマ",
      task: ":root に --color-text: #E6EDF7 を書き、body の color を var(--color-text) にしてください。",
      hint: "2行。",
      answer: `:root { --color-text: #E6EDF7; } body { color: var(--color-text); }`,
    },
    quiz: {
      question: "CSS変数の参照は？",
      choices: ["@var(name)", "var(--name)", "${name}", "%name%"],
      answerIndex: 1,
      explanation: "var(--name) が正解。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(19, {
    chapter: "デザインシステム",
    category: "実務",
    title: "テーマ設計",
    description: "ライト/ダーク/ブランド別テーマを切り替える。",
    goals: ["data-theme 属性で切替えできる"],
    webUseCase: "ユーザーが好きなテーマに切り替えられる。",
    htmlConnection: "<html data-theme=\"dark\">のように属性を切り替える。",
    jsReactConnection: "状態と localStorage を組み合わせるのが定番。",
    tailwindConnection: "darkMode: 'class' を使う方法。",
    explanation:
      "[data-theme=\"dark\"] のセレクタで CSS変数 を上書きするだけ。",
    cssFileName: "theme.css",
    cssExample: `:root { --bg: #FFFFFF; --text: #0F172A; }
[data-theme="dark"] { --bg: #0F172A; --text: #E6EDF7; }
body { background: var(--bg); color: var(--text); }`,
    htmlExample: `<html data-theme="dark"><body>ダークテーマ</body></html>`,
    previewDescription: "属性を切り替えるだけで、すべての色が一気に変わります。",
    visualChange: "テーマ切替が綺麗に動く。",
    codeExplanation: ["全ての色を変数経由にしておくと、テーマ切替が一行で済む。"],
    commonMistakes: ["一部だけ生の色を書いて切り替わらない"],
    practice: {
      title: "テーマ切替",
      task: "[data-theme=\"dark\"] で --bg を黒、--text を白にしてください。",
      hint: "属性セレクタ。",
      answer: `[data-theme="dark"] { --bg: #000; --text: #fff; }`,
    },
    quiz: {
      question: "テーマ切替の典型的な手法は？",
      choices: ["条件分岐CSS", "data属性 + CSS変数", "JSで全要素に style", "img切替"],
      answerIndex: 1,
      explanation: "data属性 + CSS変数 が定番。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(20, {
    chapter: "デザインシステム",
    category: "実務",
    title: "ダークモード設計",
    description: "ダークモード特有の注意点。",
    goals: ["コントラスト・影・色相の調整がいる理由がわかる"],
    webUseCase: "ダーク版を作るとき、単に色を反転するだけではダメ。",
    htmlConnection: "色のトークンが二重定義になる。",
    jsReactConnection: "テーマ切替は確認用UIを必ず作る。",
    tailwindConnection: "dark:bg-slate-900。",
    explanation:
      "ダークでは影が見えにくい→影を弱くする/ボーダーで代用。明度を上げすぎると眩しい。色相を少し落ち着かせる。",
    cssFileName: "dark.css",
    cssExample: `[data-theme="dark"] {
  --bg: #0F172A;
  --text: #E6EDF7;
  --shadow: 0 6px 18px rgba(0,0,0,0.5);
}`,
    htmlExample: `<div class="card">ダーク用カード</div>`,
    previewDescription:
      "ダークでも視認性が落ちないよう、影や色を調整した結果が表示されます。",
    visualChange: "見やすいダークUIに。",
    codeExplanation: ["白系→グレー、強い赤→落ち着いた赤など、彩度を下げる調整も。"],
    commonMistakes: ["ライトの色をそのまま反転しただけで眩しい"],
    practice: {
      title: "ダーク影",
      task: "ダークモードで shadow の alpha を強めにしてください。",
      hint: "rgba。",
      answer: `[data-theme="dark"] { --shadow: 0 6px 18px rgba(0,0,0,0.6); }`,
    },
    quiz: {
      question: "ダークモード設計のポイントは？",
      choices: ["色を完全反転", "影と彩度の調整", "JSで色変更", "影を強く"],
      answerIndex: 1,
      explanation: "影や彩度の繊細な調整がカギ。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(21, {
    chapter: "アクセシビリティ",
    category: "A11y",
    title: "アクセシビリティとCSS",
    description: "色だけ・サイズだけに頼らない設計。",
    goals: ["A11yの第一歩を理解する"],
    webUseCase: "色覚多様性、視力低下、キーボード操作のユーザーに配慮。",
    htmlConnection: "セマンティックなタグを使うのが最初の一歩。",
    jsReactConnection: "ボタンは <button>、リンクは <a>、状態は aria-* で。",
    tailwindConnection: "sr-only でスクリーンリーダー用テキストを差し込める。",
    explanation:
      "色だけで状態を伝えない（アイコンや文字も併用）。十分なフォントサイズと余白を保つ。",
    cssFileName: "a11y.css",
    cssExample: `.error { color: #EF4444; }
.error::before { content: '⚠ '; }`,
    htmlExample: `<p class="error">エラー</p>`,
    previewDescription: "赤色 + アイコンの組み合わせで、色覚に頼らず警告が伝わります。",
    visualChange: "色だけで判断しなくて済む。",
    codeExplanation: ["::before などでアイコンを補助。"],
    commonMistakes: ["色だけで状態を表す（赤=エラー、緑=成功）"],
    practice: {
      title: "アイコン補助",
      task: ".success に ✔ アイコンを ::before で付けてください。",
      hint: "::before content。",
      answer: `.success::before { content: '✔ '; }`,
    },
    quiz: {
      question: "色だけで情報を伝えない理由は？",
      choices: ["流行", "色覚多様性に対応", "JSが速い", "印刷で綺麗"],
      answerIndex: 1,
      explanation: "色覚多様性のためにアイコンや文字も併用。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(22, {
    chapter: "アクセシビリティ",
    category: "A11y",
    title: ":focus-visible",
    description: "キーボード操作時だけフォーカスリングを表示する。",
    goals: [":focus と :focus-visible の違いがわかる"],
    webUseCase: "マウスでクリックしたときの不要なリングを抑え、Tabキー時には出す。",
    htmlConnection: "interactive な要素に。",
    jsReactConnection: "Reactでも標準的に使える。",
    tailwindConnection: "focus-visible:ring。",
    explanation:
      ":focus は常に効くが、:focus-visible はキーボード操作などUserAgentが『フォーカスを表示すべき』と判断した時だけ。",
    cssFileName: "focus.css",
    cssExample: `.btn:focus { outline: none; }
.btn:focus-visible { outline: 2px solid #38BDF8; outline-offset: 2px; }`,
    htmlExample: `<button class="btn">Tabしてフォーカス確認</button>`,
    previewDescription:
      "マウスクリック時はリングなし、Tabキーで移動した時だけリング表示。",
    visualChange: "見た目はクリーン、A11y は守る。",
    codeExplanation: [":focus-visible はモダンブラウザで使える。"],
    commonMistakes: ["outline: none だけ書いてA11y を壊す"],
    practice: {
      title: "focus-visible",
      task: ".btn:focus-visible に outline: 2px solid #38BDF8 を当ててください。",
      hint: ":focus-visible。",
      answer: `.btn:focus-visible { outline: 2px solid #38BDF8; }`,
    },
    quiz: {
      question: ":focus-visible が出るのは？",
      choices: ["常時", "キーボード操作時など", "ホバー時", "JSで指定時"],
      answerIndex: 1,
      explanation: "キーボード操作時など、UserAgentがリング表示を判断したとき。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(23, {
    chapter: "アクセシビリティ",
    category: "A11y",
    title: "コントラスト比の確認",
    description: "WCAG AA / AAA 基準を意識する。",
    goals: ["AA 4.5:1 / AAA 7:1 を覚える"],
    webUseCase: "本文はAA、できればAAAを目標に。",
    htmlConnection: "テキストと背景の組み合わせ。",
    jsReactConnection: "デザインシステムで色決定の段階で計測。",
    tailwindConnection: "Tailwindの色は明度差が設計されている。",
    explanation:
      "本文（小さい文字）4.5:1以上が AA。大きい文字は3:1。AAAは7:1。",
    cssFileName: "contrast.css",
    cssExample: `/* 4.5:1以上を目標に */
.body { color: #E6EDF7; background: #0F172A; }`,
    htmlExample: `<p class="body">読みやすい本文</p>`,
    previewDescription: "本文と背景のコントラストが十分にあり、読みやすい状態。",
    visualChange: "ストレスのない閲覧体験。",
    codeExplanation: ["WebAIM の Contrast Checker が便利。"],
    commonMistakes: ["デザインカンプの薄いグレーをそのまま採用"],
    practice: {
      title: "コントラスト",
      task: "AA基準を満たす本文の色組み合わせを1つ書いてください。",
      hint: "暗背景なら明文字。",
      answer: "background: #0F172A; color: #E6EDF7; （約12:1）",
    },
    quiz: {
      question: "WCAG AA の本文基準は？",
      choices: ["3:1", "4.5:1", "5:1", "7:1"],
      answerIndex: 1,
      explanation: "4.5:1 が AA 本文基準。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(24, {
    chapter: "アクセシビリティ",
    category: "A11y",
    title: "prefers-reduced-motion",
    description: "アニメーションを控えたい人への配慮。",
    goals: ["motion-reduce 対応を1ヶ所に書ける"],
    webUseCase: "前庭障害などでアニメに弱いユーザーに配慮。",
    htmlConnection: "OSの設定値を CSS から取得。",
    jsReactConnection: "JS でも window.matchMedia で取得可能。",
    tailwindConnection: "motion-reduce:transition-none。",
    explanation:
      "@media (prefers-reduced-motion: reduce) で、アニメを無効化または最小化。",
    cssFileName: "motion.css",
    cssExample: `.btn { transition: transform 200ms ease; }
@media (prefers-reduced-motion: reduce) {
  .btn { transition: none; }
}`,
    htmlExample: `<button class="btn">設定を尊重</button>`,
    previewDescription:
      "OSで『動きを減らす』にしている場合、ボタンの動きが消えます。",
    visualChange: "ユーザー設定に応じてアニメON/OFF。",
    codeExplanation: ["全アニメに一律で対応するセクションを設けるのが楽。"],
    commonMistakes: ["対応せず、アニメで気分を悪くするユーザーが出る"],
    practice: {
      title: "motion-reduce",
      task: "@media (prefers-reduced-motion: reduce) の中で .btn の transition を none に。",
      hint: "media。",
      answer: `@media (prefers-reduced-motion: reduce) { .btn { transition: none; } }`,
    },
    quiz: {
      question: "アニメを控えたい人向けの media は？",
      choices: ["prefers-color-scheme", "prefers-reduced-motion", "prefers-no-animation", "min-motion"],
      answerIndex: 1,
      explanation: "prefers-reduced-motion です。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(25, {
    chapter: "アニメーション",
    category: "アニメ",
    title: "アニメーション設計",
    description: "派手すぎない、邪魔しないアニメ。",
    goals: ["強調アニメと装飾アニメの違いを意識する"],
    webUseCase: "ホバーや出現時、ユーザーに必要な視覚情報だけを。",
    htmlConnection: "状態変化に応じて class を切り替える。",
    jsReactConnection: "Framer Motion なども選択肢に入る。",
    tailwindConnection: "transition と animate-*。",
    explanation:
      "目的のないアニメは UX を下げる。ユーザーの操作・状態変化を強調する目的で使う。",
    cssFileName: "anim-design.css",
    cssExample: `.menu {
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 200ms ease, transform 200ms ease;
}
.menu.is-open { opacity: 1; transform: translateY(0); }`,
    htmlExample: `<div class="menu is-open">メニュー</div>`,
    previewDescription:
      "クラス追加でメニューがふわっと現れる、控えめで上品な動き。",
    visualChange: "操作の結果がわかる演出に。",
    codeExplanation: ["transform と opacity の組み合わせは軽い。"],
    commonMistakes: ["何でもかんでもアニメさせて重く感じさせる"],
    practice: {
      title: "出現アニメ",
      task: ".menu.is-open に opacity: 1; transform: translateY(0); を当ててください。",
      hint: "状態クラス。",
      answer: `.menu.is-open { opacity: 1; transform: translateY(0); }`,
    },
    quiz: {
      question: "GPUに優しいアニメプロパティは？",
      choices: ["margin", "transform / opacity", "padding", "font-size"],
      answerIndex: 1,
      explanation: "transform と opacity は軽い。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(26, {
    chapter: "アニメーション",
    category: "アニメ",
    title: "transition の実務",
    description: "all を避け、必要なプロパティだけ書く。",
    goals: ["`all` の落とし穴を知る"],
    webUseCase: "意図しないプロパティの変化が突然動いて事故る。",
    htmlConnection: "コンポーネント単位で transition を限定する。",
    jsReactConnection: "状態切替の影響範囲を最小化する。",
    tailwindConnection: "transition-colors, transition-transform。",
    explanation:
      "transition: all は便利だが、意図しないプロパティもアニメするので、明示するのが実務的。",
    cssFileName: "transition-best.css",
    cssExample: `/* ❌ */
.btn { transition: all 200ms ease; }
/* ✅ */
.btn { transition: background 200ms ease, transform 200ms ease; }`,
    htmlExample: `<button class="btn">明示する</button>`,
    previewDescription: "明示的に transition するプロパティを限定する書き方。",
    visualChange: "意図通りにだけアニメする。",
    codeExplanation: ["カンマで複数指定。"],
    commonMistakes: ["all で予期せぬ動きが出る"],
    practice: {
      title: "明示transition",
      task: ".btn の transition を background, transform に限定してください。",
      hint: "カンマ区切り。",
      answer: `.btn { transition: background 200ms ease, transform 200ms ease; }`,
    },
    quiz: {
      question: "transition で避けたい記述は？",
      choices: ["transition: background", "transition: transform", "transition: all", "transition: none"],
      answerIndex: 2,
      explanation: "all は予期しない動きの元。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(27, {
    chapter: "アニメーション",
    category: "アニメ",
    title: "@keyframes",
    description: "複雑なアニメは keyframes で定義する。",
    goals: ["@keyframes の書き方を覚える"],
    webUseCase: "ローディング、シマー、出現アニメ。",
    htmlConnection: "対応する要素に animation プロパティ。",
    jsReactConnection: "ライブラリに頼らず実装する基礎。",
    tailwindConnection: "tailwind.config.js の theme.extend.keyframes。",
    explanation:
      "@keyframes name { 0% {...} 100% {...} } で定義し、要素には animation: name 1s ease infinite。",
    cssFileName: "anim.css",
    cssExample: `@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  width: 24px; height: 24px;
  border: 3px solid #243049; border-top-color: #38BDF8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}`,
    htmlExample: `<div class="spinner"></div>`,
    previewDescription: "くるくる回るローディングスピナーが表示されます。",
    visualChange: "JSなしでアニメが実装できる。",
    codeExplanation: ["animation: 名前 時間 イージング 繰り返し。"],
    commonMistakes: ["forwards を忘れて元に戻ってしまう"],
    practice: {
      title: "Spinner",
      task: ".spinner に animation: spin 1s linear infinite を当ててください。",
      hint: "infinite で永遠。",
      answer: `.spinner { animation: spin 1s linear infinite; }`,
    },
    quiz: {
      question: "アニメを永遠に繰り返すキーワードは？",
      choices: ["forever", "infinite", "loop", "endless"],
      answerIndex: 1,
      explanation: "infinite。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(28, {
    chapter: "アニメーション",
    category: "アニメ",
    title: "transform を理解する",
    description: "translate / scale / rotate / skew の4基本。",
    goals: ["transform の組み合わせが書ける"],
    webUseCase: "ホバー、ドラッグ、出現アニメ。",
    htmlConnection: "要素のレイアウトを崩さず動かせる。",
    jsReactConnection: "状態に応じて transform を切り替える。",
    tailwindConnection: "translate-x-2, scale-105, rotate-3。",
    explanation:
      "transform は複数を空白区切りで指定可能。translate(x,y) scale() rotate() skew()。",
    cssFileName: "transform.css",
    cssExample: `.icon:hover {
  transform: translateY(-2px) scale(1.05) rotate(-2deg);
}`,
    htmlExample: `<span class="icon">★</span>`,
    previewDescription:
      "ホバー時に星が少し浮き、わずかに大きくなり、ちょっと傾きます。",
    visualChange: "微小な動きで生命感を出せる。",
    codeExplanation: ["transformは1つのプロパティで、空白区切りで複数指定。"],
    commonMistakes: ["transform を複数行書いて上書きしてしまう"],
    practice: {
      title: "Translate + Scale",
      task: ".btn:hover に transform: translateY(-2px) scale(1.02) を当ててください。",
      hint: "transform。",
      answer: `.btn:hover { transform: translateY(-2px) scale(1.02); }`,
    },
    quiz: {
      question: "transform は何個まで複数指定できる？",
      choices: ["1個", "2個", "何個でも（空白区切り）", "3個まで"],
      answerIndex: 2,
      explanation: "空白区切りで何個でも。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(29, {
    chapter: "パフォーマンス",
    category: "性能",
    title: "GPUを意識したアニメーション",
    description: "transform と opacity だけで動かすのが基本。",
    goals: ["再描画と再合成の違いがわかる"],
    webUseCase: "60fps で滑らかなUIを保つ。",
    htmlConnection: "アニメ対象に will-change を必要時だけ付ける。",
    jsReactConnection: "Reactでも CSS の世界で完結させる。",
    tailwindConnection: "will-change-transform。",
    explanation:
      "width / margin の変更は再レイアウトが走り重い。transform / opacity は合成だけで済むため軽い。",
    cssFileName: "gpu.css",
    cssExample: `.fast { transition: transform 200ms ease, opacity 200ms ease; }
.heavy { transition: width 200ms ease; } /* なるべく避ける */`,
    htmlExample: `<div class="fast">滑らか</div>`,
    previewDescription:
      "transformによる動きは、widthによる動きと比べてカクつきが少ないです。",
    visualChange: "60fpsを保てる。",
    codeExplanation: ["will-change はアニメ前後でつけ外しすると効率的。"],
    commonMistakes: ["will-change を全要素につけて逆に重くなる"],
    practice: {
      title: "軽いアニメ",
      task: "transform と opacity だけで構成されたアニメの例を書いてください。",
      hint: "translateと opacity。",
      answer: `.fade { transition: opacity 200ms ease, transform 200ms ease; }`,
    },
    quiz: {
      question: "アニメで軽いプロパティは？",
      choices: ["margin", "transform", "padding", "width"],
      answerIndex: 1,
      explanation: "transform / opacity が軽い。",
    },
    estimatedMinutes: 7,
    difficulty: 5,
  }),

  L(30, {
    chapter: "パフォーマンス",
    category: "性能",
    title: "パフォーマンスを意識したCSS",
    description: "セレクタと擬似要素の使いすぎに注意。",
    goals: ["重いCSSの傾向を知る"],
    webUseCase: "大規模UIで体感速度を維持する。",
    htmlConnection: "不要なネスト・複雑なセレクタを避ける。",
    jsReactConnection: "コンポーネント分割を細かくしすぎないバランス。",
    tailwindConnection: "Utility-first はマッチが速い。",
    explanation:
      "深いネストや、* セレクタの濫用、巨大なフィルターやshadowは描画に効く。",
    cssFileName: "perf.css",
    cssExample: `/* ❌ 重いセレクタ例 */
body div ul li a span { color: red; }
/* ✅ シンプル */
.menu-link { color: red; }`,
    htmlExample: `<a class="menu-link" href="#">Menu</a>`,
    previewDescription: "フラットなクラスは速くマッチでき、保守も楽です。",
    visualChange: "見た目同じでも、速度や保守性が違う。",
    codeExplanation: ["セレクタは右から左にマッチされるため、長いほど不利。"],
    commonMistakes: ["過剰にネストして詳細度も上がってしまう"],
    practice: {
      title: "シンプル化",
      task: "深いネストを1クラスにリファクタする利点は？",
      hint: "速度+保守。",
      answer: "マッチが速い。詳細度が低くて上書きしやすい。読みやすい。",
    },
    quiz: {
      question: "セレクタが評価される向きは？",
      choices: ["左→右", "右→左", "中央から", "順不同"],
      answerIndex: 1,
      explanation: "右から左に評価されます。",
    },
    estimatedMinutes: 6,
    difficulty: 5,
  }),

  L(31, {
    chapter: "パフォーマンス",
    category: "性能",
    title: "CLS（Cumulative Layout Shift）を防ぐ",
    description: "後から要素が割り込んで画面が動くのを防ぐ。",
    goals: ["aspect-ratio や width/height で枠を確保する"],
    webUseCase: "画像や広告の遅延ロードでガタつくのを防止。",
    htmlConnection: "<img width height> または aspect-ratio で領域確保。",
    jsReactConnection: "Skeleton で領域を先に確保。",
    tailwindConnection: "aspect-video など。",
    explanation:
      "画像の高さを事前に確保しておくと、ロード後にレイアウトが動かない。",
    cssFileName: "cls.css",
    cssExample: `.thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: #1E293B;
}`,
    htmlExample: `<img class="thumb" src="/cover.jpg" alt="" />`,
    previewDescription:
      "画像が読み込まれる前に枠が確保されるので、レイアウトが動きません。",
    visualChange: "ガタつきが消える。",
    codeExplanation: ["aspect-ratio が領域を先に決める。"],
    commonMistakes: ["width/heightをimg属性で指定しない"],
    practice: {
      title: "CLS対策",
      task: ".banner に aspect-ratio: 3/1 を入れてください。",
      hint: "aspect-ratio。",
      answer: `.banner { aspect-ratio: 3/1; }`,
    },
    quiz: {
      question: "CLSを防ぐ方法は？",
      choices: ["lazy load", "領域を先に確保", "画像を圧縮", "JS削除"],
      answerIndex: 1,
      explanation: "aspect-ratio などで先に領域を確保。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(32, {
    chapter: "パフォーマンス",
    category: "画像",
    title: "画像レイアウト最適化",
    description: "適切なサイズ・形式・loading 属性。",
    goals: ["loading=\"lazy\" の使い方がわかる"],
    webUseCase: "ファーストビューに大量の画像があるサイトで効果絶大。",
    htmlConnection: "img loading=\"lazy\" decoding=\"async\"。",
    jsReactConnection: "Next.js Image が自動でやってくれる。",
    tailwindConnection: "属性指定なのでクラス化しない。",
    explanation:
      "ファーストビュー外の画像は loading=\"lazy\"。decoding=\"async\" で描画ブロック回避。",
    cssFileName: "image-perf.html",
    cssExample: `/* CSS自体は同じだが、HTML属性も重要 */
.thumb { aspect-ratio: 1/1; object-fit: cover; }`,
    htmlExample: `<img class="thumb" src="/x.jpg" loading="lazy" decoding="async" />`,
    previewDescription: "ファーストビュー外の画像が遅延ロードされ、初期表示が速くなります。",
    visualChange: "ページが軽くなる。",
    codeExplanation: ["loading=\"lazy\" と decoding=\"async\" は標準HTML。"],
    commonMistakes: ["LCP に効く画像まで lazy にしてしまい初期表示が遅くなる"],
    practice: {
      title: "Lazy",
      task: "ファーストビュー外のimgに loading=\"lazy\" を付けてください。",
      hint: "属性。",
      answer: `<img loading="lazy" />`,
    },
    quiz: {
      question: "lazy loading に向くのは？",
      choices: ["LCP対象画像", "ファーストビュー外の画像", "アイコン全部", "ロゴ"],
      answerIndex: 1,
      explanation: "FV外が対象。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(33, {
    chapter: "アニメーション",
    category: "Position",
    title: "position: sticky",
    description: "スクロール時に途中で固定される動き。",
    goals: ["sticky の親要件と top の指定を覚える"],
    webUseCase: "セクション見出しがスクロール時に上に貼り付くUI。",
    htmlConnection: "親に overflow が無いことを確認。",
    jsReactConnection: "ヘッダー、サイドバー、目次に最適。",
    tailwindConnection: "sticky top-0。",
    explanation:
      "position: sticky; top: 0; で、スクロールが指定位置に達したらそこで固定される。",
    cssFileName: "sticky.css",
    cssExample: `.section-title {
  position: sticky;
  top: 0;
  background: #0F172A;
  padding: 8px 0;
}`,
    htmlExample: `<h2 class="section-title">セクションタイトル</h2>`,
    previewDescription: "スクロールしてもセクション見出しが画面上に貼り付きます。",
    visualChange: "スクロール体験が便利に。",
    codeExplanation: ["親に overflow: hidden があると効かない。"],
    commonMistakes: ["親が overflow: hidden で動かない"],
    practice: {
      title: "Sticky",
      task: ".header を sticky / top: 0 にしてください。",
      hint: "position: sticky。",
      answer: `.header { position: sticky; top: 0; }`,
    },
    quiz: {
      question: "sticky の必須プロパティは？",
      choices: ["height", "top/right/bottom/leftのいずれか", "background", "width"],
      answerIndex: 1,
      explanation: "top などの位置指定が必須。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(34, {
    chapter: "アニメーション",
    category: "スクロール",
    title: "scroll-snap",
    description: "横スクロールカルーセルが綺麗に止まる。",
    goals: ["scroll-snap の基本構文を書ける"],
    webUseCase: "横スワイプギャラリー、画像カルーセル。",
    htmlConnection: "親に snap-type、子に snap-align。",
    jsReactConnection: "ライブラリなしで実装可能。",
    tailwindConnection: "snap-x snap-mandatory snap-center。",
    explanation:
      "scroll-snap-type: x mandatory; を親に、scroll-snap-align: center; を子に。",
    cssFileName: "snap.css",
    cssExample: `.carousel {
  display: flex; gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.carousel > * {
  scroll-snap-align: center;
  flex: 0 0 80%;
}`,
    htmlExample: `<div class="carousel">
  <div>1</div><div>2</div><div>3</div>
</div>`,
    previewDescription:
      "横にスワイプすると、各カードがビューポート中央でピタッと止まります。",
    visualChange: "心地よいスワイプ操作。",
    codeExplanation: ["mandatory は必ず止まる、proximity はゆるく止まる。"],
    commonMistakes: ["子の幅が大きすぎてスナップが効かない"],
    practice: {
      title: "Snap",
      task: ".gallery を scroll-snap-type: x mandatory に。",
      hint: "親に。",
      answer: `.gallery { scroll-snap-type: x mandatory; }`,
    },
    quiz: {
      question: "snap で必ず止まる指定は？",
      choices: ["proximity", "mandatory", "auto", "force"],
      answerIndex: 1,
      explanation: "mandatory が必ず止まる。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(35, {
    chapter: "アニメーション",
    category: "視覚",
    title: "backdrop-filter（背景ぼかし）",
    description: "ガラス風のヘッダーやモーダルの背景を作れる。",
    goals: ["backdrop-filter: blur() を使える"],
    webUseCase: "iOS 風のヘッダー、ガラスモーフィズム。",
    htmlConnection: "半透明背景と一緒に使うのが基本。",
    jsReactConnection: "Reactでも CSS で完結。",
    tailwindConnection: "backdrop-blur, backdrop-blur-md。",
    explanation:
      "background: rgba(15,23,42,0.6); backdrop-filter: blur(8px); で透けた背景にぼかしが入る。",
    cssFileName: "glass.css",
    cssExample: `.glass {
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(10px);
  border-radius: 16px;
}`,
    htmlExample: `<div class="glass">ガラス風カード</div>`,
    previewDescription: "後ろの背景がぼやけて見える、ガラスのようなUIになります。",
    visualChange: "今っぽい高級感。",
    codeExplanation: ["背景が半透明 + ぼかし がセット。"],
    commonMistakes: ["背景画像がないとぼかしの効果がわからない"],
    practice: {
      title: "ぼかしヘッダー",
      task: ".header に backdrop-filter: blur(8px) と半透明背景を当ててください。",
      hint: "blur と alpha。",
      answer: `.header { background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); }`,
    },
    quiz: {
      question: "ガラス効果に使うのは？",
      choices: ["filter", "backdrop-filter", "mask", "clip-path"],
      answerIndex: 1,
      explanation: "backdrop-filter で背景にぼかし。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(36, {
    chapter: "CSS設計",
    category: "設計",
    title: "レイヤー設計（@layer）",
    description: "@layer で詳細度の優先順位を制御できます。",
    goals: ["@layer reset, base, components, utilities の順序"],
    webUseCase: "ライブラリと自分のCSSの優先順位を制御できる。",
    htmlConnection: "HTMLは変えず、CSSの優先順位を整理する。",
    jsReactConnection: "Reactでも index.css の冒頭で @layer を宣言する。",
    tailwindConnection: "Tailwind自体が @layer の構造を採用。",
    explanation:
      "@layer reset, base, components, utilities; と宣言した順に、後ろのレイヤーが強い。",
    cssFileName: "layers.css",
    cssExample: `@layer reset, base, components, utilities;
@layer reset { * { margin: 0; padding: 0; } }
@layer components { .card { padding: 16px; } }
@layer utilities { .text-red { color: red; } }`,
    htmlExample: `<div class="card text-red">utilitiesが勝つ</div>`,
    previewDescription:
      "後ろのレイヤーで定義した utilities が、components のスタイルに勝ちます。",
    visualChange: "詳細度を一段抽象化して制御できる。",
    codeExplanation: ["レイヤー外のCSSはレイヤー内より優先度が高い。"],
    commonMistakes: ["レイヤー宣言の順序を間違えて意図と逆になる"],
    practice: {
      title: "Layer順序",
      task: "@layer reset, base, components, utilities; と宣言してください。",
      hint: "1行。",
      answer: `@layer reset, base, components, utilities;`,
    },
    quiz: {
      question: "@layer の順序で『最後に書いたレイヤー』は？",
      choices: ["最弱", "最強", "等価", "ランダム"],
      answerIndex: 1,
      explanation: "後ろに宣言したレイヤーが強い。",
    },
    estimatedMinutes: 7,
    difficulty: 5,
  }),

  L(37, {
    chapter: "CSS設計",
    category: "命名",
    title: "保守しやすい命名",
    description: "見た目ではなく『役割』で名付けます。",
    goals: ["red-text より danger-text が良い理由が言える"],
    webUseCase: "色やサイズが変わってもクラス名は変わらない命名にする。",
    htmlConnection: "HTMLとCSSが疎結合に。",
    jsReactConnection: "コンポーネントでも『機能ベース』の命名が望ましい。",
    tailwindConnection: "Tailwindでは見た目命名が前提なので、コンポーネント側で意味付けする。",
    explanation:
      "見た目で命名すると色変更で意味と乖離する。役割で命名すると変更に強い。",
    cssFileName: "naming.css",
    cssExample: `/* ❌ 見た目命名 */
.red-text { color: red; }
/* ✅ 役割命名 */
.danger-text { color: red; }`,
    htmlExample: `<p class="danger-text">エラー</p>`,
    previewDescription: "命名の違いは見た目では出ませんが、保守性で大きく差が出ます。",
    visualChange: "コードの寿命が伸びる。",
    codeExplanation: ["役割で名付けると、色を変えてもクラス名はそのまま使える。"],
    commonMistakes: ["『big-blue-button』のような命名"],
    practice: {
      title: "命名選び",
      task: "成功メッセージ用のクラス名を1つ提案してください。",
      hint: "役割。",
      answer: `.success-text { color: #34D399; }`,
    },
    quiz: {
      question: "より長持ちする命名は？",
      choices: ["red-text", "danger-text", "big-text", "small-text"],
      answerIndex: 1,
      explanation: "役割ベースが強い。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(38, {
    chapter: "CSS設計",
    category: "設計",
    title: "デザインシステムとCSS",
    description: "Figma の設計をコードに落とすときの考え方。",
    goals: ["デザインとコードを揃える方法を知る"],
    webUseCase: "Figma変数 → CSS変数 → コードの一貫性。",
    htmlConnection: "色・余白・タイポを Figma と CSS で同名に。",
    jsReactConnection: "Storybook で見比べやすくする。",
    tailwindConnection: "tailwind.config.js が橋渡し役になる。",
    explanation:
      "Figmaの『色トークン』『余白スケール』『タイポスタイル』を CSS の変数に1対1で写すと、デザインとコードが一致する。",
    cssFileName: "tokens-from-figma.css",
    cssExample: `:root {
  /* Figma: color/brand/500 */
  --color-brand-500: #38BDF8;
  /* Figma: spacing/4 */
  --space-4: 16px;
  /* Figma: type/heading/lg */
  --type-heading-lg-size: 24px;
}`,
    htmlExample: `<div style="color: var(--color-brand-500);">Figmaと同じ色</div>`,
    previewDescription:
      "Figmaの色とコードの色が完全一致し、デザインの意図がそのまま実装される状態。",
    visualChange: "デザイン乖離が消える。",
    codeExplanation: ["Figmaのトークン名と CSS変数名を揃える。"],
    commonMistakes: ["デザインに無い独自色を実装で勝手に増やす"],
    practice: {
      title: "Figma連携",
      task: "Figmaトークンとコードを揃える最大の利点は？",
      hint: "一貫性。",
      answer: "デザインと実装の差分がなくなり、修正が片方だけで済む。",
    },
    quiz: {
      question: "Figmaトークンの命名と揃えるべきは？",
      choices: ["変数のみ", "クラス名のみ", "CSS変数を含む全て", "色名だけ"],
      answerIndex: 2,
      explanation: "CSS変数を Figma と同名にすると一致しやすい。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(39, {
    chapter: "CSS設計",
    category: "Tailwind",
    title: "Tailwind 設計の勘所",
    description: "Utility-first を破綻させないコツ。",
    goals: ["共通パターンは @apply or コンポーネント化で吸収"],
    webUseCase: "Tailwind の利点を保ちつつ重複を避ける。",
    htmlConnection: "繰り返しは Reactコンポーネントに切り出す。",
    jsReactConnection: "<Button> 1つで Tailwind クラスを内包する。",
    tailwindConnection: "本人。",
    explanation:
      "クラスが10個20個並ぶならコンポーネント化のサイン。@apply でCSS化する手もあるが、コンポーネント化の方が再利用しやすい。",
    cssFileName: "tailwind-design.css",
    cssExample: `/* @apply で共通化する例（CSSファイル側） */
.btn-primary {
  @apply bg-sky-500 text-slate-900 px-4 py-2 rounded-xl;
}`,
    htmlExample: `<button class="btn-primary">統一</button>`,
    previewDescription: "Utility と コンポーネント化の合わせ技で、保守性と速度を両立。",
    visualChange: "繰り返しが消える。",
    codeExplanation: ["コンポーネント化が第一選択肢。@apply は次善。"],
    commonMistakes: ["@apply ばかり使って Tailwind の旨味を失う"],
    practice: {
      title: "Tailwind の設計",
      task: "クラスが20個並ぶ Button をどう整理しますか？",
      hint: "コンポーネント化。",
      answer: "<Button>に切り出し、内部で必要なクラスを組む。",
    },
    quiz: {
      question: "Tailwindで重複が増えてきたらまずやるのは？",
      choices: ["JSで生成", "コンポーネント化", "全部 @apply", "全部CSSに戻す"],
      answerIndex: 1,
      explanation: "コンポーネント化がベスト。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(40, {
    chapter: "CSS設計",
    category: "React",
    title: "React と CSS の責務分離",
    description: "JSはロジック、CSSは見た目。原則に戻る。",
    goals: ["インラインstyleとCSSの使い分けが言える"],
    webUseCase: "可読性・テスト容易性・パフォーマンスに関わる。",
    htmlConnection: "JSXは構造担当。",
    jsReactConnection: "状態を className 切替で表現。",
    tailwindConnection: "状態クラスで表現するのが得意。",
    explanation:
      "色・余白・配置はCSS。動的計算が必要な値（マウス座標など）はインラインstyleで。",
    cssFileName: "concern.css",
    cssExample: `/* CSS */
.btn { background: var(--bg, #38BDF8); }
/* JSX */
<button className="btn" style={{ ['--bg' as any]: dynamicColor }}>X</button>`,
    htmlExample: `<button class="btn" style="--bg: #EF4444;">動的色</button>`,
    previewDescription: "CSS変数を style で渡すことで、動的さと統一感を両立。",
    visualChange: "JSとCSSの責務が綺麗。",
    codeExplanation: ["動的値だけ style で、それ以外は class で。"],
    commonMistakes: ["何でも style で書いて Tailwind や CSS の良さを失う"],
    practice: {
      title: "責務分離",
      task: "ボタンの色が状態で4種類変わる場合、どう実装しますか？",
      hint: "クラスで切替。",
      answer:
        "状態に応じて variant=\"primary|ghost|danger|success\" を切替え、対応する class を当てる。",
    },
    quiz: {
      question: "動的な座標の指定はどこに書く？",
      choices: ["CSS", "インラインstyle", "別ファイル", "JSON"],
      answerIndex: 1,
      explanation: "JSの値が必要な箇所はインラインstyleで。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(41, {
    chapter: "CSS設計",
    category: "実務",
    title: "UIライブラリとの付き合い方",
    description: "shadcn/ui, Radix, MUI などを採用するときの考え方。",
    goals: ["Headless と Styled の違いがわかる"],
    webUseCase: "Headless（無装飾）+ Tailwind が最近の主流。",
    htmlConnection: "Headlessはアクセシビリティを担当、見た目は自分。",
    jsReactConnection: "Radix UI などはAPIだけ提供。",
    tailwindConnection: "Tailwind+Headless の組み合わせが流行り。",
    explanation:
      "Headless UI はロジックとアクセシビリティだけ提供。Styled UI（MUIなど）は見た目までセット。",
    cssFileName: "library.css",
    cssExample: `/* shadcn/ui の Button をTailwindでカスタマイズする例 */
.button { @apply px-4 py-2 rounded-xl bg-sky-500 text-slate-900; }`,
    htmlExample: `<Button className="button">使いやすい</Button>`,
    previewDescription:
      "Headless ライブラリの上に、自分のデザインを乗せられます。",
    visualChange: "テーマやブランドに合わせやすい。",
    codeExplanation: ["Headless は自由度が高く、Styledは導入が早い。"],
    commonMistakes: ["Styled UI を入れて自分のデザインに合わず無理に上書き"],
    practice: {
      title: "Headless or Styled",
      task: "ブランドに合わせた見た目で動的UIを作りたい時、どちら？",
      hint: "自由度。",
      answer: "Headless を選んで自分でスタイルを当てる。",
    },
    quiz: {
      question: "Headless UI の特徴は？",
      choices: ["見た目までセット", "ロジックだけ提供", "JS不要", "テーマ自動切替"],
      answerIndex: 1,
      explanation: "ロジック/アクセシビリティだけ提供。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(42, {
    chapter: "CSS設計",
    category: "実務",
    title: "コードレビューされるCSS",
    description: "他人が読んで理解できる順序・命名・コメント。",
    goals: ["レビューで指摘されにくいCSSが書ける"],
    webUseCase: "PRが通りやすい開発者になるためのコツ。",
    htmlConnection: "意図の伝わるクラス名を使う。",
    jsReactConnection: "Reactでもコンポーネント単位で完結。",
    tailwindConnection: "クラス並び順をESLintで自動整形。",
    explanation:
      "プロパティの順序を統一（位置→ボックス→タイポ→色→アニメ等）。マジックナンバーには変数化かコメント。",
    cssFileName: "review.css",
    cssExample: `.card {
  position: relative;
  display: flex;
  padding: 16px;
  border-radius: 16px;
  background: #18222F;
  color: #E6EDF7;
  transition: transform 200ms ease;
}`,
    htmlExample: `<div class="card">レビューに通りやすい順序</div>`,
    previewDescription: "見た目は同じでも、読み手が一瞬で理解できるCSS。",
    visualChange: "見た目同じ・コードの読みやすさ違う。",
    codeExplanation: ["順序の統一はチームのルールが第一。"],
    commonMistakes: ["プロパティ順がバラバラで読みづらい"],
    practice: {
      title: "順序",
      task: "CSSプロパティのおすすめの並び順は？",
      hint: "外→内。",
      answer: "position系 → display/box系 → typography → color → animation の順。",
    },
    quiz: {
      question: "PRで指摘されにくいCSSは？",
      choices: ["順序バラバラ", "命名揃え&順序統一&コメント", "全部1行", "省略形ばかり"],
      answerIndex: 1,
      explanation: "整理された一貫性が大切。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(43, {
    chapter: "CSS設計",
    category: "実務",
    title: "リファクタリング",
    description: "巨大化したCSSを段階的に整理する方法。",
    goals: ["不要セレクタの削除→共通化→トークン化 の順"],
    webUseCase: "古いプロジェクトに入った時の最初のステップ。",
    htmlConnection: "未使用クラスを HTML 側でも探す。",
    jsReactConnection: "コンポーネントを抽出する単位を見直す。",
    tailwindConnection: "Tailwindに移行する場合は段階的に。",
    explanation:
      "①未使用CSSを削除 ②似た記述を抽出して共通化 ③変数化／トークン化 の順で進めると安全。",
    cssFileName: "refactor.css",
    cssExample: `/* 共通化前 */
.btn-blue { padding: 8px 16px; background: #38BDF8; }
.btn-red  { padding: 8px 16px; background: #EF4444; }
/* 共通化後 */
.btn { padding: 8px 16px; }
.btn-blue { background: #38BDF8; }
.btn-red  { background: #EF4444; }`,
    htmlExample: `<button class="btn btn-blue">青</button>`,
    previewDescription: "見た目同じ、コードの量と整理度が改善されます。",
    visualChange: "コードの『未来の修正コスト』を下げる。",
    codeExplanation: ["共通化はリスクなし→価値ありの順で進める。"],
    commonMistakes: ["全部書き直そうとして頓挫する"],
    practice: {
      title: "Refactor",
      task: "リファクタの最初のステップは？",
      hint: "削除。",
      answer: "未使用CSSの削除。次に共通化、最後にトークン化。",
    },
    quiz: {
      question: "安全な順序は？",
      choices: ["全書き換え→共通化→削除", "削除→共通化→トークン化", "トークン化→削除", "順序は気にしない"],
      answerIndex: 1,
      explanation: "削除 → 共通化 → トークン化 の順が安全。",
    },
    estimatedMinutes: 7,
    difficulty: 4,
  }),

  L(44, {
    chapter: "最終制作",
    category: "実務",
    title: "大規模CSSの破綻を防ぐ",
    description: "ファイル分割・命名・ツールで守りを固める。",
    goals: ["長期メンテに耐える設計の方針"],
    webUseCase: "5年経っても触りやすいフロントエンド。",
    htmlConnection: "クラス名と意味を一致させ、検索可能に。",
    jsReactConnection: "コンポーネント単位＋CSS Modules または Tailwind。",
    tailwindConnection: "Tailwind + コンポーネント化で破綻しにくい。",
    explanation:
      "ファイル分割・トークン・Lint・Stylelint・Storybook の組合せで守る。",
    cssFileName: "scalable.css",
    cssExample: `/* 例: ファイル単位での責務 */
/* tokens.css */ :root { --space-4: 16px; }
/* base.css */ body { font-family: system-ui; }
/* components/button.css */ .btn { padding: var(--space-4); }`,
    htmlExample: `<button class="btn">スケールに強い</button>`,
    previewDescription:
      "見た目は同じ、内部はトークン・base・コンポーネントに分割された理想構造。",
    visualChange: "壊れない・読める・拡張できる。",
    codeExplanation: ["ファイル分割と Lint がチーム開発の支柱。"],
    commonMistakes: ["全部1ファイルに詰めて巨大化"],
    practice: {
      title: "守りの設計",
      task: "破綻を防ぐためのツールを2つ挙げてください。",
      hint: "Lint。",
      answer: "Stylelint と Storybook。CSSの一貫性とUI確認を支える。",
    },
    quiz: {
      question: "破綻を防ぐ役立ちツールは？",
      choices: ["Stylelint", "Tailwind", "Storybook", "全部"],
      answerIndex: 3,
      explanation: "全部組み合わせるのが現実解。",
    },
    estimatedMinutes: 7,
    difficulty: 5,
  }),

  L(45, {
    chapter: "最終制作",
    category: "総合",
    title: "最終制作：レスポンシブLP制作",
    description: "ヒーロー、特長、料金、CTA を含むLPをCSSで作る。",
    goals: ["全部入りLPを作れる"],
    webUseCase: "新規サービスの最初の顔。",
    htmlConnection: "section の連続でLPを構築。",
    jsReactConnection: "Reactで Hero, Features, Pricing, CTA に分解。",
    tailwindConnection: "Tailwindで段組みとレスポンシブを一気に作れる。",
    explanation:
      "ヒーロー → 特長3カラム → 料金カード → CTA セクションを上から積む。",
    cssFileName: "lp.css",
    cssExample: `.hero { padding: 80px 16px; text-align: center; }
.features { display: grid; grid-template-columns: 1fr; gap: 16px; padding: 64px 16px; }
@media (min-width: 768px) {
  .features { grid-template-columns: repeat(3, 1fr); }
}
.cta { padding: 80px 16px; text-align: center; background: #111827; }`,
    htmlExample: `<section class="hero"></section>
<section class="features"></section>
<section class="cta"></section>`,
    previewDescription:
      "縦に積まれたLPが完成。スマホでは1列、PCでは3列に切り替わります。",
    visualChange: "本番で使えるLP構造に。",
    codeExplanation: ["section ごとに役割を明確に。"],
    commonMistakes: ["section の境界が分からないUI"],
    practice: {
      title: "LP構造",
      task: "LPの典型的な構造を順に挙げてください。",
      hint: "Hero / Features / Pricing / CTA。",
      answer: "Hero → Features → Pricing → CTA → Footer。",
    },
    quiz: {
      question: "LPの最初に置くのは？",
      choices: ["Footer", "Pricing", "Hero", "FAQ"],
      answerIndex: 2,
      explanation: "ファーストビューが Hero。",
    },
    estimatedMinutes: 9,
    difficulty: 5,
  }),

  L(46, {
    chapter: "アクセシビリティ",
    category: "A11y",
    title: "sr-only（視覚以外向けのテキスト）",
    description: "見た目は隠すが、読み上げには残す技。",
    goals: ["sr-only ユーティリティを書ける"],
    webUseCase: "アイコンだけのボタンに、読み上げ用ラベルを足す。",
    htmlConnection: "<button><span class=\"sr-only\">閉じる</span><Icon/></button>。",
    jsReactConnection: "アイコンボタンには必ずラベルを。",
    tailwindConnection: "sr-only クラスが最初から用意されている。",
    explanation:
      "視覚的に消すが、スクリーンリーダーには読み上げられる。clip と1pxサイズで実現。",
    cssFileName: "sr-only.css",
    cssExample: `.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}`,
    htmlExample: `<button><span class="sr-only">削除</span>🗑</button>`,
    previewDescription:
      "視覚的にはアイコンだけだが、読み上げには『削除』と聞こえます。",
    visualChange: "見た目同じ・A11y強化。",
    codeExplanation: ["display:none ではなく1px領域で残すのがコツ。"],
    commonMistakes: ["display: none で読み上げまで消す"],
    practice: {
      title: "sr-only",
      task: ".sr-only クラスを書いてください（位置・サイズ・clip）。",
      hint: "1pxサイズ。",
      answer: `.sr-only { position: absolute; width: 1px; height: 1px; clip: rect(0,0,0,0); }`,
    },
    quiz: {
      question: "アイコンだけのボタンには？",
      choices: ["何も追加しない", "ツールチップだけ", "sr-only や aria-label でラベルを付ける", "クラスを増やす"],
      answerIndex: 2,
      explanation: "読み上げ用のラベルが必須。",
    },
    estimatedMinutes: 6,
    difficulty: 4,
  }),

  L(47, {
    chapter: "最終制作",
    category: "総合",
    title: "総まとめ：プロのCSSの心得",
    description: "学んだ全てを『運用に強く』『チームに優しく』に統合する。",
    goals: ["設計・命名・性能・A11y・テーマ・実装の橋渡しを意識する"],
    webUseCase: "プロのフロントエンドとして信頼される基準。",
    htmlConnection: "意味あるHTMLとセットで初めてCSSが活きる。",
    jsReactConnection: "Reactと役割を切り分けて、互いに干渉しない設計。",
    tailwindConnection: "Tailwindでも『設計の思想』は同じ。",
    explanation:
      "①トークン化 ②命名は役割で ③詳細度はフラット ④A11yは初手から ⑤transform/opacity中心 ⑥差分の少ないテーマ切替。",
    cssFileName: "manifest.css",
    cssExample: `/* CSS as a system */
:root {
  --color-bg: #0F172A;
  --color-text: #E6EDF7;
  --space-4: 16px;
  --radius-md: 12px;
}
body { background: var(--color-bg); color: var(--color-text); }
.card { padding: var(--space-4); border-radius: var(--radius-md); }`,
    htmlExample: `<div class="card">プロのCSS</div>`,
    previewDescription:
      "見た目は普通でも、土台に設計・運用の意思が宿った状態のCSS。",
    visualChange: "“続けられる”UIになる。",
    codeExplanation: ["1ヶ所変更で全体が動く＝強い土台。"],
    commonMistakes: ["『その場限り』の修正を積み重ねる"],
    practice: {
      title: "心得",
      task: "プロのCSSで一番大事だと思うことを1つ書いてください。",
      hint: "唯一の正解はない。",
      answer:
        "例：『一貫性のあるトークンと命名』。これが揃うと拡張も上書きも痛みなくできる。",
    },
    quiz: {
      question: "プロのCSSで重視されるのは？",
      choices: ["短さ", "派手さ", "一貫性と運用性", "JS連携"],
      answerIndex: 2,
      explanation: "長く運用できる一貫性が最重要。",
    },
    estimatedMinutes: 8,
    difficulty: 5,
  }),
];
