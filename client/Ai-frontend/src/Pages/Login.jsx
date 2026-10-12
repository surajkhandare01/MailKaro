import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import api from "../Services/api";
import { AuthContext } from "../context/AuthContext";

// chrome://extensions वर दिसणारी तुमची ३२-अक्षरी ID इथे पेस्ट करा
const EXTENSION_ID = "filcmkfjngmidpakaocpponeececeajl";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const token = response.data.token;

            // 1. Context आणि Web LocalStorage अपडेट करा
            setToken(token);
            localStorage.setItem("token", token);
            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }

            // 2. Chrome Extension कडे टोकन ऑटो-सिंक करा
            if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
                try {
                    chrome.runtime.sendMessage(
                        EXTENSION_ID,
                        { action: "SET_TOKEN", token: token },
                        (res) => {
                            if (chrome.runtime.lastError) {
                                console.warn("Extension sync notice:", chrome.runtime.lastError.message);
                            } else {
                                console.log("Token synced to extension successfully:", res);
                            }
                        }
                    );
                } catch (extErr) {
                    console.warn("Could not sync with extension:", extErr);
                }
            }

            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to login. Please check your details."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md">

                <div className="mb-8 text-center">
                    {/* MailKaro Brand SVG Logo */}
                    <div className="mx-auto flex justify-center">
                        <Link className="inline-block transition hover:opacity-90" to="/">
                            <svg className="h-14 w-14" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="reg_mBadgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#4F46E5"></stop>
                                        <stop offset="55%" stopColor="#6366F1"></stop>
                                        <stop offset="100%" stopColor="#7C3AED"></stop>
                                    </linearGradient>
                                    <linearGradient id="reg_mFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FFFFFF"></stop>
                                        <stop offset="100%" stopColor="#E0E7FF"></stop>
                                    </linearGradient>
                                </defs>
                                <rect x="12" y="12" width="96" height="96" rx="28" fill="url(#reg_mBadgeBg)"></rect>
                                <rect x="13.5" y="13.5" width="93" height="93" rx="26.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="1.5"></rect>
                                <rect x="25" y="40" width="70" height="48" rx="10" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeWidth="4.5" strokeLinejoin="round"></rect>
                                <path d="M 27 84 L 27 44 L 60 71 L 93 44 L 93 84" fill="none" stroke="url(#reg_mFoldGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M 37 44 L 60 63 L 83 44" fill="none" stroke="#C7D2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"></path>
                                <path d="M 88 18 C 88 26.5 92.5 31 101 31 C 92.5 31 88 35.5 88 44 C 88 35.5 83.5 31 75 31 C 83.5 31 88 26.5 88 18 Z" fill="#FBBF24"></path>
                                <circle cx="88" cy="31" r="3" fill="#FFFFFF"></circle>
                                <circle cx="97" cy="19" r="1.8" fill="#FDE68A"></circle>
                            </svg>
                        </Link>
                    </div>

                    <h1 className="mt-5 text-2xl font-bold text-gray-900">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to continue to MailKaro
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >
                    {error && (
                        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email address
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="password"
                                required
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                        {!loading && <ArrowRight size={17} />}
                    </button>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            Create one
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );
}

export default Login;