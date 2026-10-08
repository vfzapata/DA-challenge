import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/jest-globals'
import { describe, expect, it } from '@jest/globals'
import type { Note } from '../../types/notesTypes'
import { NOTE_COLORS } from '../../const/notesConst'
import NotesBoard from './NotesBoard'

const initialNotes: Note[] = [
  {
    id: 'note-1',
    x: 10,
    y: 20,
    width: 250,
    height: 220,
    text: 'Initial thought',
    color: NOTE_COLORS[0],
  },
]

function NotesBoardHarness({ notes: initialValue = initialNotes }: { notes?: Note[] }) {
  const [notes, setNotes] = useState(initialValue)
  return <NotesBoard notes={notes} setNotes={setNotes} />
}

function setBoardBounds(board: HTMLElement) {
  Object.defineProperty(board, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      x: 10,
      y: 20,
      left: 10,
      top: 20,
      right: 810,
      bottom: 620,
      width: 800,
      height: 600,
      toJSON: () => ({}),
    }),
  })
}

describe('NotesBoard', () => {
  it('shows the empty-board message when there are no notes', () => {
    render(<NotesBoardHarness notes={[]} />)

    expect(screen.getByText('Your board is clear.')).toBeInTheDocument()
    expect(screen.getByText('Choose a size, then place your first note.')).toBeInTheDocument()
  })

  it('edits and deletes a note', () => {
    render(<NotesBoardHarness />)

    const editor = screen.getByRole('textbox', { name: 'Note text' })
    fireEvent.change(editor, { target: { value: 'Updated thought' } })
    expect(editor).toHaveValue('Updated thought')
    expect(screen.getByText('15 CHARS')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Delete note' }))
    expect(screen.queryByRole('textbox', { name: 'Note text' })).not.toBeInTheDocument()
    expect(screen.getByText('Your board is clear.')).toBeInTheDocument()
  })

  it('places a default-sized note on the board', () => {
    const { container } = render(<NotesBoardHarness notes={[]} />)
    const board = container.querySelector<HTMLElement>('#board')
    expect(board).not.toBeNull()
    setBoardBounds(board!)

    fireEvent.click(screen.getByRole('button', { name: 'Place a note' }))
    fireEvent.click(board!, { clientX: 110, clientY: 120 })

    const note = container.querySelector<HTMLElement>('.sticky-note')
    expect(note).toHaveStyle({ left: '100px', top: '100px', width: '250px', height: '220px' })
    expect(screen.getByRole('button', { name: 'Place a note' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('moves a note with the keyboard arrow key', () => {
    const { container } = render(<NotesBoardHarness />)
    const board = container.querySelector<HTMLElement>('#board')
    expect(board).not.toBeNull()
    setBoardBounds(board!)

    fireEvent.keyDown(screen.getByRole('button', { name: /move note/i }), { key: 'ArrowRight' })

    expect(container.querySelector<HTMLElement>('.sticky-note')).toHaveStyle({
      left: '15px',
      top: '20px',
    })
  })
})