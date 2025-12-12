import axios from "axios";

export const http = axios.create({
    baseURL: "/",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    withCredentials: true, // обязательно, для cookie
});

export const getCsrfCookie = async () => {
    await axios.get("/sanctum/csrf-cookie");
};
