import type { NoteSize } from "../types/notesTypes";

export const NOTE_COLORS = ['#f3d66b', '#ef927d', '#9fcbb9', '#b7c7e5'];

export const STORAGE_KEY = 'board.notes.v1';

export const NOTE_SIZES: Record<NoteSize, { width: number; height: number }> = {
  small: { width: 200, height: 180 },
  medium: { width: 250, height: 220 },
  large: { width: 300, height: 270 },
}