import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { starterNotes } from '../data/storage'
import { STORAGE_KEY } from '../const/notesConst'
import { loadNotes } from './loadNotes'

describe('loadNotes', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns starter notes when storage is empty', () => {
    expect(loadNotes()).toEqual(starterNotes)
  })

  it('loads valid notes from storage and ignores invalid entries', () => {
    const storedNotes = [
      { id: 'saved-1', x: 1, y: 2, width: 250, height: 220, text: 'Saved', color: '#abc' },
      { id: 'invalid', x: '1', y: 2, width: 250, height: 220, text: 'Bad', color: '#abc' },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedNotes))

    expect(loadNotes()).toEqual([storedNotes[0]])
  })

  it('returns starter notes for malformed JSON or a non-array value', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid json')
    expect(loadNotes()).toEqual(starterNotes)

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'not-an-array' }))
    expect(loadNotes()).toEqual(starterNotes)
  })

  it('returns starter notes if reading storage throws', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage unavailable')
    })

    expect(loadNotes()).toEqual(starterNotes)
  })
})