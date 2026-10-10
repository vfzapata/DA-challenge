import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from 'react'
import { NOTE_COLORS } from '../../const/notesConst'
import type { Note } from '../../types/notesTypes'

type NoteCardProps = {
  index: number
  note: Note
  isActive: boolean
  onBeginPointer: (
    event: ReactPointerEvent<HTMLElement>,
    note: Note,
    mode: 'move' | 'resize',
  ) => void
  onDelete: (id: string) => void
  onMoveWithKeyboard: (event: ReactKeyboardEvent<HTMLButtonElement>, note: Note) => void
  onTextChange: (id: string, text: string) => void
}

function NoteCard({
  index,
  note,
  isActive,
  onBeginPointer,
  onDelete,
  onMoveWithKeyboard,
  onTextChange,
}: NoteCardProps) {
  return (
    <article
      className={`sticky-note sticky-note--${index % NOTE_COLORS.length} ${isActive ? 'is-active' : ''}`}
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
          onPointerDown={(event) => onBeginPointer(event, note, 'move')}
          onKeyDown={(event) => onMoveWithKeyboard(event, note)}
        >
          <span className="grip-dots" aria-hidden="true" />
          <span>NOTE {String(index + 1).padStart(2, '0')}</span>
        </button>
        <button
          type="button"
          className="delete-note"
          aria-label="Delete note"
          title="Delete note"
          onClick={() => onDelete(note.id)}
        >x</button>
      </div>
      <textarea
        className="note-editor"
        aria-label="Note text"
        placeholder="Write something worth keeping..."
        value={note.text}
        onChange={(event) => onTextChange(note.id, event.target.value)}
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
        onPointerDown={(event) => onBeginPointer(event, note, 'resize')}
      />
    </article>
  )
}

export default NoteCard
