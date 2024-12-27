import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`bg-transparent bg-glass-gradient outline-none focus:outline-none py-2 px-5 rounded-xl placeholder:text-[var(--color-primary-opacity)] ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
