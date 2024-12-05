import {
  Box,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { RecipeStep, StepType } from "../types/types";

interface StepEditorProps {
  step: RecipeStep;
  onUpdate: (updatedStep: RecipeStep) => void;
}

const StepEditor = ({ step, onUpdate }: StepEditorProps) => {
  const handleOptionChange = (
    key: string,
    value: StepType | number | boolean,
  ) => {
    const updatedStep = { ...step, options: { ...step.options, [key]: value } };
    onUpdate(updatedStep);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Select
        value={step.type || ""}
        onChange={(e) =>
          onUpdate({ ...step, type: e.target.value as StepType, options: {} })
        }
        fullWidth
        sx={{ mb: 2 }}
        displayEmpty
      >
        <MenuItem value="">Select Step Type</MenuItem>
        <MenuItem value="TakeImage">Take Image</MenuItem>
        <MenuItem value="Unscrewing">Unscrewing</MenuItem>
      </Select>

      {step.type === "TakeImage" && (
        <Box>
          <Select
            value={step.options.imageType || ""}
            onChange={(e) => handleOptionChange("imageType", e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            displayEmpty
          >
            <MenuItem value="">Select Image Type</MenuItem>
            <MenuItem value="FullImage">Full battery image</MenuItem>
            <MenuItem value="ImageSection">Section of image</MenuItem>
          </Select>
          {step.options.imageType === "ImageSection" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Center X"
                type="number"
                value={step.options.centerX || ""}
                onChange={(e) =>
                  handleOptionChange("centerX", Math.max(0, +e.target.value))
                }
                fullWidth
              />
              <TextField
                label="Center Y"
                type="number"
                value={step.options.centerY || ""}
                onChange={(e) =>
                  handleOptionChange("centerY", Math.max(0, +e.target.value))
                }
                fullWidth
              />
            </Box>
          )}
          <FormControlLabel
            label="Include PointCloud"
            control={
              <Checkbox
                checked={step.options.includePointCloud || false}
                onChange={(e) =>
                  handleOptionChange("includePointCloud", e.target.checked)
                }
              />
            }
          />
        </Box>
      )}

      {step.type === "Unscrewing" && (
        <Box>
          <Select
            value={step.options.mode || ""}
            onChange={(e) => handleOptionChange("mode", e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Screwing Mode</MenuItem>
            <MenuItem value="Automatic">Automatic Unscrewing</MenuItem>
            <MenuItem value="Custom">Specific Unscrewing</MenuItem>
          </Select>
          {step.options.mode === "Custom" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Coordinate X"
                type="number"
                value={step.options.coordX || ""}
                onChange={(e) =>
                  handleOptionChange("coordX", Math.max(0, +e.target.value))
                }
                fullWidth
              />
              <TextField
                label="Coordinate Y"
                type="number"
                value={step.options.coordY || ""}
                onChange={(e) =>
                  handleOptionChange("coordY", Math.max(0, +e.target.value))
                }
                fullWidth
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default StepEditor;
