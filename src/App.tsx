import { useEffect, useState } from 'react'
import Footer from './shared/footer/Footer'
import Header from './shared/header/Header'
import NotesBoard from './features/notes/NotesBoard'
import { loadNotes } from './services/loadNotes'
import { saveNotes } from './services/saveNotes'
import type { Note } from './types/notesTypes'

function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes)

  useEffect(() => {
    const timeout = setTimeout(() => saveNotes(notes), 180)
    return () => clearTimeout(timeout)
  }, [notes])

  return (
    <main className="app-shell flex min-h-screen flex-col">
      <Header notes={notes} />
      <NotesBoard notes={notes} setNotes={setNotes} />
      <Footer />
    </main>
  )
}

export default App
