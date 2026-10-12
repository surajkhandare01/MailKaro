import axios from "axios";

const api = axios.create({
    baseURL: "https://mailkaro.onrender.com",
});

// Automatically attach JWT token from localStorage to every outgoing request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Smart Reply API function
export const generateSmartReplyAPI = (payload) => {
    return api.post("/email/smart-reply", payload);
};

export default api;