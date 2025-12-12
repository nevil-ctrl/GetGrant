import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./bootstrap";
import "../css/app.css";

console.log("🚀 main.tsx loading...");

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

console.log("✅ React app rendered");
