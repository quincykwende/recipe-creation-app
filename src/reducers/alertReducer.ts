export type AlertState = {
  message: string;
  severity: "success" | "error";
} | null;

export type AlertAction =
  | {
      type: "SET_ALERT";
      payload: { message: string; severity: "success" | "error" };
    }
  | { type: "CLEAR_ALERT" };

export const initialAlertState: AlertState = null;

export const alertReducer = (
  state: AlertState,
  action: AlertAction,
): AlertState => {
  switch (action.type) {
    case "SET_ALERT":
      return action.payload;
    case "CLEAR_ALERT":
      return null;
    default:
      return state;
  }
};
