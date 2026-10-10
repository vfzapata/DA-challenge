import { useRef } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Note } from '../../types/notesTypes'
import './notes.css'
import NoteCard from './NoteCard'
import useNotesBoardInteractions from './useNotesBoardInteractions'

type NotesBoardProps = {
  notes: Note[]
  setNotes: Dispatch<SetStateAction<Note[]>>
}

function NotesBoard({ notes, setNotes }: NotesBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null)
  const {
    activePointer,
    beginPointer,
    isPlacing,
    moveWithKeyboard,
    placeNote,
    removeNote,
    togglePlacing,
    updateText,
  } = useNotesBoardInteractions({ notes, setNotes, boardRef })

  return (
    <>
      <section className="board-intro flex items-end justify-between">
        <div>
          <h1>All notes<br /><span>Check your notes.</span></h1>
        </div>
      </section>

      <section className="board-tools flex items-center justify-between" aria-label="Board controls">
        <div className="tool-actions flex items-center gap-3">
          {isPlacing && <span className="place-hint">Click anywhere on the board</span>}
          <button
            type="button"
            className={`place-button ${isPlacing ? 'is-cancel' : ''}`}
            aria-pressed={isPlacing}
            onClick={togglePlacing}
          >
            <span className="place-button-icon" aria-hidden="true">{isPlacing ? 'x' : '+'}</span>
            {isPlacing ? 'Cancel' : 'Place a note'}
          </button>
        </div>
      </section>

      <div
        id="board"
        ref={boardRef}
        className={`board-canvas relative flex-1 ${isPlacing ? 'is-placing' : ''}`}
        onClick={placeNote}
      >
        <div className="board-corner board-corner--right" aria-hidden="true">DRAG TO ARRANGE</div>
        {notes.map((note, index) => (
          <NoteCard
            key={note.id}
            index={index}
            note={note}
            isActive={activePointer?.id === note.id}
            onBeginPointer={beginPointer}
            onDelete={removeNote}
            onMoveWithKeyboard={moveWithKeyboard}
            onTextChange={updateText}
          />
        ))}
        {notes.length === 0 && !isPlacing && (
          <div className="empty-board">
            <span className="empty-mark" aria-hidden="true">+</span>
            <p>Your board is clear.</p>
            <span>Choose a size, then place your first note.</span>
          </div>
        )}
      </div>
    </>
  )
}

export default NotesBoard