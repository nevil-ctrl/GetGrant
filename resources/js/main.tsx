import React from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap";
import App from "./App";
import { AuthProvider } from "./auth/AuthProvider";
import "../css/app.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
