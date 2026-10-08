import { STORAGE_KEY } from '../const/notesConst';
import type { Note } from '../types/notesTypes';

export function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    // The board remains usable when browser storage is unavailable.
  }
}