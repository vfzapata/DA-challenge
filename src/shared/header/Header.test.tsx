import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/jest-globals'
import { describe, expect, it } from '@jest/globals'
import Header from './Header'

describe('Header', () => {
  it('renders the brand, saved status, and singular note count', () => {
    const { container } = render(<Header noteCount={1} />)

    expect(screen.getByRole('link', { name: 'Notes board home' })).toHaveAttribute('href', '#board')
    expect(container.querySelector('img')).toHaveAttribute('src', 'test-file-stub')
    expect(screen.getByText('Saved on the current session')).toBeInTheDocument()
    expect(screen.getByText('1 note')).toBeInTheDocument()
  })

  it('uses the plural note label', () => {
    render(<Header noteCount={2} />)

    expect(screen.getByText('2 notes')).toBeInTheDocument()
  })

  it('renders zero notes', () => {
    render(<Header noteCount={0} />)

    expect(screen.getByText('0 notes')).toBeInTheDocument()
  })
})