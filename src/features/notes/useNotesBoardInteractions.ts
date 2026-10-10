import { useEffect, useState } from 'react'
import type {
  Dispatch,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
  SetStateAction,
} from 'react'
import { NOTE_COLORS } from '../../const/notesConst'
import type { Note } from '../../types/notesTypes'

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

type UseNotesBoardInteractionsProps = {
  notes: Note[]
  setNotes: Dispatch<SetStateAction<Note[]>>
  boardRef: RefObject<HTMLDivElement | null>
}

function useNotesBoardInteractions({
  notes,
  setNotes,
  boardRef,
}: UseNotesBoardInteractionsProps) {
  const [isPlacing, setIsPlacing] = useState(false)
  const [activePointer, setActivePointer] = useState<ActivePointer | null>(null)

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
  }, [activePointer, boardRef, setNotes])

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

  const togglePlacing = () => setIsPlacing((placing) => !placing)

  return {
    activePointer,
    beginPointer,
    isPlacing,
    moveWithKeyboard,
    placeNote,
    removeNote,
    togglePlacing,
    updateText,
  }
}

export default useNotesBoardInteractions
