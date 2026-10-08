export type NoteSize = 'small' | 'medium' | 'large'

export const NOTE_SIZES: Record<NoteSize, { width: number; height: number }> = {
  small: { width: 200, height: 180 },
  medium: { width: 250, height: 220 },
  large: { width: 300, height: 270 },
}