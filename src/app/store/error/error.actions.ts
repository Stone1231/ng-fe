import {Action} from "@ngrx/store";

export enum ErrorActionTypes {
  Get = '[Error] Get',
  GetReturn = '[Error] Get Return',
  GetErr = '[Error] Get Error',
  GetBadErr = '[Error] Get Bad Error',
  Handle = '[Error] Handle',
  Throw = '[Error] Throw',
}

export class GetAction implements Action {
  readonly type = ErrorActionTypes.Get;
  constructor() { }
}

export class GetReturnAction implements Action {
  readonly type = ErrorActionTypes.GetReturn;
  constructor(public payload: { msg: string }) { }
}

export class GetErrAction implements Action {
  readonly type = ErrorActionTypes.GetErr;
  constructor() { }
}

export class GetBadErrAction implements Action {
  readonly type = ErrorActionTypes.GetBadErr;
  constructor() { }
}

export class HandleAction implements Action {
  readonly type = ErrorActionTypes.Handle;
  constructor() { }
}

export class ThrowAction implements Action {
  readonly type = ErrorActionTypes.Throw;
  constructor() { }
}

export type ErrorActions = GetAction | GetReturnAction | GetErrAction | GetBadErrAction | HandleAction | ThrowAction;
