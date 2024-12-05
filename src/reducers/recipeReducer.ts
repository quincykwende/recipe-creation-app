import { RecipeStep } from "../types/types";

export type RecipeState = {
  recipeName: string;
  steps: RecipeStep[];
};

export type RecipeAction =
  | { type: "SET_RECIPE_NAME"; payload: string }
  | { type: "ADD_RECIPE_STEP"; payload?: RecipeStep }
  | { type: "UPDATE_RECIPE_STEP"; payload: RecipeStep }
  | { type: "REMOVE_RECIPE_STEP"; payload: number }
  | { type: "RESET_RECIPE" };

export const initialRecipeState: RecipeState = {
  recipeName: "",
  steps: [],
};

export const recipeReducer = (
  state: RecipeState,
  action: RecipeAction,
): RecipeState => {
  switch (action.type) {
    case "SET_RECIPE_NAME":
      return { ...state, recipeName: action.payload };
    case "ADD_RECIPE_STEP":
      const newStep = action.payload || {
        id: Date.now(),
        type: "",
        options: {},
      };
      return { ...state, steps: [...state.steps, newStep] };
    case "UPDATE_RECIPE_STEP":
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.id === action.payload.id ? action.payload : step,
        ),
      };
    case "REMOVE_RECIPE_STEP":
      return {
        ...state,
        steps: state.steps.filter((step) => step.id !== action.payload),
      };
    case "RESET_RECIPE":
      return { ...initialRecipeState };
    default:
      return state;
  }
};
