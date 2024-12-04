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
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {Recipe, RecipeStep, StepType} from "./types/types";
import RecipeSteps from "./components/RecipeSteps";

function App() {
  const [recipeName, setRecipeName] = useState<string>("");
  const [steps, setSteps] = useState<RecipeStep[]>([]);
  const [exportedJson, setExportedJson] = useState<string>("");
  const [copyAlert, setCopyAlert] = useState<boolean>(false);
  const [jsonErrorAlert, setJsonErrorAlert] = useState<boolean>(false);

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

  const copyJsonToClipboard = () => {
    if (exportedJson) {
      navigator.clipboard.writeText(exportedJson);
      setCopyAlert(true); // Show the Snackbar
    }
  };

  const populateFormFromJson = () => {
    try {
      const data = JSON.parse(exportedJson);
      if (data.name && Array.isArray(data.steps)) {
        setRecipeName(data.name);
        setSteps(
          data.steps.map((step: any, index: number) => ({
            id: Date.now() + index,
            type: step.type as StepType,
            options: step.options || {},
          })),
        );
      } else {
        setJsonErrorAlert(true);
      }
    } catch (error) {
      console.error(error);
      setJsonErrorAlert(true);
    }
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Exported JSON</Typography>
                <IconButton
                  onClick={copyJsonToClipboard}
                  disabled={!exportedJson}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  value={exportedJson}
                  onChange={(e) => setExportedJson(e.target.value)}
                  inputProps={{ rows: 8 }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={populateFormFromJson}
                sx={{ mt: 2 }}
                disabled={!exportedJson}
              >
                Populate Form
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={copyAlert}
        autoHideDuration={3000}
        onClose={() => setCopyAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setCopyAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          JSON copied to clipboard!
        </Alert>
      </Snackbar>

      <Snackbar
        open={jsonErrorAlert}
        autoHideDuration={3000}
        onClose={() => setJsonErrorAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setJsonErrorAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid JSON format. Please make it's properly structured.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
