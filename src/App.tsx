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
            type: "TakeImage",
            options: {}
        }
        setSteps([...steps, newStep])
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
            />
            <RecipeSteps steps={steps} onAddStep={addStep}/>
      </Container>
  );
}

export default App
