import { STORAGE_KEY } from '../const/notes';
import type { Note } from '../types/notes';

export function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    // The board remains usable when browser storage is unavailable.
  }
}