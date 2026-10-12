// Background Service Worker for MailKaro Extension

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "OPEN_LOGIN_TAB") {
    // Vercel वर डिप्लॉय केलेल्या फ्रंटएंडची लॉगिन URL
    const LOGIN_URL = "https://mailkaro.vercel.app/#/login";

    chrome.tabs.create({
      url: LOGIN_URL,
      active: true,
    });

    // खात्रीसाठी रिस्पॉन्स पाठवा
    sendResponse({ status: "Opening login tab", url: LOGIN_URL });
  }
  
  return true; // asynchronous response साठी
});