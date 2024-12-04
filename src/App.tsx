import React, {useState} from 'react'
import {Container, Typography, TextField, Button, Box } from '@mui/material'
import {Recipe, RecipeStep} from './types/types'
import './App.css'
import RecipeSteps from "./components/RecipeSteps";

function App() {
    const [recipeName, setRecipeName] = useState<string>('')
    const [steps, setSteps] = useState<RecipeStep[]>([])
    const [exportedJson, setExportedJson] = useState<string>('');

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

    const exportRecipeAsJson = () => {
        const recipe: Recipe = {
            name: recipeName,
            steps: steps.map(({ id, ...rest}) => rest)
        }
        setExportedJson(JSON.stringify(recipe, null, 2))
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

          <Button
              variant="contained"
              color="primary"
              onClick={exportRecipeAsJson}
              sx={{ mt: 5 }}
              disabled={!recipeName || steps.length === 0}
          >
              Export Recipe as JSON
          </Button>

          {exportedJson && (
              <Box sx={{ mt: 3}}>
                  <Typography variant="h6">Exported JSON:</Typography>
                  <TextField
                      fullWidth
                      multiline
                      value={exportedJson}
                      inputProps={{ readOnly: true }}
                      rows={8}
                  />
              </Box>
          )}
      </Container>
  );
}

export default App
