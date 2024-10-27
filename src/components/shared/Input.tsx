import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`bg-transparent outline-none focus:outline-none py-2 px-5 rounded-xl placeholder:text-[var(--color-primary-opacity)] ${className}`}
      {...props}
    />
  );
};

export default Input;
