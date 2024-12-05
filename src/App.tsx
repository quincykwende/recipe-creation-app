import React, { useReducer, useState } from "react";
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
import { Recipe, RecipeStep } from "./types/types";
import RecipeSteps from "./components/RecipeSteps";
import { rootReducer, initialAppState } from "./reducers/rootReducer";

function App() {
  const [state, dispatch] = useReducer(rootReducer, initialAppState);
  const [exportedJson, setExportedJson] = useState<string>("");

  const exportRecipeAsJson = () => {
    const recipe: Recipe = {
      name: state.recipe.recipeName,
      steps: state.recipe.steps.map(({ id, ...rest }) => rest),
    };
    const recipeJson = JSON.stringify(recipe, null, 2);
    setExportedJson(recipeJson); // Update exported JSON
    dispatch({
      type: "SET_ALERT",
      payload: {
        message: "Recipe has been exported as JSON!",
        severity: "success",
      },
    });
  };

  const copyJsonToClipboard = () => {
    navigator.clipboard
      .writeText(exportedJson)
      .then(() => {
        dispatch({
          type: "SET_ALERT",
          payload: {
            message: "JSON has been copied to clipboard!",
            severity: "success",
          },
        });
      })
      .catch(() => {
        dispatch({
          type: "SET_ALERT",
          payload: { message: "Failed to copy JSON!", severity: "error" },
        });
      });
  };

  const populateFormFromJson = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      setExportedJson(jsonString);
      if (data.name && Array.isArray(data.steps)) {
        dispatch({ type: "RESET_RECIPE" });
        dispatch({ type: "SET_RECIPE_NAME", payload: data.name });
        data.steps.forEach((step: RecipeStep, index: number) => {
          dispatch({
            type: "ADD_RECIPE_STEP",
            payload: {
              id: Date.now() + index,
              type: step.type,
              options: step.options || {},
            },
          });
        });
        dispatch({
          type: "SET_ALERT",
          payload: {
            message: "Form populated successfully!",
            severity: "success",
          },
        });
      } else {
        dispatch({
          type: "SET_ALERT",
          payload: { message: "Invalid JSON format!", severity: "error" },
        });
      }
    } catch (error) {
      dispatch({
        type: "SET_ALERT",
        payload: { message: "Invalid JSON format!", severity: "error" },
      });
    }
  };

  const handleResetForm = () => {
    dispatch({ type: "RESET_RECIPE" });
    setExportedJson("");
    dispatch({
      type: "SET_ALERT",
      payload: { message: "Form reset successfully!", severity: "success" },
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={2}>
        Recipes Creation App
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recipe Details
              </Typography>
              <TextField
                label="Recipe Name"
                value={state.recipe.recipeName}
                onChange={(e) =>
                  dispatch({ type: "SET_RECIPE_NAME", payload: e.target.value })
                }
                margin="normal"
                fullWidth
              />
              <RecipeSteps
                steps={state.recipe.steps}
                onAddStep={() => dispatch({ type: "ADD_RECIPE_STEP" })}
                onUpdateStep={(updatedStep) =>
                  dispatch({ type: "UPDATE_RECIPE_STEP", payload: updatedStep })
                }
                onRemoveStep={(id) =>
                  dispatch({ type: "REMOVE_RECIPE_STEP", payload: id })
                }
              />
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between" }}
                mt={2}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleResetForm}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={exportRecipeAsJson}
                  disabled={
                    !state.recipe.recipeName || state.recipe.steps.length === 0
                  }
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
                  maxRows={20}
                />
              </Box>
              <Button
                  variant="contained"
                  onClick={() => populateFormFromJson(exportedJson)}
                  sx={{ mt: 2 }}
                  disabled={!exportedJson}
              >
                Populate Form
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {state.alert ? (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={() => dispatch({ type: "CLEAR_ALERT" })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => dispatch({ type: "CLEAR_ALERT" })}
            severity={state.alert.severity}
            sx={{ width: "100%" }}
          >
            {state.alert.message}
          </Alert>
        </Snackbar>
      ) : null}
    </Container>
  );
}

export default App;
