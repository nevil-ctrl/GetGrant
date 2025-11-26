const authService = {
    isAuthenticated: (): boolean => {
        return (window as any).Laravel?.auth || false;
    },

    getUser: () => {
        return (window as any).Laravel?.user || null;
    },

    logout: async () => {
        await fetch("/logout", { method: "POST", credentials: "include" });
        window.location.href = "/";
    },
};

export default authService;
