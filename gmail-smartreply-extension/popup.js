document.addEventListener("DOMContentLoaded", async () => {
  const loginCard = document.getElementById("loginCard");
  const appCard = document.getElementById("appCard");
  const openLoginBtn = document.getElementById("openLoginBtn");
  const generateBtn = document.getElementById("generateBtn");
  const promptInput = document.getElementById("prompt");
  const languageSelect = document.getElementById("language");
  const toneSelect = document.getElementById("tone");
  const outputWrapper = document.getElementById("outputWrapper");
  const resultBox = document.getElementById("resultBox");
  const copyBtn = document.getElementById("copyBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Check login state and toggle view
  async function checkAuth() {
    const { token } = await chrome.storage.local.get(["token"]);
    if (token) {
      if (loginCard) loginCard.style.display = "none";
      if (appCard) appCard.style.display = "block";
    } else {
      if (loginCard) loginCard.style.display = "block";
      if (appCard) appCard.style.display = "none";
    }
  }

  await checkAuth();

  // Open web login page
  openLoginBtn?.addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:5173/login" });
  });

  // Handle logout
  logoutBtn?.addEventListener("click", async () => {
    await chrome.storage.local.remove(["token"]);
    await checkAuth();
  });

  // Handle email generation
  generateBtn?.addEventListener("click", async () => {
    const { token } = await chrome.storage.local.get(["token"]);
    if (!token) {
      alert("Please log in to your account first.");
      await checkAuth();
      return;
    }

    const topic = promptInput ? promptInput.value.trim() : "";
    const language = languageSelect ? languageSelect.value : "English";
    const tone = toneSelect ? toneSelect.value : "Professional";

    if (!topic) {
      alert("Please enter an email topic or prompt.");
      return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = `Drafting in ${language}...`;
    if (outputWrapper) outputWrapper.style.display = "none";

    try {
      const response = await fetch("http://localhost:5000/api/email/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic, tone, language }),
      });

      const data = await response.json();

      if (response.status === 401) {
        alert("Your session has expired. Please log in again.");
        await chrome.storage.local.remove(["token"]);
        await checkAuth();
        return;
      }

      if (response.ok && data.email?.generatedEmail) {
        if (resultBox) resultBox.textContent = data.email.generatedEmail;
        if (outputWrapper) outputWrapper.style.display = "block";
      } else {
        alert(data.message || "Failed to generate email draft. Please try again.");
      }
    } catch {
      alert("Unable to connect to the backend server. Make sure http://localhost:5000 is active.");
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = "Generate Email";
    }
  });

  // Copy draft to clipboard
  copyBtn?.addEventListener("click", async () => {
    if (!resultBox) return;
    const text = resultBox.textContent;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  });
});