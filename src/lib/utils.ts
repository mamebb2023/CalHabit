import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateName(name: string): boolean {
  // Name must be between 3 and 20 characters
  return name.length >= 2 && name.length <= 20;
}

export function validateEmail(email: string): boolean {
  // Email must be a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  // Password must be between 8 and 20 characters
  const passwordRegex = /^.{8,20}$/;
  return passwordRegex.test(password);
}