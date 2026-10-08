import { NOTE_COLORS } from '../const/notes';
import type { Note } from '../types/notes';

export const starterNotes: Note[] = [
  {
    id: 'starter-1',
    x: 76,
    y: 72,
    width: 250,
    height: 220,
    text: 'Start with the feeling.\n\nWhat should this week make room for?',
    color: NOTE_COLORS[0],
  },
  {
    id: 'starter-2',
    x: 390,
    y: 154,
    width: 250,
    height: 220,
    text: 'Small steps count.\n\nPick one thing and give it your full attention.',
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