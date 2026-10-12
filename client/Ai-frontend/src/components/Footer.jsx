import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/surajkhandare01/",
      hoverStyle:
        "hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md",
      icon: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/surajkhandare01",
      hoverStyle:
        "hover:-translate-y-1 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md",
      icon: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      hoverStyle:
        "hover:-translate-y-1 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600 hover:shadow-md",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Exact Navbar Logo & Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <svg
            className="h-9 w-9"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="footer_mBadgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="55%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>

              <linearGradient id="footer_mFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E0E7FF" />
              </linearGradient>
            </defs>

            {/* Rounded Badge Base */}
            <rect width="120" height="120" rx="34" fill="url(#footer_mBadgeBg)" />

            {/* Subtle Inner Glow */}
            <rect
              x="2"
              y="2"
              width="116"
              height="116"
              rx="32"
              stroke="#FFFFFF"
              strokeOpacity="0.18"
              strokeWidth="3"
            />

            {/* Outer Envelope Border */}
            <rect
              x="22"
              y="32"
              width="76"
              height="56"
              rx="14"
              stroke="#FFFFFF"
              strokeWidth="7"
            />

            {/* Bottom Inner Envelope Fill */}
            <path
              d="M26 44L56.5 66.8C58.6 68.4 61.4 68.4 63.5 66.8L94 44V74C94 79.5 89.5 84 84 84H36C30.5 84 26 79.5 26 74V44Z"
              fill="#FFFFFF"
              fillOpacity="0.15"
            />

            {/* Top Primary Fold */}
            <path
              d="M26 39L55.8 62.4C58.3 64.3 61.7 64.3 64.2 62.4L94 39"
              stroke="url(#footer_mFoldGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner Accent Fold Line */}
            <path
              d="M36 43L56.6 59.2C58.6 60.8 61.4 60.8 63.4 59.2L84 43"
              stroke="#FFFFFF"
              strokeOpacity="0.45"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* AI Sparkle Star */}
            <path
              d="M93 25C93 30.5 97.5 35 103 35C97.5 35 93 39.5 93 45C93 39.5 88.5 35 83 35C88.5 35 93 30.5 93 25Z"
              fill="#FBBF24"
            />
            {/* Small Sparkle Star */}
            <path
              d="M102 18C102 20.2 103.8 22 106 22C103.8 22 102 23.8 102 26C102 23.8 100.2 22 98 22C100.2 22 102 20.2 102 18Z"
              fill="#FDE68A"
            />
          </svg>

          <span className="text-lg font-bold tracking-tight text-gray-900">
            Mail<span className="text-indigo-600">Karo</span>
          </span>
        </Link>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-300 ${item.hoverStyle}`}
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} MailKaro. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;