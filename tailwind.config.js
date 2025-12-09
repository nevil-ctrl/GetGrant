/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.js",
        "./resources/**/*.ts",
        "./resources/**/*.jsx",
        "./resources/**/*.tsx",
        "./resources/**/*.blade.php",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                border: "var(--border)",
                ring: "var(--ring)",
            },
        },
    },
    plugins: [],
};
