// extension/authSync.js
function syncAuthToken() {
  // १. थेट "token" किंवा "userToken" तपासणे
  let token = localStorage.getItem("token") || localStorage.getItem("userToken");

  // २. जर युझर ऑब्जेक्टमध्ये token असेल (उदा. { user: { token: '...' } })
  if (!token) {
    try {
      const userObj = JSON.parse(localStorage.getItem("user") || "{}");
      if (userObj.token) {
        token = userObj.token;
      }
    } catch (e) {
      // JSON parse error ignore करा
    }
  }

  if (token) {
    chrome.storage.local.set({ token }, () => {
      console.log("✅ [MailKaro] Auth Token Synced to Extension Storage!");
    });
  }
}

// पेज लोड झाल्यावर लगेच सिंक करा
syncAuthToken();

// स्टोरेजमध्ये बदल झाल्यास (उदा. युझरने आत्ताच लॉगिन केल्यास) लगेच सिंक करा
window.addEventListener("storage", syncAuthToken);
setInterval(syncAuthToken, 2000);