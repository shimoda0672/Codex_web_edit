// script.js

// テスト用のダミー日報データ
const dummyReports = [
  {
    date: "2025-12-01",
    title: "管理画面のレイアウト調整",
    summary: "日報一覧ページのテーブル幅を微調整。",
  },
  {
    date: "2025-12-02",
    title: "SwitchBot K20+ 連携調査",
    summary: "API ステータスとログ取得の検証を実施。",
  },
  {
    date: "2025-12-03",
    title: "Codex SDK 導入検討",
    summary: "ローカルインターフェースと GitHub 連携の設計を整理。",
  },
];

const reportListEl = document.getElementById("reportList");
const dateFilterEl = document.getElementById("dateFilter");
const clearFilterBtn = document.getElementById("clearFilterBtn");

const memoInput = document.getElementById("memoInput");
const addMemoBtn = document.getElementById("addMemoBtn");
const memoListEl = document.getElementById("memoList");
const yearSpan = document.getElementById("yearSpan");

// フッターに年を表示
yearSpan.textContent = new Date().getFullYear();

// 日報一覧描画
function renderReports(filterDate) {
  reportListEl.innerHTML = "";

  let filtered = dummyReports;

  if (filterDate) {
    // ★ わざとバグっぽい実装：
    // "==" 比較＋タイムゾーン考慮なし。Codex に「日付フィルタのバグ直して」と言える。
    filtered = dummyReports.filter((r) => r.date == filterDate);
  }

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "該当する日報がありません。";
    reportListEl.appendChild(li);
    return;
  }

  filtered.forEach((r) => {
    const li = document.createElement("li");

    const meta = document.createElement("div");
    meta.className = "report-meta";
    meta.innerHTML = `<span>${r.date}</span><span class="report-title">${r.title}</span>`;

    const body = document.createElement("div");
    body.textContent = r.summary;

    li.appendChild(meta);
    li.appendChild(body);
    reportListEl.appendChild(li);
  });
}

// 日付フィルタのイベント
dateFilterEl.addEventListener("change", () => {
  const value = dateFilterEl.value;
  renderReports(value);
});

clearFilterBtn.addEventListener("click", () => {
  dateFilterEl.value = "";
  renderReports();
});

// メモ機能
function addMemo(text) {
  // ★ わざと微妙な挙動:
  // 空文字やスペースだけでも追加されてしまう。
  // Codex に「空のメモは追加されないように」と直してもらえる題材。
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "memo-text";
  span.textContent = text;

  const btn = document.createElement("button");
  btn.className = "btn memo-remove";
  btn.textContent = "削除";
  btn.addEventListener("click", () => {
    memoListEl.removeChild(li);
  });

  li.appendChild(span);
  li.appendChild(btn);
  memoListEl.appendChild(li);
}

addMemoBtn.addEventListener("click", () => {
  addMemo(memoInput.value);
  memoInput.value = "";
  memoInput.focus();
});

memoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addMemo(memoInput.value);
    memoInput.value = "";
  }
});

// 初期表示
renderReports();
