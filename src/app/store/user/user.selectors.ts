// NGRX
import { createSelector } from '@ngrx/store';

import { UserState } from './user.reducer';

export interface AppState {
  user: UserState;
}

export const selectUserState = (state: AppState) => state.user;

export const getkeyWord = createSelector(
  selectUserState,
  (m: UserState) => m.keyWord
);

export const getRows = createSelector(
  selectUserState,
  (m: UserState) => m.rows
);
