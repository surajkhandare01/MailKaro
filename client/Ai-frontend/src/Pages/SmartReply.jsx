import { useState } from "react";
import {
  Sparkles,
  Reply,
  Copy,
  Check,
  RefreshCw,
  Languages,
} from "lucide-react";
import api from "../Services/api";

function SmartReply() {
  const [incomingEmail, setIncomingEmail] = useState("");
  const [intent, setIntent] = useState("accept");
  const [tone, setTone] = useState("Professional");
  const [language, setLanguage] = useState("English");
  const [replies, setReplies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedType, setCopiedType] = useState("");

  const handleGenerateReply = async (e) => {
    e.preventDefault();
    if (!incomingEmail.trim()) {
      alert("Please paste the incoming email thread");
      return;
    }

    try {
      setLoading(true);
      setReplies(null);

      const token = localStorage.getItem("token");

      // Hits the controller endpoint with incomingEmail, intent, tone, and language
      const response = await api.post(
        "/email/smart-reply",
        {
          incomingEmail,
          intent,
          tone,
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReplies(response.data.replies);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to generate smart replies"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, type) => {
    await navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType("");
    }, 2000);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-600">
            <Sparkles size={17} />
            Contextual Smart Reply
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            AI Smart Reply
          </h1>

          <p className="mt-2 text-gray-500">
            Paste an incoming email thread and generate quick or detailed responses in English, Hindi, or Marathi.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Form Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Reply size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  Incoming email
                </h2>
                <p className="text-sm text-gray-500">
                  Paste the email you received
                </p>
              </div>
            </div>

            <label className="mt-6 mb-2 block text-sm font-medium text-gray-700">
              Email Thread / Message
            </label>
            <textarea
              value={incomingEmail}
              onChange={(e) => setIncomingEmail(e.target.value)}
              rows={6}
              placeholder="Paste the message here (e.g. Can we reschedule tomorrow's review meeting to 4 PM?)..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />

            {/* Selectors: Language, Intent, Tone */}
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {/* Language */}
              <div>
                <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700">
                  <Languages size={15} className="text-indigo-600" />
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                </select>
              </div>

              {/* Intent */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Your Intent
                </label>
                <select
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                >
                  <option value="accept">Accept / Agree</option>
                  <option value="decline">Politely Decline</option>
                  <option value="followup">Ask for Info</option>
                  <option value="reschedule">Reschedule</option>
                  <option value="acknowledge">Acknowledge</option>
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                >
                  <option value="Professional">Professional</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Formal">Formal</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleGenerateReply}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw size={17} className="animate-spin" />
                  Generating Responses in {language}...
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  Generate Smart Replies
                </>
              )}
            </button>
          </div>

          {/* Results Card */}
          <div className="flex flex-col gap-4">
            {/* Quick Reply Box */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Quick Reply (1-2 Sentences)
                </span>
                {replies?.quickReply && (
                  <button
                    onClick={() => handleCopy(replies.quickReply, "quick")}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    {copiedType === "quick" ? (
                      <>
                        <Check size={13} className="text-green-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="mt-3 min-h-[70px] text-sm leading-relaxed text-gray-700">
                {loading ? (
                  <p className="animate-pulse text-gray-400">Crafting short reply...</p>
                ) : replies?.quickReply ? (
                  replies.quickReply
                ) : (
                  <p className="text-gray-400">Your concise reply will appear here.</p>
                )}
              </div>
            </div>

            {/* Detailed Reply Box */}
            <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Detailed & Formal Reply
                </span>
                {replies?.detailedReply && (
                  <button
                    onClick={() => handleCopy(replies.detailedReply, "detailed")}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    {copiedType === "detailed" ? (
                      <>
                        <Check size={13} className="text-green-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="mt-3 min-h-[140px] whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {loading ? (
                  <p className="animate-pulse text-gray-400">Crafting detailed message...</p>
                ) : replies?.detailedReply ? (
                  replies.detailedReply
                ) : (
                  <p className="text-gray-400">Your structured, full reply will appear here.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SmartReply;