import { starterNotes } from '../data/storage';
import type { Note } from '../types/notesTypes';
import { STORAGE_KEY } from '../const/notesConst';

export function loadNotes(): Note[] {
  try {
    const storedNotes = localStorage.getItem(STORAGE_KEY)
    if (!storedNotes) return starterNotes

    const parsed: unknown = JSON.parse(storedNotes)
    if (!Array.isArray(parsed)) return starterNotes

    return parsed.filter(
      (note): note is Note =>
        typeof note.id === 'string' &&
        typeof note.x === 'number' &&
        typeof note.y === 'number' &&
        typeof note.width === 'number' &&
        typeof note.height === 'number' &&
        typeof note.text === 'string' &&
        typeof note.color === 'string',
    )
  } catch {
    return starterNotes
  }
}