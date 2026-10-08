import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/jest-globals'
import { describe, expect, it } from '@jest/globals'
import type { Note } from '../../types/notesTypes'
import Header from './Header'

const createNote = (id: string): Note => ({
  id,
  x: 0,
  y: 0,
  width: 250,
  height: 220,
  text: '',
  color: '#f3d66b',
})

describe('Header', () => {
  it('renders the brand, saved status, and singular note count', () => {
    const { container } = render(<Header notes={[createNote('note-1')]} />)

    expect(screen.getByRole('link', { name: 'Notes board home' })).toHaveAttribute('href', '#board')
    expect(container.querySelector('img')).toHaveAttribute('src', 'test-file-stub')
    expect(screen.getByText('Saved on the current session')).toBeInTheDocument()
    expect(screen.getByText('1 note')).toBeInTheDocument()
  })

  it('uses the plural note label', () => {
    render(<Header notes={[createNote('note-1'), createNote('note-2')]} />)

    expect(screen.getByText('2 notes')).toBeInTheDocument()
  })

  it('renders zero notes', () => {
    render(<Header notes={[]} />)

    expect(screen.getByText('0 notes')).toBeInTheDocument()
  })
})