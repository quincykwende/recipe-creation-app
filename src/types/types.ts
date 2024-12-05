export type StepType = "TakeImage" | "Unscrewing" | "";

export interface Recipe {
  name: string;
  steps: BaseRecipeStep[];
}

export interface RecipeStep extends BaseRecipeStep {
  id: number;
}

export interface BaseRecipeStep {
  type: StepType;
  options: {
    [key: string]: any;
  };
}
