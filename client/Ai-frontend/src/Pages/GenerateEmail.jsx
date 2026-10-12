import { useState } from "react";
import {
    Sparkles,
    Copy,
    Check,
    Mail,
    RefreshCw,
    Languages,
} from "lucide-react";
import api from "../Services/api";

function GenerateEmail() {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("Professional");
    const [language, setLanguage] = useState("English");
    const [length, setLength] = useState("Medium");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            alert("Please enter a topic");
            return;
        }

        try {
            setLoading(true);
            setEmail("");

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/email/generate-email",
                {
                    topic,
                    tone,
                    language,
                    length,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEmail(response.data.email.generatedEmail);
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Failed to generate email"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-600">
                        <Sparkles size={17} />
                        AI Writing Assistant
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Generate Email
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Describe what you need and MailKaro will create the email in your preferred language.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid gap-6 lg:grid-cols-2">

                    {/* Input Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                        {/* Card Header */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <Mail size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    Email details
                                </h2>

                                <p className="text-sm text-gray-500">
                                    What do you want to write?
                                </p>
                            </div>
                        </div>

                        {/* Topic */}
                        <label className="mt-7 mb-2 block text-sm font-medium text-gray-700">
                            Email topic
                        </label>

                        <textarea
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            maxLength={500}
                            rows={6}
                            placeholder="Example: Write a formal leave application for two days, or a polite follow-up after an interview..."
                            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                        />

                        {/* Character Count */}
                        <div className="mt-2 text-right text-xs text-gray-400">
                            {topic.length}/500
                        </div>

                        {/* Options: Language, Tone, Length */}
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
                                    <option value="Casual">Casual</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="Persuasive">Persuasive</option>
                                </select>
                            </div>

                            {/* Length */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Length
                                </label>

                                <select
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                >
                                    <option value="Short">Short</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Long">Long</option>
                                </select>
                            </div>

                        </div>

                        {/* Generate Button */}
                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={loading}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw
                                        size={17}
                                        className="animate-spin"
                                    />
                                    Generating Email...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={17} />
                                    Generate Email
                                </>
                            )}
                        </button>
                    </div>

                    {/* Result Card */}
                    <div className="flex min-h-[480px] flex-col rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {/* Result Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">

                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    Generated Email
                                </h2>

                                <p className="text-xs text-gray-500">
                                    AI generated content ({language})
                                </p>
                            </div>

                            {email && (
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                                >
                                    {copied ? (
                                        <>
                                            <Check size={16} className="text-green-600" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={16} />
                                            Copy
                                        </>
                                    )}
                                </button>
                            )}

                        </div>

                        {/* Result Content */}
                        <div className="flex-1 p-5 sm:p-6">

                            {loading ? (
                                <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                        <Sparkles
                                            size={25}
                                            className="animate-pulse"
                                        />
                                    </div>

                                    <h3 className="mt-5 font-semibold text-gray-900">
                                        AI is writing your email in {language}...
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Please wait a moment while MailKaro crafts your message.
                                    </p>

                                </div>
                            ) : email ? (
                                <div className="whitespace-pre-line text-sm leading-7 text-gray-700">
                                    {email}
                                </div>
                            ) : (
                                <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                        <Mail size={24} />
                                    </div>

                                    <h3 className="mt-5 font-semibold text-gray-900">
                                        Nothing generated yet
                                    </h3>

                                    <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                                        Enter your topic on the left, pick your language and tone, then click
                                        Generate Email.
                                    </p>

                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default GenerateEmail;