import {Button, List, ListItem} from '@mui/material'
import { RecipeStep } from '../types/types';

interface RecipeStepsProps {
    steps: RecipeStep[]
    onAddStep: () => void
}

const RecipeSteps = ({steps, onAddStep}: RecipeStepsProps) => {
    return (
        <div>
            <Button onClick={onAddStep} >
                Add Step
            </Button>
            <List>
                {steps.map((step: RecipeStep) => (
                    <ListItem key={step.id}>
                        Step ID: {step.id} | Type: {step.type}
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default RecipeSteps
