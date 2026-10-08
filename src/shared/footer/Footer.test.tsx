import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/jest-globals'
import { describe, expect, it } from '@jest/globals'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the footer copy', () => {
    render(<Footer />)

    expect(screen.getByText('NOTES FOOTER')).toBeInTheDocument()
    expect(screen.getByText('NOTES STAY ON THIS DEVICE')).toBeInTheDocument()
  })
})