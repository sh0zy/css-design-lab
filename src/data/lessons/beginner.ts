import type { Lesson } from "../../types/lesson";

const L = (
  n: number,
  data: Omit<Lesson, "id" | "level"> & { id?: string }
): Lesson => ({
  id: data.id ?? `b-${String(n).padStart(3, "0")}`,
  level: "beginner",
  ...data,
});

export const beginnerLessons: Lesson[] = [
  L(1, {
    chapter: "CSSの入口",
    category: "入門",
    title: "CSSとは何か",
    description: "CSSはWebページの「見た目」を作るための言語です。",
    goals: [
      "CSSがHTMLの装飾を担当することを理解する",
      "CSSがあると見た目がどう変わるか想像できる",
    ],
    webUseCase:
      "ボタンの色、文字の大きさ、カードの角丸、余白、影。Webページで「きれい」と感じる部分はほぼ全部CSSが作っています。",
    htmlConnection:
      "HTMLが「ここはボタン」「ここは見出し」と意味を作り、CSSがその見た目を決めます。HTMLとCSSは必ずペアです。",
    jsReactConnection:
      "JavaScriptで状態が変わったら、CSSのクラスを切り替えて見た目を変えます。Reactでも className でCSSを当てるのが基本です。",
    tailwindConnection:
      "Tailwindは「よく使うCSSをクラス名にしたもの」。CSSがわかれば bg-blue-500 が background-color: #3B82F6 と同じだとすぐわかります。",
    explanation:
      "Webページは『HTML（構造）＋CSS（見た目）＋JS（動き）』の3つでできています。CSSがないと、どのページもメモ帳みたいに白い背景に黒文字が並ぶだけ。CSSを書くと、配色・余白・配置が整い、見やすくおしゃれになります。",
    cssFileName: "style.css",
    cssExample: `/* ボタンの見た目をCSSで作る */
.button {
  background-color: #38BDF8;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 12px;
}`,
    htmlExample: `<button class="button">押す</button>`,
    previewDescription:
      "白い四角いボタンが、青背景・白文字・角丸の見やすいボタンに変わります。",
    visualChange:
      "background-color で背景色、color で文字色、padding で余白、border-radius で角丸が決まります。",
    codeExplanation: [
      ".button はクラス名 button を持つ要素を指すセレクタです。",
      "{ ... } の中に「どんな見た目にするか」を書きます。",
      "プロパティ名: 値; の形で1行ずつ指定します。",
    ],
    commonMistakes: [
      "プロパティと値の間を : で区切らない（=ではない）",
      "行末の ; を忘れる",
      "HTMLにクラスを付け忘れている",
    ],
    practice: {
      title: "CSSでできることを言葉にする",
      task: "好きなWebサイトを思い出して、CSSが担当している見た目を3つ挙げてください。",
      hint: "色・余白・形・配置・影・文字サイズなど。",
      answer:
        "例：ヘッダーの濃い青、ボタンの角丸、カードの影。これらは全部CSSで作られています。",
    },
    quiz: {
      question: "CSSが担当するのは次のうちどれ？",
      choices: ["ページの構造", "ページの見た目", "サーバー処理", "ページの動き"],
      answerIndex: 1,
      explanation: "構造はHTML、見た目はCSS、動きはJSが担当します。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(2, {
    chapter: "CSSの入口",
    category: "入門",
    title: "HTML / CSS / JavaScript の役割",
    description: "Webサイトを作る3つの言語の役割をはっきり区別します。",
    goals: [
      "3つの役割を1文で説明できる",
      "見た目を変えたいとき、どこを触ればいいか判断できる",
    ],
    webUseCase:
      "ToDoアプリで言うと、リストはHTML、色や余白はCSS、追加・削除のロジックはJSです。役割を分けるとコードが整理されます。",
    htmlConnection:
      "HTMLは段落・見出し・ボタンなど『意味』を表します。CSSはそれに対して見た目を当てる立場です。",
    jsReactConnection:
      "Reactでは JSX（HTML風） を JS の中に書きますが、見た目は CSS（または Tailwind）で当てるのが基本です。",
    tailwindConnection:
      "Tailwind は CSS の役割をクラスで簡単に書ける道具にすぎません。役割分担は変わりません。",
    explanation:
      "HTMLが骨組み、CSSが服、JSが動作。同じHTMLでもCSSを変えれば全く違うサイトになります。逆に、CSSだけ整えても、HTMLが間違っていれば崩れます。",
    cssFileName: "style.css",
    cssExample: `/* HTMLの h1 だけ赤くする */
h1 {
  color: #EF4444;
  font-size: 28px;
}`,
    htmlExample: `<h1>こんにちは</h1>
<p>本文です</p>`,
    previewDescription:
      "本文は黒のまま、見出しだけ赤くなります。HTMLの種類で見た目が変えられます。",
    visualChange:
      "h1セレクタで「h1だけ」をターゲットにできます。pは影響を受けません。",
    codeExplanation: [
      "h1 はタグセレクタです。同じ名前のタグ全部が対象になります。",
      "color が文字色、font-size が文字サイズです。",
    ],
    commonMistakes: [
      "h1 にスタイルを当てたつもりが、HTMLで h2 になっていた",
      "JSをCSSファイルに書こうとしてしまう",
    ],
    practice: {
      title: "役割分担を考える",
      task: "「ボタンを押すとカードが赤く光る」機能はどの言語が担当しますか？",
      hint: "ボタンのタグ・赤くする見た目・押した瞬間の動き、それぞれを分けて考えましょう。",
      answer:
        "ボタンタグはHTML、赤の見た目はCSS、押した瞬間にクラスを切り替える処理はJSが担当します。",
    },
    quiz: {
      question: "見た目を変えたいときに直すのは？",
      choices: ["HTML", "CSS", "JS", "URL"],
      answerIndex: 1,
      explanation: "見た目はCSSの担当領域です。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(3, {
    chapter: "CSSの入口",
    category: "入門",
    title: "CSSを書く場所",
    description:
      "インラインスタイル / styleタグ / 外部ファイル の3パターンを理解します。",
    goals: [
      "3つの書き方を見分けられる",
      "おすすめの書き方が外部ファイルだと言える",
    ],
    webUseCase:
      "実務ではほぼ100%、外部CSSファイルに書きます。インラインは緊急用、styleタグはお試し用です。",
    htmlConnection:
      "<link rel=\"stylesheet\" href=\"style.css\"> でHTMLとCSSを結びつけます。",
    jsReactConnection:
      "Reactでは外部CSS、CSS Modules、styled-components、Tailwind など複数の書き方があります。基本は外部CSSと同じ感覚です。",
    tailwindConnection:
      "Tailwindも結局はクラス名でCSSを当てているだけ。インライン的に見えますが、生成されるCSSは外部ファイルです。",
    explanation:
      "CSSを書く場所は3つあります。①HTMLタグの style 属性に書く、②<style> タグの中に書く、③.css ファイルに書いて読み込む。チームで開発するなら③一択です。",
    cssFileName: "style.css",
    cssExample: `/* 外部ファイルに書くスタイル（おすすめ） */
.box {
  background-color: #38BDF8;
  padding: 16px;
}`,
    htmlExample: `<link rel="stylesheet" href="style.css" />
<div class="box">外部CSSが効いた箱</div>`,
    previewDescription:
      "CSSファイルが読み込まれ、divに青い背景と余白がつきます。",
    visualChange:
      "外部ファイルなら、複数のページで同じスタイルを使い回せます。",
    codeExplanation: [
      "link タグでHTMLにCSSファイルを紐付けます。",
      "href にCSSファイルのパスを書きます。",
    ],
    commonMistakes: [
      "ファイル名が違う（style.css と styles.css の打ち間違い）",
      "<link> を <head> の中に入れ忘れる",
    ],
    practice: {
      title: "どの書き方がおすすめか",
      task: "100ページあるサイトでボタンの色を一括で変えたい時、どの書き方が一番ラクですか？",
      hint: "1ヶ所変えれば全部に反映される書き方は？",
      answer: "外部CSSファイル。1ファイル直すだけで全ページに反映されます。",
    },
    quiz: {
      question: "実務で一番よく使うCSSの書き方は？",
      choices: ["インライン style 属性", "<style>タグ", "外部CSSファイル", "JSの中に書く"],
      answerIndex: 2,
      explanation: "外部ファイルが基本です。再利用と保守が圧倒的にラク。",
    },
    estimatedMinutes: 6,
    difficulty: 1,
  }),

  L(4, {
    chapter: "CSSの入口",
    category: "入門",
    title: "外部CSSファイルを読み込む",
    description: "linkタグの書き方と、相対パスの考え方を整理します。",
    goals: [
      "linkタグを正しく書ける",
      "パスのミスを修正できる",
    ],
    webUseCase:
      "新しいサイトを作るとき、まずやるのが「HTMLからCSSファイルを読み込む」ことです。ここを間違えると永久にスタイルが当たりません。",
    htmlConnection:
      "head 要素の中に link を書くのがお約束。bodyの中に書いても動きますが、推奨されません。",
    jsReactConnection:
      "React + Vite では import './style.css' のように、JSがCSSを読み込みます。仕組みは同じです。",
    tailwindConnection:
      "Tailwindも index.css などのエントリCSSを 1つ読み込めばOKです。",
    explanation:
      "<link rel=\"stylesheet\" href=\"./style.css\" /> と書きます。href の値はCSSファイルへの道のり。同じフォルダなら ./style.css、フォルダの中なら ./css/style.css のように書きます。",
    cssFileName: "style.css",
    cssExample: `body {
  background-color: #0F172A;
  color: #E6EDF7;
  font-family: sans-serif;
}`,
    htmlExample: `<head>
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <h1>読み込めた！</h1>
</body>`,
    previewDescription: "ページ全体が暗い背景＋明るい文字に切り替わります。",
    visualChange: "body を直接スタイリングすると、ページ全体に効きます。",
    codeExplanation: [
      "rel=\"stylesheet\" は『これはスタイルシートですよ』の宣言。",
      "href にCSSファイルのパスを書きます。",
    ],
    commonMistakes: [
      "<link> の閉じ忘れ（<link ... /> または <link ...>）",
      "パスがズレている（./ や ../ を間違える）",
    ],
    practice: {
      title: "正しいlinkタグを書く",
      task: "HTMLと同じフォルダにある main.css を読み込むlinkタグを書いてください。",
      hint: "rel と href の2つの属性が必要。",
      answer: `<link rel="stylesheet" href="./main.css" />`,
    },
    quiz: {
      question: "linkタグはどこに書くのが基本？",
      choices: ["body の最後", "head の中", "html の外", "footer の中"],
      answerIndex: 1,
      explanation: "head の中に書くのがお作法です。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(5, {
    chapter: "CSSの入口",
    category: "セレクタ",
    title: "セレクタとは",
    description: "CSSの先頭に書く『どこに当てるか』の部分がセレクタです。",
    goals: [
      "セレクタが対象を選ぶための仕組みだと理解する",
      "タグ・クラス・idの3種類が言える",
    ],
    webUseCase:
      "ボタンだけ青くしたい、見出しだけ大きくしたい、こうした「ピンポイントで当てる」のが全部セレクタの仕事です。",
    htmlConnection:
      "HTML側で class や id を付けておくと、CSSから狙い撃ちできるようになります。",
    jsReactConnection:
      "ReactのclassNameはHTMLのclass属性とほぼ同じ意味。CSSセレクタの考え方はそのまま使えます。",
    tailwindConnection:
      "Tailwindも結局はclassでスタイルを当てているだけ。セレクタ＝クラスの感覚は共通です。",
    explanation:
      "セレクタは「これに当てる」という指示。タグ名ならh1、クラスなら.title、idなら#header。同じ仕組みで対象を絞ります。",
    cssFileName: "style.css",
    cssExample: `h1 { color: #38BDF8; }       /* タグ */
.title { color: #A78BFA; }   /* クラス */
#main { color: #F472B6; }    /* id */`,
    htmlExample: `<h1>タグセレクタ</h1>
<p class="title">クラスセレクタ</p>
<p id="main">idセレクタ</p>`,
    previewDescription: "h1は青、.titleは紫、#mainはピンクになります。",
    visualChange: "セレクタごとに、当たる対象が変わります。",
    codeExplanation: [
      "タグセレクタは「そのタグ全部」が対象。",
      ".〜 はクラスセレクタ。同じクラスを持つもの全部が対象。",
      "#〜 はidセレクタ。idは1ページに1つだけ。",
    ],
    commonMistakes: [
      ".class と #id を取り違える",
      "クラス名のドットを忘れる（title でなく .title）",
    ],
    practice: {
      title: "クラスを当ててみる",
      task: "<p class=\"hello\">やあ</p> の文字色を緑にするCSSを書いてください。",
      hint: "クラスセレクタは . で始める。",
      answer: `.hello { color: #34D399; }`,
    },
    quiz: {
      question: "クラスセレクタの書き方は？",
      choices: ["#class", ".class", "class", "*class"],
      answerIndex: 1,
      explanation: "クラスは . から書きます。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(6, {
    chapter: "CSSの入口",
    category: "セレクタ",
    title: "プロパティと値",
    description: "CSSの本体は『プロパティ: 値;』のセットです。",
    goals: [
      "プロパティ名と値の役割を分けて理解する",
      "セミコロンの位置を間違えない",
    ],
    webUseCase: "全てのCSSはこの形でできています。一度覚えれば、あとはプロパティを覚えるだけ。",
    htmlConnection: "HTMLのclass/idを目印に、プロパティ:値で具体的な見た目を決めます。",
    jsReactConnection:
      "React の style={{ color: 'red' }} もプロパティと値の組です。書き方が違うだけ。",
    tailwindConnection:
      "Tailwind の text-red-500 は color: #EF4444 のショートカット。プロパティ名と値の概念は同じ。",
    explanation:
      "「セレクタ { プロパティ: 値; }」が基本形。プロパティは「何を変えるか」（color, font-size など）、値は「どう変えるか」（#EF4444, 16px など）。",
    cssFileName: "style.css",
    cssExample: `.title {
  color: #38BDF8;
  font-size: 24px;
  font-weight: 700;
}`,
    htmlExample: `<h2 class="title">スタイル付き見出し</h2>`,
    previewDescription: "見出しが水色で大きく、太字になります。",
    visualChange:
      "color, font-size, font-weight それぞれが見た目の別の側面を変えます。",
    codeExplanation: [
      "プロパティ名は英語の単語で、ハイフンで区切ります。",
      "値の単位（px, %, rem など）を忘れずに。",
      "1行ずつ ; で区切ります。",
    ],
    commonMistakes: [
      ": の代わりに = を書く",
      "; を忘れる",
      "値の単位を抜く（16 ではなく 16px）",
    ],
    practice: {
      title: "3行のCSSを書く",
      task: ".name の文字色を白、サイズ20px、太字にしてください。",
      hint: "color, font-size, font-weight。",
      answer: `.name { color: #ffffff; font-size: 20px; font-weight: 700; }`,
    },
    quiz: {
      question: "次のうち書式が正しいのはどれ？",
      choices: [
        "color = red;",
        "color: red;",
        "color : red",
        "color red;",
      ],
      answerIndex: 1,
      explanation: "プロパティと値は : で区切り、最後に ; を付けます。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(7, {
    chapter: "文字と色",
    category: "文字",
    title: "color（文字色）",
    description: "文字の色を決めるプロパティです。",
    goals: ["color プロパティを使える", "色をHEXで指定できる"],
    webUseCase:
      "見出し・本文・リンク・エラーメッセージ。文字色は読みやすさと印象を左右する一番基本のプロパティです。",
    htmlConnection: "h1, p, a, span などすべての文字を含む要素に効きます。",
    jsReactConnection:
      "React で <p style={{ color: '#38BDF8' }}> も同じこと。状態に応じて色を変えるとUXが良くなります。",
    tailwindConnection:
      "Tailwind の text-sky-400 は color: #38BDF8 と同じ。色名のスケールが用意されているだけ。",
    explanation:
      "color: 値; で文字色を指定します。HEX（#38BDF8）、色名（red）、rgb()、rgba()、hsl() などで書けます。",
    cssFileName: "style.css",
    cssExample: `.brand {
  color: #38BDF8;
}
.warn {
  color: rgb(251, 191, 36);
}
.muted {
  color: hsl(220, 10%, 60%);
}`,
    htmlExample: `<p class="brand">ブランドカラー</p>
<p class="warn">警告メッセージ</p>
<p class="muted">薄いテキスト</p>`,
    previewDescription: "文字がそれぞれ水色、黄色、グレーで表示されます。",
    visualChange: "color の値だけで文字の見え方の印象がガラッと変わります。",
    codeExplanation: [
      "HEX（#38BDF8）は16進カラーで、Web標準。",
      "rgb() は赤・緑・青の量で色を指定。",
      "hsl() は色相・彩度・明度。デザインで使いやすい。",
    ],
    commonMistakes: [
      "color と background-color を間違える",
      "# を忘れる（38BDF8 だけでは効かない）",
    ],
    practice: {
      title: "文字を青くする",
      task: ".info の文字色を #3B82F6 にしてください。",
      hint: "color プロパティ。",
      answer: `.info { color: #3B82F6; }`,
    },
    quiz: {
      question: "文字色を指定するプロパティは？",
      choices: ["text-color", "color", "font-color", "fontcolor"],
      answerIndex: 1,
      explanation: "color が文字色のプロパティです。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(8, {
    chapter: "文字と色",
    category: "色",
    title: "background-color（背景色）",
    description: "要素の背景色を決めるプロパティです。",
    goals: ["背景色を指定できる", "color と background-color の違いがわかる"],
    webUseCase:
      "ボタン、カード、ヘッダー、タグ、バッジ。区切りや強調を作るときによく使います。",
    htmlConnection:
      "div, section, button など、ほぼ全てのブロック要素・インライン要素に効きます。",
    jsReactConnection:
      "React で『選択中タブ』を表すために、選択時だけ backgroundColor を変えるのは定番。",
    tailwindConnection: "bg-sky-500 は background-color: #0EA5E9。bg- は background のショートカット。",
    explanation:
      "background-color: 値; と書きます。color は『中の文字の色』、background-color は『その要素の塗りの色』。混同しないこと。",
    cssFileName: "style.css",
    cssExample: `.tag {
  background-color: #38BDF8;
  color: #0F172A;
  padding: 4px 10px;
  border-radius: 999px;
}`,
    htmlExample: `<span class="tag">NEW</span>`,
    previewDescription:
      "「NEW」という文字が、青い丸い枠の中に黒文字で表示されます。",
    visualChange:
      "background-color が塗り、color が文字、border-radius が形を作っています。",
    codeExplanation: [
      "background-color で塗りの色を決める。",
      "color と組み合わせて、コントラストを考える。",
    ],
    commonMistakes: [
      "color と background-color を混同する",
      "背景色だけ濃くして、文字が読めなくなる",
    ],
    practice: {
      title: "黄色いバッジ",
      task: ".badge の背景を黄色（#FACC15）、文字を黒（#0F172A）にしてください。",
      hint: "background-color と color の2つを書く。",
      answer: `.badge { background-color: #FACC15; color: #0F172A; }`,
    },
    quiz: {
      question: "背景色を指定するプロパティは？",
      choices: ["color", "bg-color", "background-color", "fill"],
      answerIndex: 2,
      explanation: "背景色は background-color です。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(9, {
    chapter: "文字と色",
    category: "文字",
    title: "font-size（文字サイズ）",
    description: "文字の大きさを変えるプロパティです。",
    goals: ["px, rem, em の違いに触れる", "見出しと本文のサイズ感を理解する"],
    webUseCase: "見出しは大きく、本文は読みやすいサイズに。階層をつけるのに必須です。",
    htmlConnection: "h1〜h6 は最初から大きさが違いますが、CSSで上書きできます。",
    jsReactConnection: "React では prop で size を渡して、文字サイズを動的に変えるのが定番。",
    tailwindConnection: "text-xl, text-2xl などは font-size のスケール。",
    explanation:
      "font-size: 16px; のように指定します。スマホ向けでは本文14〜16px、見出しは20〜32pxくらいが定番。pxは絶対サイズ、remはルート（html）のサイズに対する倍率です。",
    cssFileName: "style.css",
    cssExample: `.title { font-size: 24px; }
.body  { font-size: 16px; }
.note  { font-size: 12px; }`,
    htmlExample: `<h2 class="title">タイトル</h2>
<p class="body">本文の文章です</p>
<p class="note">※注釈</p>`,
    previewDescription: "タイトル → 本文 → 注釈 の順に文字が小さくなります。",
    visualChange: "サイズの差が情報の優先度を伝える。",
    codeExplanation: [
      "px は固定サイズ。",
      "rem は html の font-size を 1rem として使う。",
      "見出しと本文で2〜3段階の差をつけると読みやすい。",
    ],
    commonMistakes: ["全部同じサイズにして、強弱がない", "px の単位を忘れる"],
    practice: {
      title: "見出しを24pxに",
      task: ".heading の文字サイズを24pxにしてください。",
      hint: "font-size プロパティ。",
      answer: `.heading { font-size: 24px; }`,
    },
    quiz: {
      question: "文字サイズを変えるプロパティは？",
      choices: ["text-size", "font-size", "size", "letter-size"],
      answerIndex: 1,
      explanation: "font-size が正解。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(10, {
    chapter: "文字と色",
    category: "文字",
    title: "font-weight（太さ）",
    description: "文字の太さを数字や normal/bold で指定します。",
    goals: ["100〜900の数字スケールがあることを知る", "見出しを bold にできる"],
    webUseCase: "重要な単語だけ太く。見出しは太く、本文は細く。読みやすさが上がります。",
    htmlConnection: "<strong> はもともと bold ですが、CSSで太さを上書きできます。",
    jsReactConnection: "React で「選択中だけ太字」のような演出に。",
    tailwindConnection: "font-bold は font-weight: 700。font-semibold は 600。",
    explanation:
      "font-weight には normal(400), bold(700) があり、数字なら100〜900で指定できます。日本語フォントは100/300/400/500/700/900を持つことが多いです。",
    cssFileName: "style.css",
    cssExample: `.title  { font-weight: 700; }
.body   { font-weight: 400; }
.strong { font-weight: 900; }`,
    htmlExample: `<p class="title">タイトル</p>
<p class="body">本文</p>
<p class="strong">超強調</p>`,
    previewDescription: "タイトルが太字、本文が普通、強調がさらに太く表示されます。",
    visualChange: "数字が大きいほど太く、視線を引きつけます。",
    codeExplanation: ["400 がデフォルト相当。", "700 が bold。", "細い 300 や 100 は雰囲気作りに。"],
    commonMistakes: ["全部 bold にして強弱が消える", "対応していないウェイトを指定して効かない"],
    practice: {
      title: "見出しを太字に",
      task: ".name を太字（700）にしてください。",
      hint: "font-weight。",
      answer: `.name { font-weight: 700; }`,
    },
    quiz: {
      question: "bold と同じ意味の数字は？",
      choices: ["300", "400", "700", "900"],
      answerIndex: 2,
      explanation: "bold は 700 です。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(11, {
    chapter: "文字と色",
    category: "文字",
    title: "font-family（書体）",
    description: "使うフォントを指定します。複数を並べてフォールバックさせるのが基本。",
    goals: ["font-family の書き方を覚える", "sans-serif と serif の違いがわかる"],
    webUseCase:
      "サイトの印象は書体で大きく決まります。スマホでは『システムフォント』がおすすめ。",
    htmlConnection: "body に指定すれば、ページ全体のフォントが切り替わります。",
    jsReactConnection: "Reactアプリでも index.css に1行書けば全体に効きます。",
    tailwindConnection: "font-sans, font-serif, font-mono がプリセット。",
    explanation:
      "font-family: 'Hiragino Sans', 'Noto Sans JP', sans-serif; のように複数指定。先頭から見て、使えるフォントが採用されます。",
    cssFileName: "style.css",
    cssExample: `body {
  font-family: -apple-system, "Segoe UI", "Hiragino Sans", "Noto Sans JP", sans-serif;
}`,
    htmlExample: `<body><p>iPhoneでもAndroidでもPCでも見やすい</p></body>`,
    previewDescription: "OSに合わせた最適なフォントが選ばれて表示されます。",
    visualChange:
      "iPhoneではSan Francisco、WindowsはSegoe UI、AndroidはRobotoなどが自動選択される。",
    codeExplanation: [
      "スペース入りのフォント名はクオートで囲む。",
      "末尾に sans-serif や serif の総称を書いて保険にする。",
    ],
    commonMistakes: ["1個だけ指定してしまい、環境で表示が崩れる", "クオートを忘れる"],
    practice: {
      title: "システムフォントを使う",
      task: "body に system-ui, sans-serif を指定してください。",
      hint: "font-family。",
      answer: `body { font-family: system-ui, sans-serif; }`,
    },
    quiz: {
      question: "明朝体（serif）の総称は？",
      choices: ["sans-serif", "serif", "mono", "ui"],
      answerIndex: 1,
      explanation: "serif が明朝体系の総称です。",
    },
    estimatedMinutes: 6,
    difficulty: 2,
  }),

  L(12, {
    chapter: "文字と色",
    category: "文字",
    title: "text-align（文字寄せ）",
    description: "文字を左寄せ・中央・右寄せにします。",
    goals: ["text-align: center; の基本形を覚える", "見出しの中央寄せができる"],
    webUseCase:
      "見出し中央寄せ、注釈の右寄せ。スマホUIではボタン上の文字を中央寄せにすることが多い。",
    htmlConnection: "ブロック要素（div, p, h2 など）の中の文字に効きます。",
    jsReactConnection: "React でも className で center を当てるのが定番。",
    tailwindConnection: "text-center, text-left, text-right。",
    explanation:
      "text-align: center; で要素の中の文字を中央寄せに。要素自体を中央寄せするのとは別の話なので注意。",
    cssFileName: "style.css",
    cssExample: `.heading {
  text-align: center;
  font-size: 22px;
}`,
    htmlExample: `<h2 class="heading">中央寄せの見出し</h2>`,
    previewDescription: "見出しの文字が画面の中央に揃います。",
    visualChange: "文字が左から中央へ移動。",
    codeExplanation: ["text-align: center / left / right が3つの基本。", "ブロック要素の中の文字に効く。"],
    commonMistakes: ["親が幅を持っていなくて中央に見えない"],
    practice: {
      title: "中央寄せ",
      task: ".center の文字を中央寄せにしてください。",
      hint: "text-align。",
      answer: `.center { text-align: center; }`,
    },
    quiz: {
      question: "中央寄せの値は？",
      choices: ["middle", "center", "centre", "auto"],
      answerIndex: 1,
      explanation: "center が正解。middleではない。",
    },
    estimatedMinutes: 4,
    difficulty: 1,
  }),

  L(13, {
    chapter: "文字と色",
    category: "文字",
    title: "line-height（行の高さ）",
    description: "行間を調整して読みやすさを上げます。",
    goals: ["1.5〜1.8 が日本語の読みやすい目安", "数字だけで指定できる"],
    webUseCase: "本文の読みやすさは line-height で大きく変わります。",
    htmlConnection: "段落 p, 説明文 div など全テキストに使う。",
    jsReactConnection: "デザインシステムに line-height を1〜2種類用意して使い分ける。",
    tailwindConnection: "leading-relaxed, leading-tight などがプリセット。",
    explanation:
      "line-height: 1.6; のように倍率で指定するのが基本。文字サイズの何倍を行高にするかを表します。",
    cssFileName: "style.css",
    cssExample: `.para {
  font-size: 16px;
  line-height: 1.7;
}`,
    htmlExample: `<p class="para">CSSで行間を調整するだけで、文章は驚くほど読みやすくなります。</p>`,
    previewDescription:
      "段落の行間が広がり、ぎゅっと詰まった印象から余白のある読みやすい印象に変わります。",
    visualChange: "数字を大きくすると行間が広がる。",
    codeExplanation: ["倍率指定（1.6など）が一番扱いやすい。", "px指定もできるが、文字サイズが変わると壊れやすい。"],
    commonMistakes: ["1.0 にしてしまい読みにくい", "見出しまで広げすぎる"],
    practice: {
      title: "行間を1.7に",
      task: ".body の行間を1.7にしてください。",
      hint: "line-height。",
      answer: `.body { line-height: 1.7; }`,
    },
    quiz: {
      question: "日本語の本文として読みやすい line-height は？",
      choices: ["0.8", "1.0", "1.6〜1.8", "3.0"],
      answerIndex: 2,
      explanation: "1.6〜1.8あたりが読みやすいです。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(14, {
    chapter: "余白とサイズ",
    category: "サイズ",
    title: "width（幅）",
    description: "要素の横幅を指定します。",
    goals: ["px と % の違いを理解する", "max-width で上限を作れる"],
    webUseCase: "カードの幅、画像の幅、ボタンの幅。どれもwidthで決めます。",
    htmlConnection: "div など block 要素は親いっぱいに広がるのがデフォルト。widthで絞ります。",
    jsReactConnection: "コンポーネントの幅を prop で渡せるようにすると再利用しやすい。",
    tailwindConnection: "w-full, w-1/2, w-64。max-w-md などもよく使う。",
    explanation:
      "width: 200px; や width: 100%; で指定。% は親要素に対する割合。max-width: 600px; を併用するとPCで広がりすぎないUIに。",
    cssFileName: "style.css",
    cssExample: `.card {
  width: 100%;
  max-width: 360px;
}`,
    htmlExample: `<div class="card">スマホでは幅いっぱい、PCでも360pxまで</div>`,
    previewDescription: "スマホでは画面いっぱいに、PCでは360pxまでで止まり中央寄せに見えます。",
    visualChange:
      "max-width を入れることで、画面が大きくなっても文字が読みやすい幅に保てる。",
    codeExplanation: ["width: 100% は親いっぱい。", "max-width で上限を決めると安全。"],
    commonMistakes: ["px で固定にしてしまい、スマホで横スクロールになる", "width だけで max-width を忘れる"],
    practice: {
      title: "上限480px",
      task: ".container を最大480pxにしてください。",
      hint: "max-width。",
      answer: `.container { max-width: 480px; }`,
    },
    quiz: {
      question: "親要素の50%幅にする書き方は？",
      choices: ["width: 50;", "width: 50%;", "width: half;", "width: 0.5rem;"],
      answerIndex: 1,
      explanation: "% は親要素に対する割合です。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(15, {
    chapter: "余白とサイズ",
    category: "サイズ",
    title: "height（高さ）",
    description: "要素の高さを指定します。",
    goals: ["高さを固定する場面を理解する", "min-height のメリットを知る"],
    webUseCase:
      "ヘッダーの高さ56px、ボタン48pxなど、UI部品では height を固定することが多いです。",
    htmlConnection: "中身の量に関係なく一定の高さを保ちたいときに使う。",
    jsReactConnection: "min-height: 100dvh; でアプリ全体の高さを画面いっぱいにするのが定番。",
    tailwindConnection: "h-12, h-screen, min-h-screen など。",
    explanation:
      "height: 48px; は固定。min-height: 48px; なら最低でも48px、中身が増えれば伸びる。",
    cssFileName: "style.css",
    cssExample: `.button {
  height: 48px;
  padding: 0 16px;
}`,
    htmlExample: `<button class="button">押す</button>`,
    previewDescription: "ボタンの縦サイズが揃って、押しやすい指サイズになります。",
    visualChange: "height を48pxに固定すると、テキストが少なくてもボタンが小さくならない。",
    codeExplanation: ["height は固定値。", "中身が増えるかもしれないなら min-height を使う。"],
    commonMistakes: ["height 固定で中身があふれる", "中身に合わせたいのに height を固定する"],
    practice: {
      title: "ボタン高さ48px",
      task: ".btn の高さを48pxにしてください。",
      hint: "height。",
      answer: `.btn { height: 48px; }`,
    },
    quiz: {
      question: "中身が増えたら高さも増やしたい時に使うのは？",
      choices: ["height", "min-height", "max-height", "h-fix"],
      answerIndex: 1,
      explanation: "min-height は最低値。中身が増えれば伸びます。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(16, {
    chapter: "余白とサイズ",
    category: "余白",
    title: "margin（外側の余白）",
    description: "要素の外側、他の要素との隙間を作ります。",
    goals: ["上下左右の指定方法を覚える", "margin: auto で中央寄せできる"],
    webUseCase: "見出しと本文の間、カードとカードの間。とにかくよく使います。",
    htmlConnection: "block 要素同士の間隔を作るのが主用途。",
    jsReactConnection: "間隔は基本 margin より gap を使うのが今のおすすめ（Flexbox/Grid）。",
    tailwindConnection: "m-4, mt-2, mx-auto。",
    explanation:
      "margin: 16px; は四方。margin: 8px 16px; は上下8/左右16。margin: 0 auto; は左右autoでブロック要素を中央寄せ。",
    cssFileName: "style.css",
    cssExample: `.card {
  width: 320px;
  margin: 24px auto;
}`,
    htmlExample: `<div class="card">中央寄せのカード</div>`,
    previewDescription: "カードが画面の中央にきて、上下に24pxの余白ができます。",
    visualChange: "左右 auto は『余りスペースを左右に均等に分ける』という意味。",
    codeExplanation: [
      "margin: 値1 値2 値3 値4; で 上 右 下 左 の順。",
      "margin: 値1 値2; は 上下 左右。",
      "margin: 値1; は四方すべて。",
    ],
    commonMistakes: ["上下と左右を取り違える", "中央寄せしたいのに width が無くてauto が効かない"],
    practice: {
      title: "中央寄せ",
      task: ".box の width を300、左右の余白を auto にしてください。",
      hint: "margin: 0 auto;",
      answer: `.box { width: 300px; margin: 0 auto; }`,
    },
    quiz: {
      question: "ブロック要素を中央寄せにできる書き方は？",
      choices: [
        "text-align: center;",
        "margin: 0 auto;",
        "padding: auto;",
        "center: true;",
      ],
      answerIndex: 1,
      explanation: "width と組み合わせて margin: 0 auto。",
    },
    estimatedMinutes: 6,
    difficulty: 2,
  }),

  L(17, {
    chapter: "余白とサイズ",
    category: "余白",
    title: "padding（内側の余白）",
    description: "要素の中身と枠の間の余白です。",
    goals: ["padding と margin の違いがわかる", "ボタンの内側余白を作れる"],
    webUseCase: "ボタンの中の余白、カード内の余白。読みやすさと押しやすさに直結します。",
    htmlConnection: "ボタン、カード、入力欄、ヘッダーなどUI部品ほぼ全てで使う。",
    jsReactConnection: "padding を変えるだけで、UIの『ゆったり感』が大きく変わる。",
    tailwindConnection: "p-4, py-2, px-3。サイズ違いがすぐ書ける。",
    explanation:
      "padding: 12px 20px; は上下12・左右20の内側余白。ボタンならこれくらいが押しやすいバランス。",
    cssFileName: "style.css",
    cssExample: `.button {
  padding: 12px 20px;
  background: #38BDF8;
  color: #ffffff;
  border-radius: 12px;
}`,
    htmlExample: `<button class="button">送信する</button>`,
    previewDescription: "文字の周りに余白ができて、押しやすい大きさのボタンになります。",
    visualChange: "padding がないとボタンは文字ぴったりサイズで小さい。",
    codeExplanation: ["padding は中身の周りに余白を作る。", "margin と違って『要素の中』に余白が生まれる。"],
    commonMistakes: ["margin と padding を取り違える", "padding を入れずにボタンが小さすぎる"],
    practice: {
      title: "ボタンの余白",
      task: ".btn に上下14px・左右24pxのpaddingを入れてください。",
      hint: "padding: 14px 24px。",
      answer: `.btn { padding: 14px 24px; }`,
    },
    quiz: {
      question: "padding は？",
      choices: ["要素の外側の余白", "要素の内側の余白", "影の太さ", "文字の太さ"],
      answerIndex: 1,
      explanation: "padding は内側、margin は外側。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(18, {
    chapter: "ボックスモデル",
    category: "枠",
    title: "border（枠線）",
    description: "要素の周りに線を引きます。",
    goals: ["border の3つの値（太さ・種類・色）を書ける", "borderの色を変えられる"],
    webUseCase: "入力欄の枠、カードの薄い境界線、フォーカス時の強調。",
    htmlConnection: "input, button, div などほぼ全てに使える。",
    jsReactConnection: "状態によって border の色を切り替えると視覚的に分かりやすい。",
    tailwindConnection: "border, border-2, border-sky-400。",
    explanation:
      "border: 1px solid #243049; は『太さ・種類・色』をまとめて書くショートハンド。種類は solid / dashed / dotted などがある。",
    cssFileName: "style.css",
    cssExample: `.input {
  border: 1px solid #243049;
  padding: 10px 12px;
  border-radius: 8px;
}`,
    htmlExample: `<input class="input" placeholder="名前" />`,
    previewDescription: "薄いグレーの枠線が入った、シンプルな入力欄になります。",
    visualChange: "境界線があると要素の範囲が認識しやすくなる。",
    codeExplanation: [
      "1px が太さ、solid が線の種類、色がHEX。",
      "border-color, border-width, border-style に分けて書くこともできる。",
    ],
    commonMistakes: ["種類を書き忘れる（solid を抜くと表示されない）"],
    practice: {
      title: "1pxの青枠",
      task: ".card に1pxの実線、色 #38BDF8 の枠を付けてください。",
      hint: "border: 1px solid #38BDF8;",
      answer: `.card { border: 1px solid #38BDF8; }`,
    },
    quiz: {
      question: "border のショートハンドの順は？",
      choices: ["色 種類 太さ", "種類 太さ 色", "太さ 種類 色", "太さ 色 種類"],
      answerIndex: 2,
      explanation: "太さ・種類・色 の順。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(19, {
    chapter: "ボックスモデル",
    category: "枠",
    title: "border-radius（角丸）",
    description: "要素の角を丸くします。",
    goals: ["px と % の違いがわかる", "ボタンを丸めて完成度を上げられる"],
    webUseCase: "ボタン、カード、アバター、バッジ。最近のUIはほぼ角丸が標準。",
    htmlConnection: "img タグでも border-radius が効きます（円形アイコンに）。",
    jsReactConnection: "コンポーネント単位で『radius=lg』のように渡すと統一感が出る。",
    tailwindConnection: "rounded-md, rounded-xl, rounded-full。",
    explanation:
      "border-radius: 12px; は四隅を12px丸める。50% にすると正方形なら円になる。",
    cssFileName: "style.css",
    cssExample: `.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #A78BFA;
}
.btn {
  border-radius: 12px;
}`,
    htmlExample: `<div class="avatar"></div>
<button class="btn">押す</button>`,
    previewDescription: "アバターは完全な丸、ボタンは少し丸い角になります。",
    visualChange: "px は固定の丸み、% は要素のサイズに対する比率。",
    codeExplanation: ["50% は正方形なら円形を作るおまじない。", "8〜16px がモダンUIの定番。"],
    commonMistakes: ["正方形でないのに 50% にして楕円になる", "丸めすぎてボタンに見えなくなる"],
    practice: {
      title: "丸いボタン",
      task: ".pill の border-radius を 999px にしてください。",
      hint: "999pxは事実上の完全丸め。",
      answer: `.pill { border-radius: 999px; }`,
    },
    quiz: {
      question: "正方形を円にするときの値は？",
      choices: ["10px", "100px", "50%", "100%"],
      answerIndex: 2,
      explanation: "50% で円になります。",
    },
    estimatedMinutes: 5,
    difficulty: 1,
  }),

  L(20, {
    chapter: "ボックスモデル",
    category: "影",
    title: "box-shadow（影）",
    description: "要素の周りに影を落として立体感を出します。",
    goals: ["box-shadow の値の意味がわかる", "ふんわりした影を作れる"],
    webUseCase: "カードを浮かせる、メニューを目立たせる、押せそうに見せる。",
    htmlConnection: "ボタン、カード、モーダルなど立体感を出したい全てに。",
    jsReactConnection: "ホバー時だけ影を強くすると押せそう感が出る。",
    tailwindConnection: "shadow, shadow-md, shadow-xl。",
    explanation:
      "box-shadow: 0 8px 24px rgba(0,0,0,0.2); は『横0・縦8・ぼかし24・色半透明黒』。柔らかい影は alpha を低めに。",
    cssFileName: "style.css",
    cssExample: `.card {
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  border-radius: 16px;
  padding: 16px;
  background: #18222F;
}`,
    htmlExample: `<div class="card">浮いて見えるカード</div>`,
    previewDescription: "カードの下にぼんやりした影が落ち、浮いているように見えます。",
    visualChange: "影があるだけで立体感が出てクリックしたくなる雰囲気に。",
    codeExplanation: [
      "横ずらし・縦ずらし・ぼかし・色 の4つが基本。",
      "rgba の alpha を低くすると自然な影。",
    ],
    commonMistakes: ["黒100%の濃い影で重く見える", "ぼかしを0にしてカクカクの影になる"],
    practice: {
      title: "柔らかい影",
      task: ".card に縦8・ぼかし20・rgba(0,0,0,0.15) の影を付けてください。",
      hint: "box-shadow: 0 8px 20px rgba(0,0,0,0.15);",
      answer: `.card { box-shadow: 0 8px 20px rgba(0,0,0,0.15); }`,
    },
    quiz: {
      question: "box-shadow の値の最初の数字は？",
      choices: ["ぼかし", "縦", "横", "alpha"],
      answerIndex: 2,
      explanation: "横ずらし → 縦ずらし → ぼかし → 色 の順。",
    },
    estimatedMinutes: 6,
    difficulty: 2,
  }),

  L(21, {
    chapter: "ボックスモデル",
    category: "ボックス",
    title: "box-sizing（サイズの計算）",
    description: "padding を含めてサイズ計算する設定にします。",
    goals: [
      "border-box と content-box の違いがわかる",
      "全要素を border-box にする習慣がつく",
    ],
    webUseCase:
      "今のWebでは『* { box-sizing: border-box; }』が事実上の標準。これがないとサイズ計算が地獄です。",
    htmlConnection: "全タグ共通で効くため、リセットCSSの定番。",
    jsReactConnection: "新規プロジェクトでは index.css の最初に書くのが鉄則。",
    tailwindConnection: "Tailwindは preflight で box-sizing: border-box を全要素に当ててくれる。",
    explanation:
      "デフォルトの content-box では width に padding/border が含まれず、見た目より要素が大きくなりがち。border-box なら width の中に padding/border が含まれて直感的。",
    cssFileName: "style.css",
    cssExample: `*, *::before, *::after {
  box-sizing: border-box;
}`,
    htmlExample: `<div class="box">予想通りの幅</div>`,
    previewDescription: "width 200px のままpaddingを増やしても、要素は200pxを超えません。",
    visualChange: "サイズ計算の挙動が直感的になる。",
    codeExplanation: ["* は全タグセレクタ。", "::before / ::after も含めると安全。"],
    commonMistakes: ["個別要素にだけ書いて他で挙動が違う", "リセットを書かずに padding でズレる"],
    practice: {
      title: "全要素にborder-box",
      task: "* { box-sizing: border-box; } を書いてください。",
      hint: "* セレクタを使う。",
      answer: `* { box-sizing: border-box; }`,
    },
    quiz: {
      question: "padding を含めてサイズ計算する値は？",
      choices: ["content-box", "border-box", "padding-box", "auto"],
      answerIndex: 1,
      explanation: "border-box が直感的で実務標準。",
    },
    estimatedMinutes: 6,
    difficulty: 2,
  }),

  L(22, {
    chapter: "ボックスモデル",
    category: "表示",
    title: "display（表示の種類）",
    description: "要素のレイアウト方式を切り替えます。",
    goals: ["block / inline / inline-block / none を見分ける", "display: none で非表示にできる"],
    webUseCase: "縦に並ぶか、横に並ぶか、消すか。レイアウトの根っこです。",
    htmlConnection: "div は block、span は inline がデフォルト。CSSで切り替えられる。",
    jsReactConnection: "状態によって display: none で切り替えるのは定番。",
    tailwindConnection: "block, inline, inline-block, hidden。",
    explanation:
      "display には主に block / inline / inline-block / flex / grid / none などがあります。",
    cssFileName: "style.css",
    cssExample: `.menu  { display: block; }
.icon  { display: inline; }
.tag   { display: inline-block; }
.hidden { display: none; }`,
    htmlExample: `<div class="menu">メニュー</div>
<span class="icon">★</span>
<span class="tag">NEW</span>
<div class="hidden">見えない</div>`,
    previewDescription:
      "block は縦並び、inline は横並び、inline-block は横並びでサイズ指定可、display:none は消える。",
    visualChange: "display は『並び方』と『サイズ指定の効き方』を一緒に決める。",
    codeExplanation: ["block は縦に積む。", "inline は文中に並ぶ。", "none は完全に表示が消える。"],
    commonMistakes: ["visibility: hidden と display: none を混同する"],
    practice: {
      title: "非表示にする",
      task: ".off を非表示にしてください。",
      hint: "display: none。",
      answer: `.off { display: none; }`,
    },
    quiz: {
      question: "完全に表示も領域も消す値は？",
      choices: ["hidden", "block", "none", "invisible"],
      answerIndex: 2,
      explanation: "display: none で領域ごと消えます。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(23, {
    chapter: "ボックスモデル",
    category: "表示",
    title: "block 要素の特徴",
    description: "縦に積まれて、幅は親いっぱい。サイズ指定OK。",
    goals: ["block の挙動を3つ言える", "div が block であると知る"],
    webUseCase: "見出し・段落・カードはすべて block。縦に積み上げてレイアウトします。",
    htmlConnection: "div, p, h1, section などはデフォルトで block。",
    jsReactConnection: "Reactでも div を入れ子にしてレイアウトを作る。",
    tailwindConnection: "block クラスで明示できる。",
    explanation:
      "block は『縦に並ぶ・親の幅いっぱい・width/height/margin/padding が全部効く』が特徴。",
    cssFileName: "style.css",
    cssExample: `.row {
  display: block;
  width: 100%;
  padding: 12px;
  background: #18222F;
}`,
    htmlExample: `<div class="row">行1</div>
<div class="row">行2</div>`,
    previewDescription: "2つのdivが上下に並びます。",
    visualChange: "block は次の要素を改行する。",
    codeExplanation: ["block は親の幅いっぱい広がる。", "縦に積み上がる。"],
    commonMistakes: ["block 同士を横に並べたいのに display を変えていない"],
    practice: {
      title: "block を意識する",
      task: ".item を block で表示してください。",
      hint: "display: block。",
      answer: `.item { display: block; }`,
    },
    quiz: {
      question: "block のデフォルトの幅は？",
      choices: ["要素のサイズ", "親の幅いっぱい", "0", "100vw"],
      answerIndex: 1,
      explanation: "block は親の幅いっぱいに広がります。",
    },
    estimatedMinutes: 4,
    difficulty: 1,
  }),

  L(24, {
    chapter: "ボックスモデル",
    category: "表示",
    title: "inline 要素の特徴",
    description: "横に並ぶ。文字と一緒に流れる。サイズ指定が効きにくい。",
    goals: ["inline の挙動を理解する", "span が inline だと知る"],
    webUseCase: "文中の強調や、リンク、アイコン。",
    htmlConnection: "span, a, strong, em は inline。",
    jsReactConnection: "<span> でアイコンや小さなラベルを文中に挟むことが多い。",
    tailwindConnection: "inline クラス。",
    explanation:
      "inline は横に並び、改行しない。width/height は基本効かないため、サイズが必要なら inline-block か block に変える。",
    cssFileName: "style.css",
    cssExample: `.tag {
  display: inline;
  color: #38BDF8;
}`,
    htmlExample: `<p>記事の中に <span class="tag">タグ</span> を挟む</p>`,
    previewDescription: "「タグ」という文字が文中に水色で表示されます。",
    visualChange: "inline は文章の流れに溶け込む。",
    codeExplanation: ["inline は改行しない。", "width/height は無視される。"],
    commonMistakes: ["inline に width を指定して効かない"],
    practice: {
      title: "inline のリンク",
      task: "a タグを inline 表示にする（デフォルトのまま）。",
      hint: "a はもともと inline。",
      answer: `a { display: inline; }`,
    },
    quiz: {
      question: "inline に効きにくいプロパティは？",
      choices: ["color", "font-size", "width", "background"],
      answerIndex: 2,
      explanation: "inline は width/height がほぼ効きません。",
    },
    estimatedMinutes: 4,
    difficulty: 2,
  }),

  L(25, {
    chapter: "ボックスモデル",
    category: "表示",
    title: "inline-block 要素",
    description: "横に並びつつ、サイズも指定できるおいしいとこ取り。",
    goals: ["inline-block の使いどころがわかる", "ボタンの並びに使える"],
    webUseCase: "横に並べたい複数のバッジやタグ、横並びのボタンに使います。",
    htmlConnection: "ボタンやチップなどに対して幅と高さを持たせて並べる。",
    jsReactConnection: "Reactではコンポーネント単位でinline-blockを当てる場面は減り、Flex/Gridに置き換わる。",
    tailwindConnection: "inline-block。",
    explanation:
      "inline-block は『横に並ぶ inline + サイズ指定OK』。最近はFlexに置き換わることが多いですが、覚えておきましょう。",
    cssFileName: "style.css",
    cssExample: `.chip {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: #1E293B;
  color: #38BDF8;
}`,
    htmlExample: `<span class="chip">React</span>
<span class="chip">CSS</span>
<span class="chip">UI</span>`,
    previewDescription: "3つのチップが横並びで表示されます。",
    visualChange: "inline-block にすると、サイズ指定したまま横に並べられる。",
    codeExplanation: ["inline-block は inline の挙動 + サイズ指定。"],
    commonMistakes: ["Flex/Grid を使えばもっと簡単なのに古い書き方を続ける"],
    practice: {
      title: "inline-block",
      task: ".chip を inline-block にしてください。",
      hint: "display。",
      answer: `.chip { display: inline-block; }`,
    },
    quiz: {
      question: "inline-block の特徴は？",
      choices: [
        "縦に積む",
        "横に並ぶがサイズ指定も効く",
        "完全に消える",
        "幅が常に100%",
      ],
      answerIndex: 1,
      explanation: "inline-block は横並びでサイズも指定できる。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(26, {
    chapter: "ボタンとカード",
    category: "実装",
    title: "div とCSSで「箱」を作る",
    description: "div に CSS を当てて、最初の『カード』を作ります。",
    goals: ["div + クラス + プロパティ複数 で部品が作れる"],
    webUseCase: "WebUIの大半は div + CSS でできています。",
    htmlConnection: "div は意味のない箱。class を付けてCSSで意味づけする。",
    jsReactConnection: "Reactのコンポーネントも、JSXのルートが div になることが多い。",
    tailwindConnection:
      "<div className=\"bg-slate-800 rounded-2xl p-4\"> のように書くだけで同じカードが作れる。",
    explanation:
      "background-color, border-radius, padding, box-shadow を組み合わせれば、シンプルなカードが完成。",
    cssFileName: "style.css",
    cssExample: `.card {
  background: #18222F;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  color: #E6EDF7;
}`,
    htmlExample: `<div class="card">これがカード</div>`,
    previewDescription: "暗い背景に丸い角・影付きのカードが表示されます。",
    visualChange: "4つのプロパティを組み合わせるだけでUIっぽくなる。",
    codeExplanation: ["background で塗り、padding で余白、border-radius で角丸、box-shadow で立体感。"],
    commonMistakes: ["padding を入れず文字が縁ギリギリ", "影が濃すぎてうるさい"],
    practice: {
      title: "ミニカード",
      task: ".mini に背景 #18222F・padding 12px・角丸12pxを設定してください。",
      hint: "3行書く。",
      answer: `.mini { background: #18222F; padding: 12px; border-radius: 12px; }`,
    },
    quiz: {
      question: "カードを浮かせて見せるプロパティは？",
      choices: ["padding", "border", "box-shadow", "color"],
      answerIndex: 2,
      explanation: "box-shadow が立体感を作ります。",
    },
    estimatedMinutes: 6,
    difficulty: 2,
  }),

  L(27, {
    chapter: "ボタンとカード",
    category: "セレクタ",
    title: "class セレクタを深掘り",
    description: "同じクラスを複数の要素に付けて使い回します。",
    goals: ["クラスは何度でも使えると知る", "複数のクラスを組み合わせる"],
    webUseCase: "同じスタイルを使い回すと、UIが揃って実装も速くなります。",
    htmlConnection: "class=\"card primary\" のようにスペース区切りで複数指定できる。",
    jsReactConnection:
      "Reactでも className=\"card primary\" でOK。動的に組むなら clsx や template literal を使う。",
    tailwindConnection: "Tailwindは『複数クラスを組み合わせて部品を作る』思想そのもの。",
    explanation:
      "クラスは何個付けても良い。共通スタイルは .card、状態違いは .primary のように分けると整理しやすい。",
    cssFileName: "style.css",
    cssExample: `.card { padding: 16px; border-radius: 12px; background: #18222F; }
.primary { border: 2px solid #38BDF8; }`,
    htmlExample: `<div class="card primary">主役のカード</div>`,
    previewDescription: "暗い背景のカードに、青い枠が加わって強調されます。",
    visualChange: "クラスを足すだけで状態違いを作れる。",
    codeExplanation: ["HTMLの class はスペース区切りで複数。", "CSS側は .card と .primary を別々に定義する。"],
    commonMistakes: ["classをカンマで区切ってしまう", "クラス名にスペースを含めてしまう"],
    practice: {
      title: "複数クラス",
      task: ".btn と .danger を組み合わせて使う書き方を書いてください。",
      hint: "HTML側の class 属性に2つ書く。",
      answer: `<button class="btn danger">削除</button>`,
    },
    quiz: {
      question: "複数クラスの区切りは？",
      choices: [", カンマ", ". ドット", "  スペース", "/ スラッシュ"],
      answerIndex: 2,
      explanation: "スペース区切りです。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(28, {
    chapter: "ボタンとカード",
    category: "セレクタ",
    title: "id セレクタ（と注意点）",
    description: "id は1ページに1つ。スタイル目的では基本使わない。",
    goals: ["id と class の役割を区別できる", "なぜ class が推奨かを理解する"],
    webUseCase: "id は『ページ内リンク』『JSからの取得』には便利。CSSでは class を使うのが基本。",
    htmlConnection: "id は1ページに1つだけ、というルールがあります。",
    jsReactConnection: "Reactでは状態管理で済むので id を使う場面は少ない。",
    tailwindConnection: "Tailwindは class 中心の設計。id はあまり登場しない。",
    explanation:
      "#header { ... } のように # で書きます。id は再利用できない＆詳細度が高すぎるので、CSSでは class を使うのがおすすめ。",
    cssFileName: "style.css",
    cssExample: `#header {
  background: #111827;
  height: 56px;
}`,
    htmlExample: `<header id="header">サイトタイトル</header>`,
    previewDescription: "ヘッダーが暗い背景・56px高で表示されます。",
    visualChange: "重要なのは『id は 1ページに1つだけ』というルール。",
    codeExplanation: ["# はidセレクタ。", "詳細度が高いので、後から上書きしづらい。"],
    commonMistakes: ["同じ id を複数の要素に付ける", "CSSでid を使いまくり、上書きできなくなる"],
    practice: {
      title: "id の使い方",
      task: "<header id=\"top\"> にスタイルを当てるCSSを書いてください。",
      hint: "# を使う。",
      answer: `#top { background: #111827; }`,
    },
    quiz: {
      question: "id を1ページに何個まで使えますか？",
      choices: ["何個でも", "1個まで", "5個まで", "そのページの大きさ次第"],
      answerIndex: 1,
      explanation: "id は1個までというルールです。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(29, {
    chapter: "ボタンとカード",
    category: "セレクタ",
    title: "複数クラスの組み合わせ",
    description: "ベース .btn にバリエーション .primary / .ghost を組み合わせる",
    goals: ["BEMっぽい考え方の入り口を知る", "状態違いを表現できる"],
    webUseCase: "ボタンの色違い、サイズ違いを少ないコードで実現できます。",
    htmlConnection: "<button class=\"btn primary\">のように使う。",
    jsReactConnection: "Reactで variant prop によって class を切り替えるのが定番。",
    tailwindConnection: "Tailwind自体が『汎用クラスの組み合わせで部品を作る』思想。",
    explanation:
      "共通: .btn、固有: .primary を別々のセレクタで書き、HTMLで両方付ける。",
    cssFileName: "style.css",
    cssExample: `.btn { padding: 10px 16px; border-radius: 12px; font-weight: 700; }
.btn.primary { background: #38BDF8; color: #0F172A; }
.btn.ghost   { background: transparent; color: #38BDF8; border: 1px solid #38BDF8; }`,
    htmlExample: `<button class="btn primary">保存</button>
<button class="btn ghost">キャンセル</button>`,
    previewDescription: "塗りボタンと枠線ボタンの2つが並びます。",
    visualChange: "共通の形＋固有の塗りで、使い分けができる。",
    codeExplanation: [".btn.primary は『btn と primary を両方持つ』要素を指す。"],
    commonMistakes: [".btn.primary をスペースなしで書こうとして崩れる"],
    practice: {
      title: "ボタンの色違い",
      task: ".btn.danger を背景 #EF4444・文字 #fff にしてください。",
      hint: ".btn.danger を使う。",
      answer: `.btn.danger { background: #EF4444; color: #fff; }`,
    },
    quiz: {
      question: ".btn.primary は何を意味する？",
      choices: [
        ".btn の中の.primary",
        ".btn または .primary",
        ".btn かつ .primary",
        ".btn を継承",
      ],
      answerIndex: 2,
      explanation: "両方のクラスを持つ要素を指します（AND）。",
    },
    estimatedMinutes: 5,
    difficulty: 3,
  }),

  L(30, {
    chapter: "ボタンとカード",
    category: "状態",
    title: ":hover でホバー時の見た目",
    description: "マウスを乗せた瞬間にスタイルを変えられます。",
    goals: [":hover の書き方を覚える", "ボタンに反応をつけられる"],
    webUseCase: "ボタンが押せそうに見える、リンクが動きを返す。",
    htmlConnection: "ほぼすべての要素に :hover が使えます。",
    jsReactConnection: "Reactでも CSS の :hover で十分。JS でやる必要は基本ない。",
    tailwindConnection: "hover:bg-sky-600 のように prefix を付ける。",
    explanation:
      "セレクタ:hover { ... } と書きます。マウスがその要素の上にある間だけ適用されます。",
    cssFileName: "style.css",
    cssExample: `.btn {
  background: #38BDF8;
  color: #0F172A;
  padding: 10px 16px;
  border-radius: 12px;
}
.btn:hover {
  background: #3B82F6;
  color: #ffffff;
}`,
    htmlExample: `<button class="btn">マウスを乗せて</button>`,
    previewDescription: "マウスを乗せると色が濃く変わります。",
    visualChange: ":hover で『反応する感じ』を作れる。",
    codeExplanation: [":hover はマウスが乗っている間だけ適用される疑似クラス。"],
    commonMistakes: [".btn :hover とスペースを入れて壊す（.btn:hover が正解）"],
    practice: {
      title: "ホバーで色変え",
      task: ".btn:hover で背景を #3B82F6 に変えてください。",
      hint: ":hover のスペースに注意。",
      answer: `.btn:hover { background: #3B82F6; }`,
    },
    quiz: {
      question: ":hover はいつ効く？",
      choices: [
        "クリックされた瞬間",
        "マウスが乗っている間",
        "ページ読み込み時",
        "フォーカス時",
      ],
      answerIndex: 1,
      explanation: "マウスが乗っている間だけ。",
    },
    estimatedMinutes: 5,
    difficulty: 2,
  }),

  L(31, {
    chapter: "ボタンとカード",
    category: "アニメ",
    title: "transition で滑らかに",
    description: "プロパティの変化を一定時間でなめらかに見せます。",
    goals: ["transition: 〜 0.2s ease; を書ける", "ホバーが上品な動きになる"],
    webUseCase: "transition があるだけで上品なUIに。",
    htmlConnection: "ほぼ全要素に使える。",
    jsReactConnection: "Reactでも CSS の transition をそのまま使うのが楽。",
    tailwindConnection: "transition, duration-200, ease-out。",
    explanation:
      "transition: プロパティ 時間 イージング; と書く。all を指定するとどのプロパティの変化も滑らかに。",
    cssFileName: "style.css",
    cssExample: `.btn {
  background: #38BDF8;
  transition: background 200ms ease;
}
.btn:hover {
  background: #3B82F6;
}`,
    htmlExample: `<button class="btn">滑らかに変わる</button>`,
    previewDescription: "ホバーしたとき、色が0.2秒かけて変わります。",
    visualChange: "瞬間切替→なめらか変化に。",
    codeExplanation: ["transition は『変化のしかた』を決める。", "200ms くらいが心地よい。"],
    commonMistakes: ["transition を :hover 側に書いてしまう（必ず元側に）"],
    practice: {
      title: "ホバーをなめらかに",
      task: ".btn の transition を background 200ms ease にしてください。",
      hint: "transition プロパティ。",
      answer: `.btn { transition: background 200ms ease; }`,
    },
    quiz: {
      question: "transition の値の順は？",
      choices: ["時間 プロパティ イージング", "プロパティ 時間 イージング", "イージング 時間", "色 時間"],
      answerIndex: 1,
      explanation: "プロパティ 時間 イージング の順。",
    },
    estimatedMinutes: 6,
    difficulty: 2,
  }),

  L(32, {
    chapter: "ボタンとカード",
    category: "実装",
    title: "ボタンをデザインする",
    description: "ここまでのCSSを組み合わせて『使えるボタン』を作ります。",
    goals: ["実用ボタンが組める", "見た目だけでなく押しやすさも意識する"],
    webUseCase: "アプリで一番多い部品はボタンと言っても過言ではない。",
    htmlConnection: "<button>タグに class を付けるのが基本。",
    jsReactConnection: "<Button variant=\"primary\"> のようなコンポーネント化に進める。",
    tailwindConnection: "px-4 py-2 rounded-xl bg-sky-500 text-slate-900 hover:bg-sky-600。",
    explanation:
      "padding, border-radius, font-weight, transition, hover を全部使うのが基本形。",
    cssFileName: "style.css",
    cssExample: `.btn {
  padding: 12px 20px;
  border-radius: 12px;
  background: #38BDF8;
  color: #0F172A;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background 200ms ease;
}
.btn:hover { background: #3B82F6; color: #fff; }`,
    htmlExample: `<button class="btn">送信する</button>`,
    previewDescription: "押しやすいサイズ感と、ホバーで色が変わる完成度の高いボタン。",
    visualChange: "サイズ、色、形、動きが全部揃って『プロのボタン』に。",
    codeExplanation: ["border: none でブラウザ標準枠を消す。", "cursor: pointer で押せる感を出す。"],
    commonMistakes: ["padding が足りずスマホで押しにくい", "色のコントラストが弱い"],
    practice: {
      title: "二次ボタン",
      task: ".btn-secondary を、白背景・黒文字・1px solid #243049 の枠 で作ってください。",
      hint: "background, color, border。",
      answer: `.btn-secondary { background: #fff; color: #0F172A; border: 1px solid #243049; }`,
    },
    quiz: {
      question: "ボタンを押しやすくする一番簡単な方法は？",
      choices: ["色を派手にする", "padding を増やす", "影を付ける", "文字を大きくする"],
      answerIndex: 1,
      explanation: "padding が押しやすさを直接決めます。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(33, {
    chapter: "ボタンとカード",
    category: "実装",
    title: "カードをデザインする",
    description: "アバター、タイトル、説明、ボタンを含むカードを作ります。",
    goals: ["複数要素を組み合わせるカードを書ける"],
    webUseCase: "プロフィールカード、商品カード、記事カードなど、Webの主要部品。",
    htmlConnection: "div の中に img / h3 / p / button をネストする。",
    jsReactConnection: "<Card>コンポーネントとして再利用できる構造を意識する。",
    tailwindConnection: "rounded-2xl, p-4, shadow-md, space-y-2 など。",
    explanation:
      "外側のカードに padding と background。中の要素に margin で間隔。最後にボタン。",
    cssFileName: "style.css",
    cssExample: `.card {
  background: #18222F;
  padding: 16px;
  border-radius: 16px;
  color: #E6EDF7;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}
.card h3 { font-size: 18px; margin-bottom: 4px; }
.card p  { color: #94A3B8; line-height: 1.6; }`,
    htmlExample: `<div class="card">
  <h3>カードタイトル</h3>
  <p>カードの説明文がここに入ります。</p>
</div>`,
    previewDescription: "見出し・説明文がきれいに揃った、影付きのカードが現れます。",
    visualChange: "見出しが目立ち、説明文は控えめ。情報の階層が見える。",
    codeExplanation: [".card h3 で『.card の中の h3』に絞ってスタイルを当てる。"],
    commonMistakes: ["中の余白を margin だけで作って崩れる"],
    practice: {
      title: "カードの説明文",
      task: ".card p の color を #94A3B8、line-height 1.6 にしてください。",
      hint: ".card p セレクタ。",
      answer: `.card p { color: #94A3B8; line-height: 1.6; }`,
    },
    quiz: {
      question: ".card h3 は何にスタイルを当てる？",
      choices: [
        ".card クラス全部",
        "全ての h3",
        ".card の中の h3",
        ".card または h3",
      ],
      answerIndex: 2,
      explanation: ".card の子孫の h3 を指します。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(34, {
    chapter: "画像と背景",
    category: "画像",
    title: "画像の整え方",
    description: "max-width: 100%; とaspect-ratio で崩れない画像を作ります。",
    goals: ["画像が親をはみ出さない設定が書ける", "aspect-ratio で比率を保てる"],
    webUseCase: "スマホでもPCでも、画像が崩れないのは超重要。",
    htmlConnection: "img タグに width 属性を入れない方が柔軟。",
    jsReactConnection: "Next.js の Image など、最適化機能と相性が良い。",
    tailwindConnection: "max-w-full, aspect-video, object-cover。",
    explanation:
      "img { max-width: 100%; height: auto; } をベースに、object-fit: cover; aspect-ratio: 16/9; で比率を保ったままトリミングできる。",
    cssFileName: "style.css",
    cssExample: `img {
  max-width: 100%;
  height: auto;
  display: block;
}
.cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 12px;
}`,
    htmlExample: `<img class="cover" src="/sample.jpg" alt="" />`,
    previewDescription: "画像が画面幅に合わせて伸縮し、16:9 の比率を保ったまま表示されます。",
    visualChange: "object-fit: cover で『はみ出した分を切り取って中央表示』になる。",
    codeExplanation: ["max-width: 100% で親をはみ出さない。", "aspect-ratio で比率固定。"],
    commonMistakes: ["height: auto を抜いて縦伸びする"],
    practice: {
      title: "画像を16:9に",
      task: ".thumb に aspect-ratio: 16/9; object-fit: cover; を書いてください。",
      hint: "2行。",
      answer: `.thumb { aspect-ratio: 16/9; object-fit: cover; }`,
    },
    quiz: {
      question: "画像が親をはみ出さないようにする定番は？",
      choices: ["width: 100vw;", "max-width: 100%;", "height: 100%;", "overflow: hidden;"],
      answerIndex: 1,
      explanation: "max-width: 100% が定番です。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(35, {
    chapter: "画像と背景",
    category: "背景",
    title: "background-image",
    description: "要素の背景に画像を敷きます。",
    goals: ["background-image の書き方を覚える", "background-size: cover を使える"],
    webUseCase: "ヒーローセクションの大きなビジュアル、カード背景、アバター。",
    htmlConnection: "<img>と違い、背景画像はテキストの後ろに敷ける。",
    jsReactConnection: "style 属性で背景画像URLを差し込むこともできる。",
    tailwindConnection: "bg-cover, bg-center, bg-no-repeat。",
    explanation:
      "background-image: url('/hero.jpg'); background-size: cover; background-position: center; がセット。",
    cssFileName: "style.css",
    cssExample: `.hero {
  background-image: url('/hero.jpg');
  background-size: cover;
  background-position: center;
  height: 240px;
  border-radius: 16px;
}`,
    htmlExample: `<div class="hero"></div>`,
    previewDescription: "高さ240pxの長方形に画像が中央でトリミングされて敷かれます。",
    visualChange: "cover は『要素を覆うように』、contain は『収まるように』表示。",
    codeExplanation: ["background-size: cover が現代UIの定番。", "background-repeat: no-repeat も忘れずに。"],
    commonMistakes: ["size指定を忘れて画像が小さい"],
    practice: {
      title: "背景画像cover",
      task: ".hero に背景画像を敷き、cover で表示してください。URLは /hero.jpg。",
      hint: "url('...') と background-size。",
      answer: `.hero { background-image: url('/hero.jpg'); background-size: cover; background-position: center; }`,
    },
    quiz: {
      question: "背景画像が要素いっぱいに切り取られて表示されるのは？",
      choices: ["contain", "cover", "fit", "fill"],
      answerIndex: 1,
      explanation: "cover は要素いっぱいに切り取って表示。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(36, {
    chapter: "画像と背景",
    category: "色",
    title: "色の指定方法（HEX/RGB/HSL）",
    description: "色は何種類かの書き方ができます。状況で使い分け。",
    goals: ["HEX, rgb(), rgba(), hsl() の特徴を知る"],
    webUseCase:
      "デザインカンプから色を持ってくる時はHEX、半透明にしたい時はrgba、デザインシステムの色設計はhslが便利。",
    htmlConnection: "どこで使ってもOK。",
    jsReactConnection: "状態で alpha を変えるアニメーションは rgba が書きやすい。",
    tailwindConnection:
      "Tailwindでは rgba(...) を直接書けるし、bg-sky-500/50 のような透明度指定もできる。",
    explanation:
      "HEX(#38BDF8) は短く正確。rgb()/rgba() は alpha が指定できる。hsl() は色相・彩度・明度で直感的に変えられる。",
    cssFileName: "style.css",
    cssExample: `.box1 { color: #38BDF8; }
.box2 { color: rgb(56, 189, 248); }
.box3 { color: rgba(56, 189, 248, 0.6); }
.box4 { color: hsl(199, 92%, 60%); }`,
    htmlExample: `<p class="box1">HEX</p>
<p class="box2">RGB</p>
<p class="box3">RGBA(半透明)</p>
<p class="box4">HSL</p>`,
    previewDescription: "似た青系の色が4種類で並びます。box3だけ薄く。",
    visualChange: "alpha (rgba/hsla) で半透明にできる。",
    codeExplanation: ["alpha は0〜1。0で完全透明、1で不透明。"],
    commonMistakes: ["rgb() の値の範囲を間違える（0〜255）"],
    practice: {
      title: "半透明の白",
      task: ".overlay に半透明の白（rgba）を背景指定してください（alpha 0.4）。",
      hint: "background: rgba(255,255,255,0.4)。",
      answer: `.overlay { background: rgba(255,255,255,0.4); }`,
    },
    quiz: {
      question: "alpha が指定できるのは？",
      choices: ["HEX(#xxxxxx)", "rgb()", "rgba()", "color名"],
      answerIndex: 2,
      explanation: "alpha 指定なら rgba() / hsla() / 8桁HEX。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(37, {
    chapter: "余白とサイズ",
    category: "単位",
    title: "px / % / rem / em の単位",
    description: "サイズの単位の使い分けを学びます。",
    goals: ["px, %, rem の違いを言える", "rem ベースで作るとアクセシビリティに強いと知る"],
    webUseCase: "本文を rem で作ると、ユーザーが文字サイズを大きくしたとき自動で大きくなる。",
    htmlConnection: "html { font-size: 16px; } をベースに rem を使う。",
    jsReactConnection: "デザインシステムでは rem を統一の単位にすることが多い。",
    tailwindConnection: "Tailwindは内部的に rem を使っている。text-base は1rem。",
    explanation:
      "px は固定。% は親に対する割合。rem は html の font-size に対する倍率。1rem ≒ 16px が一般的。",
    cssFileName: "style.css",
    cssExample: `html { font-size: 16px; }
.title { font-size: 1.5rem; }   /* 24px */
.body  { font-size: 1rem; }     /* 16px */
.note  { font-size: 0.75rem; }  /* 12px */`,
    htmlExample: `<h2 class="title">タイトル</h2>
<p class="body">本文</p>
<p class="note">注釈</p>`,
    previewDescription: "タイトル24px、本文16px、注釈12pxで階層が見えます。",
    visualChange:
      "rem を使うと、html の font-size を変えるだけで全体のサイズ感を一括調整できる。",
    codeExplanation: ["1rem は html の font-size と同じ。", "% は親要素への割合。"],
    commonMistakes: ["px と rem を混在させて統一感がなくなる"],
    practice: {
      title: "rem で書く",
      task: ".heading の font-size を 1.5rem にしてください。",
      hint: "rem。",
      answer: `.heading { font-size: 1.5rem; }`,
    },
    quiz: {
      question: "html の font-size に対する倍率の単位は？",
      choices: ["px", "%", "rem", "em"],
      answerIndex: 2,
      explanation: "rem は root em。html を基準にする。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(38, {
    chapter: "ボタンとカード",
    category: "デバッグ",
    title: "CSSが効かない時の確認",
    description: "うまく当たらない時のチェックリスト。",
    goals: ["効かないときの観点を3つ持つ", "DevToolsを開いて確認する習慣"],
    webUseCase: "実務ではCSSが効かない場面の方が多い。デバッグ力で速度が変わります。",
    htmlConnection: "クラス名の打ち間違い、HTMLの構造ミスを最初に疑う。",
    jsReactConnection: "Reactでは className のtypoが定番ミス。",
    tailwindConnection: "Tailwindでは class が purge されてないか・タイプミスがないかを見る。",
    explanation:
      "①セレクタが本当に当たっているか（DevToolsで確認）②詳細度で他のCSSに負けてないか ③HTML側のクラス名にtypoがないか。",
    cssFileName: "style.css",
    cssExample: `/* よくある失敗 */
.title-color { color: red; }   /* CSS */`,
    htmlExample: `<!-- HTML：クラス名が違う -->
<h2 class="title_color">タイトル</h2>`,
    previewDescription: "見た目は赤くならない（クラス名がアンダーバーとハイフンで違う）。",
    visualChange: "クラス名が一致していないとCSSは効かない。",
    codeExplanation: ["DevTools を右クリック → 検証 で開ける。", "ElementsタブでHTMLとCSSのつながりを確認できる。"],
    commonMistakes: ["ハイフン/アンダーバーの取り違え", "ファイルの読み込み忘れ", "別のCSSが優先されている"],
    practice: {
      title: "デバッグの順番",
      task: "CSSが効かない時、最初にチェックすべき3つを言葉で書いてください。",
      hint: "セレクタ、詳細度、HTMLの3観点。",
      answer:
        "① クラス名がHTMLと一致しているか ② DevToolsでセレクタが当たっているか ③ より強い詳細度のCSSに負けていないか。",
    },
    quiz: {
      question: "CSSが効かない原因として最初に疑うのは？",
      choices: [
        "ブラウザのバグ",
        "クラス名の打ち間違い",
        "色の指定が悪い",
        "JSの問題",
      ],
      answerIndex: 1,
      explanation: "ほとんどはtypoや不一致が原因。",
    },
    estimatedMinutes: 6,
    difficulty: 3,
  }),

  L(39, {
    chapter: "プロフィールカード制作",
    category: "実装",
    title: "プロフィールカードを作る",
    description: "アバター・名前・肩書き・SNSリンクのカードを作ります。",
    goals: ["ここまでの知識を組み合わせる", "完成度の高い1つの部品を作る"],
    webUseCase: "プロフィールカードはサービスのトップ、ABOUT、ユーザーページに登場する超定番。",
    htmlConnection: "div の中に img, h2, p, a を入れる。",
    jsReactConnection: "<ProfileCard name=\"...\" /> としてpropsで切り替えられる構造に向かう。",
    tailwindConnection: "p-6, rounded-2xl, shadow-lg, text-center などで再現できる。",
    explanation: "padding, border-radius, box-shadow, text-align, font-weight を組み合わせる。",
    cssFileName: "style.css",
    cssExample: `.profile {
  background: #18222F;
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  color: #E6EDF7;
  box-shadow: 0 12px 30px rgba(0,0,0,0.3);
  max-width: 320px;
  margin: 0 auto;
}
.profile .avatar {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: #38BDF8;
  margin: 0 auto 12px;
}
.profile h2 { font-size: 18px; font-weight: 700; }
.profile p  { color: #94A3B8; margin-top: 4px; }`,
    htmlExample: `<div class="profile">
  <div class="avatar"></div>
  <h2>Kota Shoji</h2>
  <p>Frontend Designer</p>
</div>`,
    previewDescription: "中央寄せのプロフィールカードが完成します。",
    visualChange: "全要素が中央寄せ、影で浮き、整ったプロフィールに。",
    codeExplanation: [
      "親に padding と max-width。",
      "中身は text-align: center で中央寄せ。",
      "アバターは margin: 0 auto で中央。",
    ],
    commonMistakes: ["親に text-align: center を入れ忘れる", "影が濃すぎてうるさい"],
    practice: {
      title: "肩書きカラー",
      task: ".profile p の color を #94A3B8 にしてください。",
      hint: "薄いグレー。",
      answer: `.profile p { color: #94A3B8; }`,
    },
    quiz: {
      question: "中央寄せにするのに必要な親側のCSSは？",
      choices: ["margin: 0 auto;", "text-align: center;", "padding: center;", "align: center;"],
      answerIndex: 1,
      explanation: "中身の文字を中央にするのは text-align: center。",
    },
    estimatedMinutes: 8,
    difficulty: 3,
  }),

  L(40, {
    chapter: "プロフィールカード制作",
    category: "Tailwind",
    title: "CSSからTailwindへの接続",
    description: "今書いてきたCSSをTailwindで書き直してみます。",
    goals: ["Tailwindの基本的な対応関係がわかる", "CSSがわかればTailwindも怖くないと知る"],
    webUseCase: "業務の多くがTailwindに切り替わっています。",
    htmlConnection: "<div className=\"...\"> で全部済むイメージ。",
    jsReactConnection: "ReactとTailwindの相性は最高。",
    tailwindConnection: "今までのCSSを1対1で写すことができる。",
    explanation:
      "CSSプロパティ → Tailwindクラスの対応はとてもシンプル。padding-16 → p-4、border-radius-12 → rounded-xl、background → bg- など。",
    cssFileName: "style.css",
    cssExample: `/* CSS */
.card { padding: 16px; border-radius: 16px; background: #18222F; }
/* ↓Tailwindに書き換え（HTMLが変わる） */`,
    htmlExample: `<div class="bg-slate-800 p-4 rounded-2xl">カード</div>`,
    previewDescription: "CSSと全く同じ見た目を、HTML側のクラスだけで再現できます。",
    visualChange: "見た目は同じ。書く場所がCSSファイルではなくHTMLのclassに変わる。",
    codeExplanation: [
      "p-4 = padding: 1rem",
      "rounded-2xl = border-radius: 1rem",
      "bg-slate-800 = background-color: #1E293B",
    ],
    commonMistakes: ["命名スケールを覚えずに px固定で書こうとする"],
    practice: {
      title: "対応関係",
      task: "padding: 24px; border-radius: 12px; background: #38BDF8; をTailwindクラスで書いてください。",
      hint: "p-, rounded-, bg-。",
      answer: `class="p-6 rounded-xl bg-sky-400"`,
    },
    quiz: {
      question: "p-4 はおおよそ何px？",
      choices: ["4px", "8px", "16px", "24px"],
      answerIndex: 2,
      explanation: "p-4 = 1rem ≒ 16px。",
    },
    estimatedMinutes: 7,
    difficulty: 3,
  }),

  L(41, {
    chapter: "文字と色",
    category: "文字",
    title: "letter-spacing（文字間隔）",
    description: "文字と文字の間の隙間を調整します。",
    goals: ["letter-spacing を使える", "見出しを締まった印象にできる"],
    webUseCase: "ロゴ、見出し、ボタン文字。少し広げるだけで雰囲気が変わります。",
    htmlConnection: "全ての文字要素に。",
    jsReactConnection: "デザインシステムで見出しスタイルとして固定するのがおすすめ。",
    tailwindConnection: "tracking-wider, tracking-tight。",
    explanation: "letter-spacing: 0.05em; のように em で指定するのが扱いやすい。",
    cssFileName: "style.css",
    cssExample: `.brand {
  letter-spacing: 0.08em;
  font-weight: 800;
}`,
    htmlExample: `<div class="brand">CSS DESIGN LAB</div>`,
    previewDescription: "ロゴっぽく、字間が広めの見出しになります。",
    visualChange: "字間を広げるとロゴ感、狭めると詰まった印象。",
    codeExplanation: ["em は文字サイズに連動するので便利。"],
    commonMistakes: ["本文に広い字間を入れて読みにくくする"],
    practice: {
      title: "ロゴっぽく",
      task: ".logo に letter-spacing: 0.1em を設定してください。",
      hint: "letter-spacing。",
      answer: `.logo { letter-spacing: 0.1em; }`,
    },
    quiz: {
      question: "字間を広げるプロパティは？",
      choices: ["letter-spacing", "word-spacing", "line-height", "text-indent"],
      answerIndex: 0,
      explanation: "文字と文字の間は letter-spacing。",
    },
    estimatedMinutes: 4,
    difficulty: 2,
  }),

  L(42, {
    chapter: "文字と色",
    category: "文字",
    title: "text-decoration（下線）",
    description: "下線の有無を切り替えます。リンクに使う定番。",
    goals: ["text-decoration: none でリンク下線を消せる"],
    webUseCase: "おしゃれなナビでリンクの下線を消し、ホバー時だけ下線を出す演出が定番。",
    htmlConnection: "a タグはデフォルトで下線が付いています。",
    jsReactConnection: "Link コンポーネントの定番スタイル。",
    tailwindConnection: "underline, no-underline, hover:underline。",
    explanation: "text-decoration: none; で下線消し。underline で下線あり。",
    cssFileName: "style.css",
    cssExample: `a { text-decoration: none; color: #38BDF8; }
a:hover { text-decoration: underline; }`,
    htmlExample: `<a href="#">リンク</a>`,
    previewDescription: "通常時は下線なし、ホバー時に下線が出ます。",
    visualChange: "リンクが洗練された見た目になる。",
    codeExplanation: ["text-decoration は line, color, style もまとめて指定できる。"],
    commonMistakes: ["下線を消したらどこがリンクかわからなくなる（色や太さで補う）"],
    practice: {
      title: "下線を消す",
      task: "a の text-decoration を none にしてください。",
      hint: "text-decoration。",
      answer: `a { text-decoration: none; }`,
    },
    quiz: {
      question: "リンクの下線を消す指定は？",
      choices: ["text-line: none;", "text-decoration: none;", "underline: false;", "decoration: 0;"],
      answerIndex: 1,
      explanation: "text-decoration: none。",
    },
    estimatedMinutes: 4,
    difficulty: 1,
  }),
];
