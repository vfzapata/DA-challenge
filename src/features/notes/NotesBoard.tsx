import { useEffect, useRef, useState } from 'react'
import type {
  CSSProperties,
  Dispatch,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  SetStateAction,
} from 'react'
import type { Note } from '../../types/notesTypes'
import './notes.css'
import { NOTE_COLORS } from '../../const/notesConst'

type NotesBoardProps = {
  notes: Note[]
  setNotes: Dispatch<SetStateAction<Note[]>>
}

type ActivePointer = {
  id: string
  pointerId: number
  mode: 'move' | 'resize'
  startX: number
  startY: number
  originX: number
  originY: number
  originWidth: number
  originHeight: number
}

function NotesBoard({ notes, setNotes }: NotesBoardProps) {
  const [isPlacing, setIsPlacing] = useState(false)
  const [activePointer, setActivePointer] = useState<ActivePointer | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activePointer) return

    const moveNote = (event: PointerEvent) => {
      if (event.pointerId !== activePointer.pointerId || !boardRef.current) return
      const board = boardRef.current.getBoundingClientRect()
      const deltaX = event.clientX - activePointer.startX
      const deltaY = event.clientY - activePointer.startY

      setNotes((currentNotes) => currentNotes.map((note) => {
        if (note.id !== activePointer.id) return note

        if (activePointer.mode === 'move') {
          return {
            ...note,
            x: Math.min(Math.max(0, activePointer.originX + deltaX), board.width - note.width),
            y: Math.min(Math.max(0, activePointer.originY + deltaY), board.height - note.height),
          }
        }

        return {
          ...note,
          width: Math.min(Math.max(190, activePointer.originWidth + deltaX), board.width - note.x),
          height: Math.min(Math.max(165, activePointer.originHeight + deltaY), board.height - note.y),
        }
      }))
    }

    const finishPointer = (event: PointerEvent) => {
      if (event.pointerId === activePointer.pointerId) setActivePointer(null)
    }

    window.addEventListener('pointermove', moveNote)
    window.addEventListener('pointerup', finishPointer)
    window.addEventListener('pointercancel', finishPointer)
    return () => {
      window.removeEventListener('pointermove', moveNote)
      window.removeEventListener('pointerup', finishPointer)
      window.removeEventListener('pointercancel', finishPointer)
    }
  }, [activePointer, setNotes])

  const beginPointer = (
    event: ReactPointerEvent<HTMLElement>,
    note: Note,
    mode: ActivePointer['mode'],
  ) => {
    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    setActivePointer({
      id: note.id,
      pointerId: event.pointerId,
      mode,
      startX: event.clientX,
      startY: event.clientY,
      originX: note.x,
      originY: note.y,
      originWidth: note.width,
      originHeight: note.height,
    })
  }

  const placeNote = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!isPlacing || event.target !== event.currentTarget || !boardRef.current) return
    const bounds = boardRef.current.getBoundingClientRect()
    const size = { width: 250, height: 220 }
    const x = Math.min(Math.max(0, event.clientX - bounds.left), bounds.width - size.width)
    const y = Math.min(Math.max(0, event.clientY - bounds.top), bounds.height - size.height)
    const note: Note = {
      id: crypto.randomUUID(),
      x,
      y,
      ...size,
      text: '',
      color: NOTE_COLORS[notes.length % NOTE_COLORS.length],
    }
    setNotes((currentNotes) => [...currentNotes, note])
    setIsPlacing(false)
  }

  const updateText = (id: string, text: string) => {
    setNotes((currentNotes) => currentNotes.map((note) =>
      note.id === id ? { ...note, text } : note,
    ))
  }

  const removeNote = (id: string) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id))
  }

  const moveWithKeyboard = (event: ReactKeyboardEvent<HTMLButtonElement>, note: Note) => {
    const step = event.shiftKey ? 20 : 5
    const movement: Record<string, [number, number]> = {
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
    }
    const delta = movement[event.key]
    if (!delta || !boardRef.current) return
    event.preventDefault()
    const bounds = boardRef.current.getBoundingClientRect()
    setNotes((currentNotes) => currentNotes.map((currentNote) =>
      currentNote.id === note.id
        ? {
            ...currentNote,
            x: Math.min(Math.max(0, currentNote.x + delta[0]), bounds.width - currentNote.width),
            y: Math.min(Math.max(0, currentNote.y + delta[1]), bounds.height - currentNote.height),
          }
        : currentNote,
    ))
  }

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
            onClick={() => setIsPlacing((placing) => !placing)}
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
          <article
            className={`sticky-note sticky-note--${index % NOTE_COLORS.length} ${activePointer?.id === note.id ? 'is-active' : ''}`}
            key={note.id}
            style={{
              left: note.x,
              top: note.y,
              width: note.width,
              height: note.height,
              '--note-color': note.color,
            } as CSSProperties}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="note-topline" />
            <div className="note-header flex items-center justify-between">
              <button
                type="button"
                className="drag-handle flex items-center gap-2"
                aria-label="Move note. Use arrow keys to nudge, or drag."
                title="Drag to move; use arrow keys to nudge"
                onPointerDown={(event) => beginPointer(event, note, 'move')}
                onKeyDown={(event) => moveWithKeyboard(event, note)}
              >
                <span className="grip-dots" aria-hidden="true" />
                <span>NOTE {String(index + 1).padStart(2, '0')}</span>
              </button>
              <button
                type="button"
                className="delete-note"
                aria-label="Delete note"
                title="Delete note"
                onClick={() => removeNote(note.id)}
              >x</button>
            </div>
            <textarea
              className="note-editor"
              aria-label="Note text"
              placeholder="Write something worth keeping..."
              value={note.text}
              onChange={(event) => updateText(note.id, event.target.value)}
              spellCheck
            />
            <div className="note-footer flex items-center justify-between">
              <span>PINNED THOUGHT</span>
              <span>{note.text.length > 0 ? `${note.text.length} CHARS` : 'EMPTY PAGE'}</span>
            </div>
            <button
              type="button"
              className="resize-handle"
              aria-label="Resize note"
              title="Drag to resize"
              onPointerDown={(event) => beginPointer(event, note, 'resize')}
            />
          </article>
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