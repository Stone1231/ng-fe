import { ActionReducerMap } from "@ngrx/store";
// counter
import { counterReducer } from "./counter/counter.reducer";
// user
import { userReducer } from "./user/user.reducer";
import { UserState } from "./user/user.reducer";
import { UserEffects } from "./user/user.effects";
// error
import { ErrorEffects } from "./error/error.effects";
// share
import { ResultEffects } from "./effects";

export interface AppState {
  count: number;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  count: counterReducer,
  user: userReducer,
};

export const effects: any[] = [UserEffects, ErrorEffects, ResultEffects];
