import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import App from './App'

test('renders app title', () => {
  render(<App />)
  const linkElement = screen.getByText(/Recipes/i)
  expect(linkElement).toBeInTheDocument()
})

test("renders recipeName input and updates state", ()=> {
  render(<App />)
  const input = screen.getByLabelText(/Recipe Name/i)
  expect(input).toBeInTheDocument()

  fireEvent.change(input, {target: {value: 'test name'}})
  expect(input).toHaveValue('test name')
})

