export type StepType = 'TakeImage' | 'Unscrewing' | ""
export interface RecipeStep {
    id: number
    type: StepType
    options: {
        [key: string]: any
    }
}
