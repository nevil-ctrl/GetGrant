import React from "react";
import { cn } from "../lib/utils";

interface GetGrantButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
}

const GetGrantButton = React.forwardRef<HTMLButtonElement, GetGrantButtonProps>(
    (
        { variant = "primary", size = "md", className, children, ...props },
        ref
    ) => {
        const baseStyles = "px-4 py-2 rounded font-medium transition-colors";

        const variants: Record<string, string> = {
            primary: "bg-blue-500 text-white hover:bg-blue-600",
            ghost: "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100",
            outline: "bg-white text-black border border-black hover:bg-gray-50",
        };

        const sizes: Record<string, string> = {
            sm: "text-sm px-3 py-1",
            md: "text-base px-4 py-2",
            lg: "text-lg px-5 py-3",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

GetGrantButton.displayName = "GetGrantButton";

export { GetGrantButton };
