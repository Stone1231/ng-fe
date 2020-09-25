// NGRX
import { createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";
import { AppState } from "../index";

export const selectUserState = (state: AppState) => state.user;

export const getKeyWord = createSelector(
  selectUserState,
  (m: UserState) => m.keyWord
);

export const getRows = createSelector(
  selectUserState,
  (m: UserState) => m.rows
);

export const getRow = createSelector(selectUserState, (m: UserState) => m.row);

export const getView = createSelector(
  selectUserState,
  (m: UserState) => m.vType
);
