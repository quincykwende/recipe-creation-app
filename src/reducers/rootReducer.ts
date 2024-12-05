// combining reducers
import {
  recipeReducer,
  initialRecipeState,
  RecipeState,
  RecipeAction,
} from "./recipeReducer";
import {
  alertReducer,
  initialAlertState,
  AlertState,
  AlertAction,
} from "./alertReducer";

export type AppState = {
  recipe: RecipeState;
  alert: AlertState;
};

export type AppAction = RecipeAction | AlertAction;

export const initialAppState: AppState = {
  recipe: initialRecipeState,
  alert: initialAlertState,
};

export const rootReducer = (state: AppState, action: AppAction): AppState => {
  return {
    recipe: recipeReducer(state.recipe, action as RecipeAction),
    alert: alertReducer(state.alert, action as AlertAction),
  };
};
