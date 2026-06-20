import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "p-button",
    title: "おしゃれなボタン",
    category: "ボタン",
    difficulty: 1,
    estimatedMinutes: 15,
    description: "色・余白・角丸・影・ホバー反応をすべて入れた『プロのボタン』を作る。",
    goal: "押しやすさと反応の両方を備えたボタンを完成させる。",
    requiredKnowledge: ["padding", "border-radius", "transition", ":hover"],
    uiDescription: "塗りボタン / 枠線ボタン / 危険ボタンの3バリエーションを作る。",
    cssProperties: ["padding", "border-radius", "background", "color", "transition", "cursor"],
    steps: [
      "ベース .btn を padding+radius+font-weight で整える",
      ".btn--primary / .btn--ghost / .btn--danger のバリアントを足す",
      ":hover で背景・文字色を切り替え、transition で滑らかに",
      ":focus-visible でアクセシビリティを担保",
      ":disabled で押せない見た目を作る",
    ],
    bonus: ["ローディング中のスピナー表示", "アイコン+ラベルの組み合わせ"],
    htmlExample: `<button class="btn btn--primary">保存</button>
<button class="btn btn--ghost">キャンセル</button>
<button class="btn btn--danger">削除</button>`,
    cssFileName: "button.css",
    cssExample: `.btn {
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 200ms ease, transform 200ms ease;
}
.btn--primary { background: #38BDF8; color: #0F172A; }
.btn--ghost   { background: transparent; color: #38BDF8; border-color: #38BDF8; }
.btn--danger  { background: #EF4444; color: #fff; }
.btn:hover { transform: translateY(-1px); }
.btn:focus-visible { outline: 2px solid #38BDF8; outline-offset: 2px; }`,
    reactConnection:
      "Reactで <Button variant=\"primary\"> として props で variant を切り替える形に拡張すると再利用性が高い。",
    tailwindConnection:
      "px-4 py-3 rounded-xl bg-sky-500 text-slate-900 hover:-translate-y-0.5 transition のように1対1で書ける。",
  },
  {
    id: "p-profile",
    title: "プロフィールカード",
    category: "カード",
    difficulty: 2,
    estimatedMinutes: 25,
    description: "アバター・名前・肩書き・SNSリンクをまとめたカードを作る。",
    goal: "中央寄せ・影・余白を整え、画像なしでも完成度の高いカードに仕上げる。",
    requiredKnowledge: ["padding", "border-radius", "box-shadow", "Flexbox"],
    uiDescription: "暗背景に丸アバター、名前と肩書き、3つのSNSアイコンを並べる。",
    cssProperties: ["padding", "border-radius", "box-shadow", "display:flex", "gap"],
    steps: [
      "外側カードを padding/radius/shadow で整える",
      "アバターは width/height + radius:50%",
      "名前/肩書きは text-align:center",
      "SNSは flex + gap で横並び",
    ],
    bonus: ["ホバーでカードがふわっと浮く", "ライト/ダーク両対応"],
    htmlExample: `<article class="profile">
  <div class="profile__avatar">K</div>
  <h2>Kota Shoji</h2>
  <p>Frontend Designer</p>
  <div class="profile__sns"><span>X</span><span>GH</span><span>Web</span></div>
</article>`,
    cssFileName: "profile.css",
    cssExample: `.profile { background:#18222F; padding:24px; border-radius:20px; text-align:center; box-shadow:0 12px 30px rgba(0,0,0,.3); max-width:320px; margin:0 auto; }
.profile__avatar { width:80px; height:80px; border-radius:50%; background:#38BDF8; color:#0F172A; display:grid; place-items:center; font-weight:700; margin:0 auto 12px; }
.profile__sns { display:flex; gap:12px; justify-content:center; margin-top:12px; }`,
    reactConnection:
      "Reactでは <ProfileCard user={...} /> として props で表示内容を切り替えるのが定番。",
    tailwindConnection:
      "max-w-xs mx-auto p-6 rounded-2xl bg-slate-800 shadow-xl text-center で表現できる。",
  },
  {
    id: "p-product",
    title: "商品カード",
    category: "カード",
    difficulty: 2,
    estimatedMinutes: 30,
    description: "ECサイトの定番、画像＋タイトル＋価格＋CTAボタンの商品カード。",
    goal: "比率を揃えたサムネイルと、目を引く価格表示の組み合わせ。",
    requiredKnowledge: ["aspect-ratio", "object-fit", "Flexbox"],
    uiDescription: "4:3 のサムネ画像、商品名、価格を強調、最後にカートボタン。",
    cssProperties: ["aspect-ratio", "object-fit", "border-radius", "font-weight", "color"],
    steps: [
      "img を aspect-ratio: 4/3 + object-fit: cover に",
      "タイトル・価格・ボタンを縦に積む",
      "価格を font-weight: 700 と色で強調",
      "ボタンを下端に揃える",
    ],
    bonus: ["セール価格の取り消し線", "在庫切れバッジ"],
    htmlExample: `<article class="product">
  <img src="/item.jpg" alt="" />
  <h3>商品名</h3>
  <p class="product__price">¥2,980</p>
  <button class="btn btn--primary">カートに追加</button>
</article>`,
    cssFileName: "product.css",
    cssExample: `.product { background:#18222F; border-radius:16px; padding:12px; display:flex; flex-direction:column; gap:8px; }
.product img { aspect-ratio:4/3; object-fit:cover; border-radius:12px; }
.product__price { font-size:18px; font-weight:700; color:#38BDF8; }`,
    reactConnection:
      "Reactで <ProductCard product={...} /> としてリストレンダリングする。",
    tailwindConnection:
      "rounded-2xl p-3 bg-slate-800 flex flex-col gap-2 で再現可。",
  },
  {
    id: "p-nav",
    title: "ナビゲーションバー",
    category: "ナビ",
    difficulty: 2,
    estimatedMinutes: 20,
    description: "ロゴ＋メニュー＋アクションのヘッダーを Flex で組む。",
    goal: "PCとスマホの両方で破綻しない構造を作る。",
    requiredKnowledge: ["Flexbox", "media query", "position:sticky"],
    uiDescription: "左にロゴ、中央にメニュー、右にCTAボタン。",
    cssProperties: ["display:flex", "justify-content", "align-items", "position:sticky"],
    steps: [
      "<header> を Flex+space-between+align-items center",
      "高さ56pxを固定し、padding 0 16px",
      "PCのみメニュー表示・スマホはハンバーガーに置換",
      "sticky top:0 で常に画面上部に",
    ],
    bonus: ["スクロールで影を出す", "ダークモード対応"],
    htmlExample: `<header class="header">
  <div>Logo</div>
  <nav>Home / Pricing</nav>
  <button class="btn btn--primary">Get</button>
</header>`,
    cssFileName: "header.css",
    cssExample: `.header { position:sticky; top:0; z-index:30; display:flex; align-items:center; justify-content:space-between; height:56px; padding:0 16px; background:#0F172A; }`,
    reactConnection:
      "<Header /> コンポーネント化。状態に応じてアクションを変える。",
    tailwindConnection:
      "sticky top-0 flex items-center justify-between h-14 px-4 bg-slate-900。",
  },
  {
    id: "p-hero",
    title: "ヒーローセクション",
    category: "LP",
    difficulty: 3,
    estimatedMinutes: 30,
    description: "サービスの第一印象を決めるヒーロー。clamp で流体タイポに。",
    goal: "縦中央＋大きな見出し＋CTAの王道ヒーローを作る。",
    requiredKnowledge: ["clamp", "Flexbox", "max-width"],
    uiDescription: "見出し→説明文→CTAボタンが縦に積まれて中央寄せ。",
    cssProperties: ["display:flex", "flex-direction:column", "align-items:center", "clamp"],
    steps: [
      "<section class=\"hero\"> を flex column + 中央寄せ",
      "h1 に clamp(28px, 6vw, 48px)",
      "説明文に max-width で行幅を制限",
      "CTA ボタンを大きめに",
    ],
    bonus: ["背景に放射グラデーション", "スクロールヒントアニメ"],
    htmlExample: `<section class="hero">
  <h1>あなたのCSSを次のレベルへ</h1>
  <p>1日5分で学ぶデザイン実装</p>
  <button class="btn btn--primary">始める</button>
</section>`,
    cssFileName: "hero.css",
    cssExample: `.hero { display:flex; flex-direction:column; align-items:center; gap:16px; padding:80px 16px; text-align:center; }
.hero h1 { font-size:clamp(28px, 6vw, 48px); }
.hero p { color:#94A3B8; max-width:480px; }`,
    reactConnection:
      "<Hero title=\"...\" cta=\"...\"/> として再利用可能に。",
    tailwindConnection:
      "py-20 px-4 flex flex-col items-center text-center gap-4。",
  },
  {
    id: "p-login",
    title: "ログインフォーム",
    category: "フォーム",
    difficulty: 3,
    estimatedMinutes: 35,
    description: "メール/パスワード/ログインボタンを揃えたフォーム。",
    goal: "OS依存のフォーム見た目を統一し、フォーカスリングまで整える。",
    requiredKnowledge: ["input スタイル", ":focus-visible", "Flexbox"],
    uiDescription: "縦に並んだ入力欄と、強調されたログインボタン。下にサブテキスト。",
    cssProperties: ["padding", "border", "border-radius", "outline", "background", "color"],
    steps: [
      "入力欄共通の .input を作る",
      ":focus-visible で水色のリング",
      ".btn--primary で送信ボタン",
      "全体を flex column + gap でまとめる",
    ],
    bonus: ["パスワード表示切替", "エラー表示の色分け"],
    htmlExample: `<form class="login">
  <input class="input" placeholder="メール" />
  <input class="input" type="password" placeholder="パスワード" />
  <button class="btn btn--primary">ログイン</button>
</form>`,
    cssFileName: "login.css",
    cssExample: `.login { display:flex; flex-direction:column; gap:12px; max-width:360px; margin:0 auto; }
.input { padding:12px 14px; border-radius:12px; border:1px solid #243049; background:#18222F; color:#E6EDF7; }
.input:focus-visible { outline:2px solid #38BDF8; outline-offset:2px; }`,
    reactConnection:
      "Reactでは controlled input + フォームバリデーションを併用。",
    tailwindConnection:
      "flex flex-col gap-3 max-w-sm mx-auto, input は p-3 rounded-xl border border-slate-700 bg-slate-800。",
  },
  {
    id: "p-pricing",
    title: "料金表カード",
    category: "LP",
    difficulty: 3,
    estimatedMinutes: 35,
    description: "Free / Pro / Team の3プランを並べる。",
    goal: "Pro プランをアクセントで強調する設計。",
    requiredKnowledge: ["Grid", "border", "transform"],
    uiDescription: "3カラム、中央プランだけが少し大きく目立つ。",
    cssProperties: ["display:grid", "grid-template-columns", "gap", "border", "transform:scale"],
    steps: [
      ".plans を grid 3列",
      "中央プランに border:2px solid と scale(1.04)",
      "見出し・価格・特徴リストを縦に積む",
      "CTA ボタンを下端に",
    ],
    bonus: ["年払い/月払いトグル", "スマホでは1列"],
    htmlExample: `<div class="plans">
  <div class="plan">Free</div>
  <div class="plan plan--featured">Pro</div>
  <div class="plan">Team</div>
</div>`,
    cssFileName: "pricing.css",
    cssExample: `.plans { display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; }
.plan { background:#18222F; padding:24px; border-radius:16px; }
.plan--featured { border:2px solid #38BDF8; transform:scale(1.04); }
@media (max-width: 720px) { .plans { grid-template-columns:1fr; } }`,
    reactConnection:
      "<Plan /> を3つ並べる。featured prop で強調。",
    tailwindConnection:
      "grid grid-cols-3 gap-4, featured: border-2 border-sky-400 scale-105。",
  },
  {
    id: "p-faq",
    title: "FAQ アコーディオン",
    category: "コンポーネント",
    difficulty: 2,
    estimatedMinutes: 20,
    description: "JSなしで開閉する details/summary FAQ。",
    goal: "セマンティックHTML+CSSだけで動くアコーディオン。",
    requiredKnowledge: ["details/summary", "属性セレクタ"],
    uiDescription: "縦に質問が並び、クリックで答えが開閉する。",
    cssProperties: ["details", "summary", "details[open]", "transition"],
    steps: [
      "<details><summary>...</summary>本文</details> を用意",
      "summary に cursor: pointer と font-weight: 700",
      "details[open] summary で色変更",
      "間隔を gap で揃える",
    ],
    bonus: ["矢印アイコンの回転", "アニメーション"],
    htmlExample: `<details><summary>料金は？</summary><p>無料です</p></details>`,
    cssFileName: "faq.css",
    cssExample: `details { background:#18222F; border-radius:12px; padding:12px 16px; }
summary { cursor:pointer; font-weight:700; }
details[open] summary { color:#38BDF8; }`,
    reactConnection:
      "Reactでも details/summary をそのまま使うのが手軽。",
    tailwindConnection:
      "details: rounded-xl p-3 bg-slate-800, summary: cursor-pointer font-bold。",
  },
  {
    id: "p-tabs",
    title: "タブUI",
    category: "コンポーネント",
    difficulty: 3,
    estimatedMinutes: 25,
    description: "横並びのタブと選択中のアンダーライン演出。",
    goal: "選択状態のCSSをマスターする。",
    requiredKnowledge: ["Flexbox", "border-bottom", "transition"],
    uiDescription: "3つのタブ、選択中だけ青いアンダーライン。",
    cssProperties: ["display:flex", "border-bottom", "color"],
    steps: [
      ".tabs を flex + gap",
      "親に border-bottom: 1px",
      "選択タブに border-bottom: 2px solid #38BDF8",
      "色とアンダーラインを transition でなめらかに",
    ],
    bonus: ["スライドするインジケータ", "ARIA対応"],
    htmlExample: `<div class="tabs">
  <button class="tab is-active">All</button>
  <button class="tab">New</button>
  <button class="tab">Done</button>
</div>`,
    cssFileName: "tabs.css",
    cssExample: `.tabs { display:flex; gap:16px; border-bottom:1px solid #243049; }
.tab { padding:10px 4px; color:#94A3B8; transition: color 150ms ease; }
.tab.is-active { color:#E6EDF7; border-bottom:2px solid #38BDF8; }`,
    reactConnection:
      "Reactでは active を useState で管理し、className を切り替える。",
    tailwindConnection:
      "flex gap-4 border-b, active: border-b-2 border-sky-400。",
  },
  {
    id: "p-modal",
    title: "モーダルUI",
    category: "コンポーネント",
    difficulty: 4,
    estimatedMinutes: 30,
    description: "オーバーレイ＋中央モーダル＋閉じるボタン。",
    goal: "fixed + grid 中央寄せ + z-index の組み合わせ。",
    requiredKnowledge: ["position:fixed", "z-index", "Grid 中央寄せ"],
    uiDescription: "暗いオーバーレイの上に、角丸のモーダルウィンドウ。",
    cssProperties: ["position:fixed", "inset", "display:grid", "place-items", "z-index"],
    steps: [
      ".backdrop を fixed inset:0 + 半透明背景",
      ".modal を中央配置(grid place-items center)",
      "z-index で前面に",
      "閉じるボタンを右上に absolute",
    ],
    bonus: ["fade in アニメ", "ESCキーで閉じる(JS)"],
    htmlExample: `<div class="backdrop">
  <div class="modal">
    <button class="close">×</button>
    本当に削除しますか？
  </div>
</div>`,
    cssFileName: "modal.css",
    cssExample: `.backdrop { position:fixed; inset:0; background:rgba(15,23,42,.7); display:grid; place-items:center; z-index:50; }
.modal { background:#18222F; padding:24px; border-radius:16px; width:90%; max-width:360px; position:relative; }
.close { position:absolute; top:8px; right:8px; }`,
    reactConnection:
      "Reactでは Portal で body 直下に出すと安全。",
    tailwindConnection:
      "fixed inset-0 z-50 bg-black/60 grid place-items-center。",
  },
  {
    id: "p-gallery",
    title: "画像ギャラリー",
    category: "ギャラリー",
    difficulty: 3,
    estimatedMinutes: 25,
    description: "auto-fit + minmax で自動列数のギャラリーを作る。",
    goal: "メディアクエリ無しでレスポンシブ。",
    requiredKnowledge: ["Grid", "auto-fit", "minmax", "aspect-ratio"],
    uiDescription: "画像が並び、画面幅に応じて1〜4列に変化。",
    cssProperties: ["display:grid", "grid-template-columns", "aspect-ratio", "object-fit"],
    steps: [
      "親に grid + auto-fit + minmax(180px, 1fr)",
      "img に aspect-ratio + object-fit:cover",
      "gap でしっかり余白",
      "ホバーで scale(1.02)",
    ],
    bonus: ["クリックで拡大表示", "lazy load"],
    htmlExample: `<div class="gallery">
  <img src="/a.jpg"/><img src="/b.jpg"/><img src="/c.jpg"/>
</div>`,
    cssFileName: "gallery.css",
    cssExample: `.gallery { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; }
.gallery img { width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:12px; transition: transform 200ms ease; }
.gallery img:hover { transform: scale(1.02); }`,
    reactConnection:
      "<Gallery items={...}/> として配列を map 展開。",
    tailwindConnection:
      "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3。",
  },
  {
    id: "p-cards",
    title: "レスポンシブカード一覧",
    category: "リスト",
    difficulty: 3,
    estimatedMinutes: 25,
    description: "ニュース/商品/プロフィール、何にでも応用できるカードリスト。",
    goal: "1→2→3列の段階で切り替わるレスポンシブグリッド。",
    requiredKnowledge: ["Grid", "media query"],
    uiDescription: "スマホ1列、タブレット2列、PC3列のカードリスト。",
    cssProperties: ["display:grid", "grid-template-columns", "gap", "@media"],
    steps: [
      "親に grid 1列",
      "@media (min-width: 600px) で 2列",
      "@media (min-width: 960px) で 3列",
      "カードに padding+radius+影",
    ],
    bonus: ["フィルター/検索追加", "ホバーでカード浮上"],
    htmlExample: `<div class="cards">
  <div class="card">A</div><div class="card">B</div><div class="card">C</div>
</div>`,
    cssFileName: "cards.css",
    cssExample: `.cards { display:grid; grid-template-columns:1fr; gap:12px; }
@media (min-width:600px) { .cards { grid-template-columns:1fr 1fr; } }
@media (min-width:960px) { .cards { grid-template-columns:repeat(3, 1fr); } }`,
    reactConnection:
      "Reactで items.map(item => <Card key=...>) でレンダリング。",
    tailwindConnection:
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3。",
  },
  {
    id: "p-settings",
    title: "スマホ向け設定画面",
    category: "アプリUI",
    difficulty: 3,
    estimatedMinutes: 30,
    description: "iOS風の設定画面、グループ化されたリストUI。",
    goal: "リストを切り、丸みのある『カード型グループ』を作る。",
    requiredKnowledge: ["border-radius", "border", "Flexbox"],
    uiDescription: "アイコン + ラベル + 値 + 矢印が並んだ縦リスト。",
    cssProperties: ["display:flex", "border-bottom", "padding", "border-radius"],
    steps: [
      ".group を radius 16px + 余白",
      ".row を flex で アイコン/ラベル/値/矢印",
      "行の間に border-bottom 1px",
      "最終行は border-bottom: none",
    ],
    bonus: ["スイッチUIを実装", "ダークモード対応"],
    htmlExample: `<section class="group">
  <div class="row"><span>テーマ</span><span>ダーク</span></div>
  <div class="row"><span>通知</span><span>ON</span></div>
</section>`,
    cssFileName: "settings.css",
    cssExample: `.group { background:#18222F; border-radius:16px; overflow:hidden; }
.row { display:flex; justify-content:space-between; padding:14px 16px; border-bottom:1px solid #243049; }
.row:last-child { border-bottom:none; }`,
    reactConnection:
      "<SettingRow label=\"...\" value=\"...\"/> でリスト化。",
    tailwindConnection:
      "rounded-2xl overflow-hidden bg-slate-800、行は flex justify-between p-3.5 border-b。",
  },
  {
    id: "p-lp-fv",
    title: "LP ファーストビュー",
    category: "LP",
    difficulty: 4,
    estimatedMinutes: 40,
    description: "ヘッダー＋ヒーロー＋スクロールヒントの完成形FV。",
    goal: "上から下まで意図のある『見せ場』を構築。",
    requiredKnowledge: ["Flexbox", "Grid", "clamp", "transition"],
    uiDescription: "上にヘッダー、中央に大きなビジュアル、下にCTAとスクロールアイコン。",
    cssProperties: ["min-height", "display:flex", "place-items", "clamp"],
    steps: [
      "<section> に min-height: 100dvh",
      "コンテンツを縦中央寄せ",
      "見出しに clamp",
      "下に小さなスクロールヒントをアニメで",
    ],
    bonus: ["背景に放射グラデーション", "ボタンに glow 影"],
    htmlExample: `<section class="fv">
  <h1>世界をデザインする</h1>
  <p>CSSで魅せる、伝える</p>
  <button class="btn btn--primary">無料で始める</button>
</section>`,
    cssFileName: "fv.css",
    cssExample: `.fv { min-height: 100dvh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; padding:0 16px; text-align:center; background: radial-gradient(circle at 30% 10%, rgba(56,189,248,.18), transparent 50%); }
.fv h1 { font-size: clamp(32px, 7vw, 56px); font-weight:800; }`,
    reactConnection:
      "<FirstView /> として Hero+CTA をまとめたコンポーネントに。",
    tailwindConnection:
      "min-h-screen flex flex-col items-center justify-center text-center gap-4 px-4。",
  },
  {
    id: "p-lp",
    title: "レスポンシブLP",
    category: "総合",
    difficulty: 5,
    estimatedMinutes: 90,
    description: "ヒーロー → 特長 → 料金 → CTA → フッター の本格LP。",
    goal: "学んだ全てを使って『公開できる』クオリティのLPに。",
    requiredKnowledge: ["Flexbox", "Grid", "media query", "デザインシステム"],
    uiDescription: "全セクションがレスポンシブ。スマホ1列、PCで2〜3列に。",
    cssProperties: ["display:grid", "media query", "clamp", "max-width"],
    steps: [
      "Section A: Hero",
      "Section B: 3カラムの特長",
      "Section C: 料金カード",
      "Section D: CTAバンド",
      "Section E: フッター",
    ],
    bonus: ["Tailwindに移植", "Vercel にデプロイ"],
    htmlExample: `<main>
  <section class="hero">...</section>
  <section class="features">...</section>
  <section class="pricing">...</section>
  <section class="cta">...</section>
  <footer class="footer">...</footer>
</main>`,
    cssFileName: "lp.css",
    cssExample: `.features { display:grid; grid-template-columns:1fr; gap:16px; padding:64px 16px; max-width:1080px; margin:0 auto; }
@media (min-width:768px) { .features { grid-template-columns:repeat(3,1fr); } }
.cta { padding:80px 16px; text-align:center; background:#111827; }`,
    reactConnection:
      "Reactで Hero/Features/Pricing/CTA/Footer の5コンポーネントに分解。",
    tailwindConnection:
      "全セクションを Tailwind の sm:/md:/lg: で書き分け。",
  },
];
