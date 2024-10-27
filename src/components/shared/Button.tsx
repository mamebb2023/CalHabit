import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={`px-7 py-2 bg-color-primary text-color-tertiary hover:text-color-primary hover:bg-transparent border border-color-primary transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
