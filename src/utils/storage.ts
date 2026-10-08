/**
 * Local Storage Utilities for Osteoarthritis Screening Results
 * Stores records securely client-side in the user's browser.
 * 
 * NOTE: As per regulatory & clinical audit requirements, data deletion
 * has been permanently removed. Screening records are immutable and
 * preserved indefinitely for clinical evaluation and continuity.
 */

import { ScreeningResult } from '../types/screening';

const STORAGE_KEY = 'oa_screening_history_v1';

export function getStoredScreenings(): ScreeningResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse screening history from localStorage:', err);
    return [];
  }
}

export function saveScreeningResult(result: ScreeningResult): void {
  try {
    const history = getStoredScreenings();
    // Prepend new result while preserving all previous entries permanently
    const updated = [result, ...history.filter((item) => item.id !== result.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save screening result to localStorage:', err);
  }
}
