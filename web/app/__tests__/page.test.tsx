import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('Page', () => {
  it('renders the main heading', () => {
    render(<Page />)
    const heading = screen.getByRole('heading', { name: /lifemtrics/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Page />)
    const tagline = screen.getByText(/smooth ui • live updates • secure/i)
    expect(tagline).toBeInTheDocument()
  })

  it('renders sign in and sign up links when Clerk is not configured', () => {
    // Mock process.env to simulate no Clerk key
    const originalEnv = process.env
    process.env = { ...originalEnv, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: undefined }

    render(<Page />)
    const signInLink = screen.getByRole('link', { name: /sign in/i })
    const signUpLink = screen.getByRole('link', { name: /sign up/i })
    expect(signInLink).toBeInTheDocument()
    expect(signUpLink).toBeInTheDocument()

    // Restore env
    process.env = originalEnv
  })
})