import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// chrome://extensions वरील तुमची ३२-अक्षरी ID इथे टाका
const EXTENSION_ID = "YOUR_ACTUAL_EXTENSION_ID_HERE";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://mailkaro.onrender.com/api/auth/login",
        { email, password }
      );

      const token = response.data.token;

      // 1. वेब ब्राउझरच्या लोकल स्टोरेजमध्ये टोकन सेव्ह करा
      localStorage.setItem("token", token);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // 2. Chrome Extension ला पार्श्वभूमीत टोकन पाठवा
      if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
        try {
          chrome.runtime.sendMessage(
            EXTENSION_ID,
            { action: "SET_TOKEN", token: token },
            (res) => {
              if (chrome.runtime.lastError) {
                console.warn("Extension sync info:", chrome.runtime.lastError.message);
              } else {
                console.log("Token synced to MailKaro extension:", res);
              }
            }
          );
        } catch (extErr) {
          console.warn("Could not sync with extension:", extErr);
        }
      }

      // 3. डॅशबोर्डवर रिडायरेक्ट करा
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center bg-gray-50/50 px-4 py-12">
      {/* MailKaro Logo with Sparkle Icon */}
      <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4f46e5] shadow-md shadow-indigo-100">
        <svg
          className="h-8 w-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        {/* Top-Right Sparkle */}
        <span className="absolute -top-1.5 -right-1.5 text-amber-300 text-xs font-bold select-none drop-shadow-sm">
          ✦
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Sign in to continue to MailKaro
      </p>

      {/* Login Card */}
      <div className="mt-8 w-full max-w-[430px] rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-100 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Address */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4338ca] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3730a3] active:scale-[0.99] disabled:opacity-50"
          >
            <span>{loading ? "Signing In..." : "Sign In"}</span>
            {!loading && <span className="text-base leading-none">&rarr;</span>}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-7 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#4f46e5] hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}