import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility to merge Tailwind classes with conflict resolution.
 * Re-exported from shared for template-level imports.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
