import { Button, List, ListItem, Box } from "@mui/material";
import { RecipeStep } from "../types/types";
import StepEditor from "./StepEditor";

interface RecipeStepsProps {
  steps: RecipeStep[];
  onAddStep: () => void;
  onUpdateStep: (id: number, updatedStep: RecipeStep) => void;
}

const RecipeSteps = ({ steps, onAddStep, onUpdateStep }: RecipeStepsProps) => {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={onAddStep} sx={{ mt: 2, mb: 2 }}>
          Add Step
        </Button>
      </Box>
      <List>
        {steps.map((step, index) => (
          <ListItem
            key={step.id}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ecedee", // Alternating background colors
              borderRadius: 2,
              mb: 1,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ width: "100%", padding: 2 }}>
              <StepEditor
                step={step}
                onUpdate={(updatedStep) => onUpdateStep(step.id, updatedStep)}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RecipeSteps;
