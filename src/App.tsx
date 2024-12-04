import React, {useState} from 'react'
import {Container, Typography, TextField, Button, List, ListItem} from '@mui/material'
import { RecipeStep } from './types/types'
import './App.css'

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

          <Button onClick={addStep} >
            Add Step
          </Button>

          <List>
              {steps.map((step) => (
                  <ListItem key={step.id}>
                    Step ID: {step.id} | Type: {step.type}
                  </ListItem>
              ))}
          </List>

      </Container>
  );
}

export default App
