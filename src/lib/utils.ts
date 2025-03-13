import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatYearMonth = (value: number) => {
  const years = Math.floor(value);
  const months = Math.round((value - years) * 12);
  return `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
};

/**
 * Generates a color code from a given string by hashing the string
 * and mapping it to a predefined list of color codes.
 *
 * @param {string} str - The input string to generate the color from.
 * @returns {string} A color code in hexadecimal format, selected from
 * a predefined list based on the hash of the input string.
 */

export const generateColorFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  hash = Math.abs(hash);

  const colors = [
    // Blues
    "#3498db",
    "#2980b9",
    "#1f618d",
    "#5dade2",
    "#2e86c1",
    // Greens
    "#2ecc71",
    "#27ae60",
    "#1e8449",
    "#58d68d",
    "#28b463",
    // Reds/Oranges
    "#e74c3c",
    "#c0392b",
    "#922b21",
    "#ec7063",
    "#e74c3c",
    // Purples
    "#9b59b6",
    "#8e44ad",
    "#6c3483",
    "#bb8fce",
    "#a569bd",
    // Yellows
    "#f1c40f",
    "#f39c12",
    "#b9770e",
    "#f7dc6f",
    "#f8c471",
    // Teals
    "#1abc9c",
    "#16a085",
    "#117a65",
    "#76d7c4",
    "#45b39d",
  ];

  const colorIndex = hash % colors.length;
  return colors[colorIndex];
};
