import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-5 py-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-black/20";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white hover:opacity-90 active:opacity-80 shadow-xl  hover:shadow-2x hover:scale-105",
    outline:
      "border border-gray-300 text-gray-900 hover:bg-gray-50 active:bg-gray-100 bg-white",
    ghost:
      "text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
