import { Action } from '@ngrx/store';
// import { User } from '@app/models/user.model';
import { User } from '../../models/user.model';

export enum UserActionTypes {
  LoadAll = '[User] Load all',
  Load = '[User] Load',
  Init = '[User] Init',
  QueryKeyWord = '[User] Query KeyWord',
  Query = '[User] Query',
  Create = '[User] Create',
  Update = '[User] Update',
  Remove = '[User] Remove',
  LoadListSuccess = '[User] Load list success',
  LoadSuccess = '[User] Load success',
  CreateSuccess = '[User] Create success',
  UpdateSuccess = '[User] Update success',
  RemoveSuccess = '[User] Remove success',
  BackList = '[User] Back list',
}

export class LoadAllAction implements Action {
  readonly type = UserActionTypes.LoadAll;
  constructor() { }
}

export class QueryKeyWordAction implements Action {
  readonly type = UserActionTypes.QueryKeyWord;
  constructor(public payload: { keyWord?: string }) { }
}

export class QueryAction implements Action {
  readonly type = UserActionTypes.Query;
  constructor() { }
}

export class LoadListSuccessAction implements Action {
  readonly type = UserActionTypes.LoadListSuccess;
  constructor(public payload: { users: User[] }) { }
}

export class LoadAction implements Action {
  readonly type = UserActionTypes.Load;
  constructor(public payload: { id?: string }) { }
}

export class LoadSuccessAction implements Action {
  readonly type = UserActionTypes.LoadSuccess;
  constructor(public payload: { user: User }) { }
}

export class InitAction implements Action {
  readonly type = UserActionTypes.Init;
  constructor() {}
}

export class CreateAction implements Action {
  readonly type = UserActionTypes.Create;
  constructor(public payload: { user: User }) { }
}

export class CreateSuccessAction implements Action {
  readonly type = UserActionTypes.CreateSuccess;
  constructor(public payload: { user: User }) { }
}

export class UpdateAction implements Action {
  readonly type = UserActionTypes.Update;
  constructor(public payload: { user: User }) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = UserActionTypes.UpdateSuccess;
  constructor(public payload: { user: User }) { }  // Partial<User>}>
}

export class RemoveAction implements Action {
  readonly type = UserActionTypes.Remove;
  constructor(public payload: { id: number }) { }
}

export class RemoveSuccessAction implements Action {
  readonly type = UserActionTypes.RemoveSuccess;
  constructor() {}
}

export class BackListAction implements Action {
  readonly type = UserActionTypes.BackList;
  constructor() { }
}

export type UserActions = LoadAllAction | LoadAction | QueryKeyWordAction | QueryAction | InitAction | CreateAction | UpdateAction | RemoveAction
  | LoadListSuccessAction | LoadSuccessAction | CreateSuccessAction | UpdateSuccessAction | RemoveSuccessAction | BackListAction;
