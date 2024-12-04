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

test("adding and managing steps state", () => {
  render(<App />)
  const addStepButton = screen.getByText(/Add Step/i)
  expect(addStepButton).toBeInTheDocument()

  // initial value of step array should be 0
  expect(screen.queryAllByText(/Step ID:/i).length).toBe(0)

  // add step
  fireEvent.click(addStepButton)
  expect(screen.getByText(/Step ID:/i)).toBeInTheDocument()
  expect(screen.queryAllByText(/Step ID:/i).length).toBe(1)

  //add another step and make length is 2
  fireEvent.click(addStepButton)
  expect(screen.queryAllByText(/Step ID:/i).length).toBe(2)
})
