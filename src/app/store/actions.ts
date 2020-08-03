import { Action } from '@ngrx/store';

export enum ResultActionTypes {
  Success = '[Result] Success',
  Failure = '[Result] Failure',
}

export class SuccessAction implements Action {
  readonly type = ResultActionTypes.Success;
  constructor() { }
}

export class FailureAction implements Action {
  readonly type = ResultActionTypes.Failure;
  constructor(public payload: { err: string }) { }
}

export type ResultActions = SuccessAction | FailureAction;
