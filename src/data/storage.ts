import { NOTE_COLORS } from '../const/notesConst';
import type { Note } from '../types/notesTypes';

export const starterNotes: Note[] = [
  {
    id: 'starter-1',
    x: 76,
    y: 72,
    width: 250,
    height: 220,
    text: 'Task one.\n\nWhat should this week make room for?',
    color: NOTE_COLORS[0],
  },
  {
    id: 'starter-2',
    x: 390,
    y: 154,
    width: 250,
    height: 220,
    text: 'Task two.\n\nWhat is one small step you can take today?',
    color: NOTE_COLORS[2],
  },
  {
    id: 'starter-3',
    x: 640,
    y: 54,
    width: 250,
    height: 220,
    text: 'A thought to keep close:',
    color: NOTE_COLORS[1],
  },
]