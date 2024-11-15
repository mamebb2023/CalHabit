import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const getDaysForMonth = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const firstWeekday = firstDay === 0 ? 6 : firstDay - 1;

  return Array.from({ length: firstWeekday })
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
};

export function getLastTwoDigits(string: string): string {
  return string.slice(-2);
}

// Function to decode the token
export function verifyToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
}

type User = { _id: string; name: string; email: string };

export function getUserFromToken(): User | null {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    return jwtDecode<User>(token);
  } catch (error) {
    console.error("Error retrieving or decoding token:", error);
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
}
