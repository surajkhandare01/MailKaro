console.log("🚀 [MailKaro] Content Script Active in Gmail!");

// Production Backend Base URL
const BACKEND_BASE_URL = "https://mailkaro.onrender.com";

// 1. Extract the latest email content from the Gmail thread
function getIncomingEmailText() {
  const messageBodies = document.querySelectorAll(".a3s.aiL, .ii.gt, div[dir='ltr']");
  if (messageBodies.length > 0) {
    for (let i = messageBodies.length - 1; i >= 0; i--) {
      const text = messageBodies[i].innerText.trim();
      if (text && !text.includes("AI Reply") && text.length > 5) {
        return text;
      }
    }
  }
  return "";
}

// 2. Inject UI controls into the compose toolbar
function injectMailKaroToolbar(toolbar) {
  if (toolbar.dataset.mailkaroInjected === "true" || toolbar.querySelector(".mailkaro-container")) {
    return;
  }
  toolbar.dataset.mailkaroInjected = "true";

  const container = document.createElement("div");
  container.className = "mailkaro-container";
  container.style.cssText = "display: inline-flex; align-items: center; gap: 8px; margin-left: 10px; z-index: 9999;";

  // Language Dropdown
  const langSelect = document.createElement("select");
  langSelect.className = "mailkaro-lang-select";
  langSelect.innerHTML = `
    <option value="English">English</option>
    <option value="Hindi">Hindi</option>
    <option value="Marathi" selected>Marathi</option>
  `;
  langSelect.style.cssText = `
    height: 32px;
    padding: 2px 8px;
    font-size: 12px;
    border-radius: 16px;
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    color: #374151;
    font-weight: 500;
    outline: none;
    cursor: pointer;
  `;

  // AI Reply Button
  const replyBtn = document.createElement("button");
  replyBtn.type = "button";
  replyBtn.className = "mailkaro-reply-btn";
  replyBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>
    AI Reply
  `;
  replyBtn.style.cssText = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0 12px;
    background-color: #4f46e5;
    color: #ffffff;
    border: none;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  `;

  let isGenerating = false;

  replyBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isGenerating) return;

    // Check auth token from Chrome storage
    const storage = await chrome.storage.local.get(["token"]);
    const token = storage.token;

    if (!token) {
      alert("MailKaro: You are not logged in! Please sign in through the MailKaro extension popup first.");
      return;
    }

    const incomingText = getIncomingEmailText();
    const selectedLang = langSelect.value;

    // Locate Gmail compose textbox
    const composeBox =
      toolbar.closest("table")?.parentElement?.querySelector('div[role="textbox"][contenteditable="true"]') ||
      document.querySelector('div[role="textbox"][contenteditable="true"]');

    if (!composeBox) {
      alert("MailKaro: Could not find the Gmail compose area. Please click inside the reply box first.");
      return;
    }

    isGenerating = true;
    replyBtn.disabled = true;
    const originalText = replyBtn.innerHTML;
    replyBtn.innerHTML = `Drafting in ${selectedLang}...`;

    try {
      // दुरुस्त केलेली सरळ URL (तुमच्या बॅकएंड एंडपॉईंटनुसार):
      const response = await fetch(`${BACKEND_BASE_URL}/api/email/smart-reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          incomingEmail: incomingText || "Thank you for getting in touch.",
          intent: "accept",
          tone: "Professional",
          language: selectedLang,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        alert("MailKaro: Your session has expired. Please log in again.");
        await chrome.storage.local.remove(["token"]);
        return;
      }

      if (response.ok && (data.replies || data.reply)) {
        const replyContent = data.replies?.detailedReply || data.replies?.quickReply || data.reply;
        composeBox.focus();
        document.execCommand("insertText", false, replyContent);
      } else {
        alert(data.message || "Failed to generate reply. Please try again.");
      }
    } catch (err) {
      console.error("[MailKaro Error]:", err);
      alert("Unable to connect to MailKaro server. Please ensure Render backend is awake and running.");
    } finally {
      isGenerating = false;
      replyBtn.disabled = false;
      replyBtn.innerHTML = originalText;
    }
  });

  container.appendChild(langSelect);
  container.appendChild(replyBtn);
  toolbar.appendChild(container);
}

// 3. Debounced observer
let debounceTimer = null;
const observer = new MutationObserver(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const toolbars = document.querySelectorAll(".btC, .gU.Up, tr.btC");
    toolbars.forEach((toolbar) => injectMailKaroToolbar(toolbar));
  }, 300);
});

observer.observe(document.body, { childList: true, subtree: true });