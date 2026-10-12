import { useEffect, useState } from "react";
import {
    Mail,
    Pencil,
    Trash2,
    Save,
    X,
    History as HistoryIcon,
} from "lucide-react";
import api from "../Services/api";

function History() {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editedEmail, setEditedEmail] = useState("");

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/email/history", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEmails(response.data.emails);
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Failed to load email history"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/email/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEmails((current) =>
                current.filter((email) => email._id !== id)
            );
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Failed to delete email"
            );
        }
    };

    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.put(
                `/email/${id}`,
                { generatedEmail: editedEmail },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEmails((current) =>
                current.map((email) =>
                    email._id === id
                        ? response.data.email
                        : email
                )
            );

            setEditingId(null);
            setEditedEmail("");
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Failed to update email"
            );
        }
    };

    if (loading) {
        return (
            <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-10">
                <div className="mx-auto max-w-5xl">
                    <div className="animate-pulse space-y-5">
                        <div className="h-8 w-48 rounded bg-gray-200" />
                        <div className="h-40 rounded-2xl bg-gray-200" />
                        <div className="h-40 rounded-2xl bg-gray-200" />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-600">
                        <HistoryIcon size={17} />
                        Your activity
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Email History
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View and manage your previously generated emails.
                    </p>
                </div>

                {emails.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                            <Mail size={24} />
                        </div>

                        <h2 className="mt-5 font-semibold text-gray-900">
                            No emails yet
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Your generated emails will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {emails.map((email) => (
                            <div
                                key={email._id}
                                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                    <div className="flex min-w-0 gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                            <Mail size={18} />
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate font-semibold text-gray-900">
                                                {email.topic}
                                            </h2>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Generated email
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {editingId === email._id ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleUpdate(email._id)
                                                    }
                                                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                                                >
                                                    <Save size={14} />
                                                    Save
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditedEmail("");
                                                    }}
                                                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                                                >
                                                    <X size={14} />
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(email._id);
                                                        setEditedEmail(
                                                            email.generatedEmail
                                                        );
                                                    }}
                                                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                                                >
                                                    <Pencil size={14} />
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(email._id)
                                                    }
                                                    className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50"
                                                >
                                                    <Trash2 size={14} />
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {editingId === email._id ? (
                                    <textarea
                                        value={editedEmail}
                                        onChange={(e) =>
                                            setEditedEmail(e.target.value)
                                        }
                                        rows={8}
                                        className="mt-5 w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-7 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                    />
                                ) : (
                                    <div className="mt-5 whitespace-pre-line rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-600">
                                        {email.generatedEmail}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default History;