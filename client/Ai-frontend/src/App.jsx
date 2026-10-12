import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import GenerateEmail from "./Pages/GenerateEmail";
import SmartReply from "./Pages/SmartReply";
import Dashboard from "./Pages/Dashboard";
import History from "./Pages/History";
import Logout from "./Pages/Logout";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/generateEmail"
                        element={
                            <ProtectedRoute>
                                <GenerateEmail />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/smart-reply"
                        element={
                            <ProtectedRoute>
                                <SmartReply />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute>
                                <History />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;