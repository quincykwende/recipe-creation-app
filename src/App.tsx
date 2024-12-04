import React, {useState} from 'react'
import {Container, Typography, TextField} from '@mui/material'
import './App.css'

function App() {
  const [recipeName, setRecipeName] = useState<string>('')

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
      </Container>
  );
}

export default App
