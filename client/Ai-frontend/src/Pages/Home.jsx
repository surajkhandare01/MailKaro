import { Link } from "react-router-dom";
import {
    Sparkles,
    Mail,
    ShieldCheck,
    ArrowRight,
    Reply,
    Sliders,
    Languages,
} from "lucide-react";

function Home() {
    return (
        <main className="overflow-hidden bg-white">

            {/* Hero */}
            <section className="relative">
                <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-indigo-50 via-white to-white" />

                <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28">

                    <div className="mx-auto max-w-4xl text-center">

                        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
                            <Sparkles size={15} />
                            AI-powered email writing
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Write better emails
                            <span className="block text-indigo-600">
                                in seconds, not minutes.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                            MailKaro helps you create professional,
                            clear and effective emails without struggling
                            over every sentence.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
                            >
                                Start Writing
                                <ArrowRight size={17} />
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl shadow-gray-200/70 sm:mt-20">
                        <div className="rounded-xl bg-gray-50 p-4 sm:p-6">

                            <div className="grid gap-5 lg:grid-cols-2">

                                <div className="rounded-xl border border-gray-200 bg-white p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                            <Mail size={17} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Email 
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        AI Generated Email
                                    </p>

                                    <h3 className="mt-3 font-semibold text-gray-900">
                                        Thank you for the interview
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-gray-600">
                                        Dear Hiring Manager,
                                        <br /><br />
                                        Thank you for taking the time to
                                        speak with me about the opportunity.
                                        I enjoyed learning more about the
                                        role and your team.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - Symmetrical 3x2 Grid */}
            <section className="border-t border-gray-100 bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold text-indigo-600">
                            SIMPLE & POWERFUL
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                            Everything you need to write better
                        </h2>
                    </div>

                    {/* Clean 3x2 Grid */}
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Card 1 */}
                        <Feature
                            icon={<Sparkles size={21} />}
                            title="AI-powered writing"
                            text="Turn a simple topic into a professional email with AI."
                        />

                        {/* Card 2 - Multi-language support */}
                        <Feature
                            icon={<Languages size={21} />}
                            title="Multi-language support"
                            text="Draft and reply effortlessly in English, Hindi, and Marathi."
                        />

                        {/* Card 3 */}
                        <Feature
                            icon={<ShieldCheck size={21} />}
                            title="Your email history"
                            text="Keep your generated emails organized and accessible."
                        />

                        {/* Card 4 */}
                        <Feature
                            icon={<Reply size={21} />}
                            title="Smart reply"
                            text="Generate instant, context-aware replies tailored to incoming threads."
                        />

                        {/* Card 5 */}
                        <Feature
                            icon={
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="12" r="4" />
                                    <line x1="21.17" y1="8" x2="12" y2="8" />
                                    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                                    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                                </svg>
                            }
                            title="Chrome extension"
                            text="Draft and reply directly inside Gmail without leaving your inbox."
                        />

                        {/* Card 6 */}
                        <Feature
                            icon={<Sliders size={21} />}
                            title="Custom tone selection"
                            text="Choose between formal, friendly, persuasive, or urgent tones with one click."
                        />

                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-900 py-20">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <Sparkles className="mx-auto text-indigo-400" size={28} />

                    <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                        Ready to write your next email?
                    </h2>

                    <p className="mt-4 text-gray-400">
                        Start creating professional emails with MailKaro today.
                    </p>

                    <Link
                        to="/register"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                    >
                        Get Started
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </section>
        </main>
    );
}

function Feature({ icon, title, text }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                {icon}
            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {text}
            </p>
        </div>
    );
}

export default Home;