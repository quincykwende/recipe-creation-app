import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Recipe, RecipeStep } from "./types/types";
import "./App.css";
import RecipeSteps from "./components/RecipeSteps";

function App() {
  const [recipeName, setRecipeName] = useState<string>("");
  const [steps, setSteps] = useState<RecipeStep[]>([]);
  const [exportedJson, setExportedJson] = useState<string>("");

  const addStep = () => {
    const newStep: RecipeStep = {
      id: Date.now(),
      type: "",
      options: {},
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (id: number, updatedStep: RecipeStep) => {
    setSteps(steps.map((step) => (step.id === id ? updatedStep : step)));
  };

  const exportRecipeAsJson = () => {
    const recipe: Recipe = {
      name: recipeName,
      steps: steps.map(({ id, ...rest }) => rest),
    };
    setExportedJson(JSON.stringify(recipe, null, 2));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={2}>
        Recipes Creation App
      </Typography>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recipe Details
              </Typography>
              <TextField
                label="Recipe Name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                margin="normal"
                fullWidth
              />
              <RecipeSteps
                steps={steps}
                onAddStep={addStep}
                onUpdateStep={updateStep}
              />
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={exportRecipeAsJson}
                  sx={{ mt: 3 }}
                  disabled={!recipeName || steps.length === 0}
                >
                  Export Recipe as JSON
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Exported JSON
              </Typography>
              {exportedJson ? (
                <Box
                  sx={{
                    backgroundColor: "#f5f5f5",
                    padding: 2,
                    borderRadius: 2
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    value={exportedJson}
                    inputProps={{ readOnly: true }}
                    rows={8}
                  />
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Once the recipe is exported the JSON will be displayed here
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
