import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo - 1st M Design (Message Box to M + Dual Fold) */}
        <Link to="/" className="flex items-center gap-2.5">
          <svg
            className="h-9 w-9"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="nav_mBadgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="55%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>

              <linearGradient id="nav_mFoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E0E7FF" />
              </linearGradient>
            </defs>

            {/* Squircle Background Badge */}
            <rect x="12" y="12" width="96" height="96" rx="28" fill="url(#nav_mBadgeBg)" />
            <rect x="13.5" y="13.5" width="93" height="93" rx="26.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="1.5" />

            {/* Outer Message Box Shape */}
            <rect x="25" y="40" width="70" height="48" rx="10" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeWidth="4.5" strokeLinejoin="round" />

            {/* Primary "M" Fold Path */}
            <path
              d="M 27 84 L 27 44 L 60 71 L 93 44 L 93 84"
              fill="none"
              stroke="url(#nav_mFoldGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner V-Fold Accent Line */}
            <path
              d="M 37 44 L 60 63 L 83 44"
              fill="none"
              stroke="#C7D2FE"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Amber AI Sparkle */}
            <path
              d="M 88 18 C 88 26.5 92.5 31 101 31 C 92.5 31 88 35.5 88 44 C 88 35.5 83.5 31 75 31 C 83.5 31 88 26.5 88 18 Z"
              fill="#FBBF24"
            />
            <circle cx="88" cy="31" r="3" fill="#FFFFFF" />
            <circle cx="97" cy="19" r="1.8" fill="#FDE68A" />
          </svg>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Mail<span className="text-indigo-600">Karo</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                Dashboard
              </Link>

              <Link
                to="/generateEmail"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                Generate
              </Link>

              <Link
                to="/smart-reply"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                Smart Reply
              </Link>

              <Link
                to="/history"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                History
              </Link>

              <button
                onClick={handleLogout}
                className="ml-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-2 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>

            {token ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Dashboard
                </Link>

                <Link
                  to="/generateEmail"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Generate
                </Link>

                <Link
                  to="/smart-reply"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Smart Reply
                </Link>

                <Link
                  to="/history"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  History
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-1 w-full rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;