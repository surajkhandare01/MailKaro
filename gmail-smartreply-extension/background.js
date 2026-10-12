chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "OPEN_LOGIN_TAB") {
    chrome.tabs.create({ url: "http://localhost:5173/login" });
  }
});