import React, {useState} from 'react'
import {Container, Typography, TextField } from '@mui/material'
import { RecipeStep } from './types/types'
import './App.css'
import RecipeSteps from "./components/RecipeSteps";

function App() {
    const [recipeName, setRecipeName] = useState<string>('')
    const [steps, setSteps] = useState<RecipeStep[]>([])

    const addStep = () => {
        const newStep: RecipeStep = {
            id: Date.now(),
            type: "",
            options: {}
        }
        setSteps([...steps, newStep])
    }

    const updateStep = (id: number, updatedStep: RecipeStep) => {
        setSteps(steps.map((step)=> ( step.id === id ? updatedStep : step)))
    }

  return (
      <Container>
            <Typography variant="h4" gutterBottom>
              Recipes
            </Typography>
            <TextField
                label="Recipe Name"
                value={recipeName}
                onChange={ (e) => setRecipeName(e.target.value)}
                margin="normal"
                fullWidth
            />
            <RecipeSteps steps={steps} onAddStep={addStep} onUpdateStep={updateStep}/>
      </Container>
  );
}

export default App
