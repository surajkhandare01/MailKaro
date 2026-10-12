import { useEffect, useState } from "react";
import {
    Sparkles,
    Mail,
    History,
    FileText,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../Services/api";

function Dashboard() {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/email/history", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEmails(response.data.emails || []);
        } catch (error) {
            console.log("Dashboard history error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const generatedCount = emails.length;

    const recentEmails = emails.slice(0, 3);

    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-600">
                        <Sparkles size={17} />
                        AI Email Assistant
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Create professional emails with MailKaro
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                        Generate professional emails quickly with the help
                        of MailKaro.
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Welcome / Generate Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <Sparkles size={22} />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-gray-900">
                            Generate your next email
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                            Enter a topic, describe what you need, and let MailKaro
                            create a clear and professional email for you.
                        </p>

                        <Link
                                    to="/generateEmail"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            <Sparkles size={17} />
                            Generate Email
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    {/* Current Activity */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Current Activity
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    Your email activity
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FileText size={19} />
                            </div>
                        </div>

                        <div className="mt-5 rounded-xl bg-gray-50 p-4">
                            <p className="text-xs font-medium text-gray-500">
                                Emails Generated
                            </p>

                            {loading ? (
                                <div className="mt-2 h-8 w-12 animate-pulse rounded-lg bg-gray-200" />
                            ) : (
                                <p className="mt-1 text-3xl font-bold text-gray-900">
                                    {generatedCount}
                                </p>
                            )}

                            <p className="mt-1 text-xs text-gray-500">
                                Total emails created with AI
                            </p>
                        </div>

                        <Link
                            to="/history"
                            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <History size={16} />
                            View History
                        </Link>
                    </div>
                </div>

                {/* Recent Emails */}
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Recent Emails
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Your latest generated emails
                            </p>
                        </div>

                        <History
                            size={20}
                            className="text-gray-400"
                        />
                    </div>

                    {loading ? (
                        <div className="mt-5 space-y-3">
                            <div className="h-16 animate-pulse rounded-xl bg-gray-100" />
                            <div className="h-16 animate-pulse rounded-xl bg-gray-100" />
                            <div className="h-16 animate-pulse rounded-xl bg-gray-100" />
                        </div>
                    ) : recentEmails.length === 0 ? (

                        <div className="mt-5 rounded-xl bg-gray-50 px-5 py-10 text-center">

                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm">
                                <Mail size={20} />
                            </div>

                            <h3 className="mt-4 text-sm font-semibold text-gray-900">
                                No emails generated yet
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Generate your first AI email to see it here.
                            </p>

                            <Link
                                to="/generate"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                            >
                                Generate Email
                                <ArrowRight size={15} />
                            </Link>

                        </div>

                    ) : (

                        <div className="mt-5 space-y-3">

                            {recentEmails.map((email) => (

                                <div
                                    key={email._id}
                                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50 sm:p-4"
                                >

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                        <Mail size={17} />
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {email.topic}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {new Date(
                                                email.createdAt
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                    {emails.length > 3 && (
                        <div className="mt-5 text-center">
                            <Link
                                to="/history"
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                            >
                                View all emails →
                            </Link>
                        </div>
                    )}

                </div>

                {/* AI Tip */}
                <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">

                    <div className="flex gap-3">

                        <Sparkles
                            size={20}
                            className="mt-0.5 shrink-0 text-indigo-600"
                        />

                        <div>
                            <h3 className="text-sm font-semibold text-indigo-900">
                                AI Writing Tip
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-indigo-700">
                                Include the purpose, recipient, and important
                                details in your prompt for a better email.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default Dashboard;