import {
    Button,
    List,
    ListItem,
    Box,
    Select,
    MenuItem,
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material'
import {RecipeStep, StepType} from '../types/types';

interface RecipeStepsProps {
    steps: RecipeStep[]
    onAddStep: () => void
    onUpdateStep: (id: number, updatedStep: RecipeStep) => void
}

const RecipeSteps = ({steps, onAddStep, onUpdateStep}: RecipeStepsProps) => {

    const handleTypeChange = (id: number, type: StepType) => {
        // reset option when type changes
        const updatedStep: RecipeStep = { id, type, options: {} }
        onUpdateStep(id, updatedStep)
    }

    const handleOptionChange = (id: number, key: string, value: StepType | number | boolean) => {
        const step = steps.find((step) => (step.id === id))
        if (step) {
            const updatedStep: RecipeStep = {
                ...step,
                options: {...step.options, [key]: value}
            }
            onUpdateStep(id, updatedStep)
        }
    }

    return (
        <div>
            <Button variant="contained" onClick={onAddStep} sx={{ mt: 2, mb: 2 }}>
                Add Step
            </Button>
            <List>
                {steps.map((step: RecipeStep) => (
                    <ListItem key={step.id}>
                        <Box sx={{ width: '100%' }}>
                            <Select
                                value={step.type}
                                onChange={(e) => handleTypeChange(step.id, e.target.value as StepType) }
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
                                    <FormControlLabel
                                        label="Include PointCloud"
                                        control={
                                            <Checkbox checked={step.options.includePointCloud || false}
                                            onChange={(e) =>
                                                handleOptionChange(step.id, 'includePointCloud', e.target.checked)
                                            }
                                            />
                                        }
                                    />
                                    <Select
                                        value={step.options.imageType}
                                        onChange={(e) =>
                                            handleOptionChange(step.id, 'imageType', e.target.value)
                                        }
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        displayEmpty
                                    >
                                        <MenuItem value="">Select Image Type</MenuItem>
                                        <MenuItem value="FullImage">Full battery image</MenuItem>
                                        <MenuItem value="ImageSection">Section of image</MenuItem>
                                    </Select>
                                    {step.options.imageType === "ImageSection" && (
                                        <Box>
                                            <TextField
                                                label="Center X"
                                                type="number"
                                                value={step.options.centerX || ''}
                                                onChange={(e) =>
                                                    handleOptionChange(step.id, 'centerX', Math.max(0, +e.target.value))
                                                }
                                                sx={{ mr: 1}}
                                            />
                                            <TextField
                                                label="Center Y"
                                                type="number"
                                                value={step.options.centerY || ''}
                                                onChange={(e) =>
                                                    handleOptionChange(step.id, 'centerY', Math.max(0, +e.target.value))
                                                }
                                            />
                                        </Box>
                                    )}
                                </Box>
                            )}

                            {step.type === "Unscrewing" && (
                                <Box>
                                    <Select
                                        value={step.options.mode || ''}
                                        onChange={(e) => handleOptionChange(step.id, 'mode', e.target.value)}
                                        displayEmpty
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    >
                                        <MenuItem value='Automatic'>Automatic Unscrewing</MenuItem>
                                        <MenuItem value='Custom'>Specific Unscrewing</MenuItem>
                                    </Select>
                                    {step.options.mode === 'Automatic' && (
                                        <Box>
                                            <TextField
                                                label="Coordinate X"
                                                type="number"
                                                value={step.options.coordX || ''}
                                                onChange={(e) =>
                                                    handleOptionChange(step.id, 'coordX', Math.max(0, +e.target.value))
                                                }
                                                sx={{ mr: 1 }}
                                            />
                                            <TextField
                                                label="Coordinate Y"
                                                type="number"
                                                value={step.options.coordY || ''}
                                                onChange={(e) =>
                                                    handleOptionChange(step.id, 'coordY', Math.max(0, +e.target.value))
                                                }
                                            />
                                        </Box>
                                    )}
                                </Box>
                            )}

                            Step ID: {step.id} | Type: {step.type}
                        </Box>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default RecipeSteps
