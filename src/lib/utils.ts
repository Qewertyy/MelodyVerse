import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validatePassword(password : string) : { valid: boolean, errors: string[] | null } {
  const errors = [];
  if (!/^.{8,20}$/.test(password)) {
    errors.push("Minimum 8 and maximum 20 characters");
  };
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("At least one uppercase character");
  };
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("At least one lowercase character");
  };
  if (!/(?=.*\d)/.test(password)) {
    errors.push("At least one digit");
  };
  if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(password)) {
    errors.push("At least one special character");
  };
  const valid = errors.length === 0;
  if (!valid) {
    errors.push("Password is invalid");
  };
  return {
    valid,
    errors: valid ? null : errors,
  };
};

export function validateUsername(username: string): {
  valid: boolean;
  errors: string[] | null;
} {
  const errors: string[] = [];

  if (username.length > 25) {
    errors.push("Must not exceed 25 characters");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push("Can only contain letters, numbers, and underscores");
  };

  const valid = errors.length === 0;
  if (!valid) {
    errors.push("Username is invalid.");
  };
  return {
    valid,
    errors: valid ? null : errors,
  };
};
