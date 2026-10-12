// Background Service Worker

// 1. Listen for messages directly from the Vercel Web App
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (request.action === "SET_TOKEN" && request.token) {
    chrome.storage.local.set({ token: request.token }, () => {
      console.log("✅ [MailKaro] Token successfully saved from Web App!");
      sendResponse({ status: "success", message: "Token stored" });
    });
    return true; // Keep message channel open for async response
  }
});

// 2. Open login page when requested by Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "OPEN_LOGIN_TAB") {
    chrome.tabs.create({ url: "https://mailkaro.vercel.app/#/login" });
    sendResponse({ status: "opened" });
  }
  return true;
});