import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import App from "./App"

describe("App", () => {
  it("renders the academy title", () => {
    render(<App />)
    expect(screen.getAllByText(/Awfixer Academy/i)).toHaveLength(5)
  })

  it("renders Discord join button", () => {
    render(<App />)
    expect(screen.getByRole("link", { name: /Join Our Discord/i })).toBeInTheDocument()
  })

  it("renders courses section", () => {
    render(<App />)
    expect(screen.getByText(/Featured Courses/i)).toBeInTheDocument()
  })
})


