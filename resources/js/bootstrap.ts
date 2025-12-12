import axios from "axios";

declare global {
    interface Window {
        axios: typeof axios;
    }
}

window.axios = axios;

// ========================================
// КРИТИЧЕСКИ ВАЖНЫЕ НАСТРОЙКИ ДЛЯ SANCTUM
// ========================================

// 1. Включаем отправку cookies (для CSRF и сессий)
window.axios.defaults.withCredentials = true;

// 2. Базовый URL вашего Laravel backend
window.axios.defaults.baseURL = "http://127.0.0.1:8000";

// 3. Заголовки для AJAX запросов
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.headers.common["Accept"] = "application/json";

// 4. Перехват ошибок 401 (неавторизован)
window.axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Если не на странице логина - редирект
            if (!window.location.pathname.includes("/auth/login")) {
                window.location.href = "/auth/login";
            }
        }
        return Promise.reject(error);
    }
);

// Для отладки
console.log("🚀 Axios configured:", {
    baseURL: window.axios.defaults.baseURL,
    withCredentials: window.axios.defaults.withCredentials,
});
