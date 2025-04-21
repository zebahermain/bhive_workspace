// src/utils/helpers.ts
import { format, parse, isValid } from 'date-fns';

/**
 * Format a date string to a more readable format
 * @param dateString - Date string in 'yyyy-MM-dd' format
 * @returns Formatted date string (e.g., 'April 20, 2025')
 */
export const formatDateString = (dateString: string): string => {
  try {
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    if (!isValid(date)) {
      return dateString;
    }
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format price with currency symbol
 * @param price - Price as a number
 * @returns Formatted price string (e.g., '$25')
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Truncate text if it's longer than a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Generate a slugified version of a string for URLs
 * @param text - Text to slugify
 * @returns Slugified text
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};