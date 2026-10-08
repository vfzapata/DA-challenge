import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import type { Note } from '../types/notesTypes'
import { STORAGE_KEY } from '../const/notesConst'
import { saveNotes } from './saveNotes'

const notes: Note[] = [
  {
    id: 'note-1',
    x: 12,
    y: 34,
    width: 250,
    height: 220,
    text: 'Remember this',
    color: '#f3d66b',
  },
]

describe('saveNotes', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('stores notes as JSON under the notes storage key', () => {
    saveNotes(notes)

    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(notes))
  })

  it('does not throw if writing to storage fails', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable')
    })

    expect(() => saveNotes(notes)).not.toThrow()
  })
})