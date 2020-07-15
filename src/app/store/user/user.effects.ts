import { Injectable } from '@angular/core';
import { tap, withLatestFrom, concatMap, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserState } from './user.reducer';
import { UserService } from '../../services/user.service';
import { getkeyWord } from './user.selectors';
import {
  CreateAction,
  CreateSuccessAction,
  FailureAction,
  LoadAction,
  LoadAllAction,
  LoadListSuccessAction,
  LoadSuccessAction,
  QueryKeyWordAction,
  QueryAction,
  RemoveAction,
  RemoveSuccessAction,
  UpdateAction,
  UpdateSuccessAction,
  UserActionTypes
} from './user.actions';
import { User } from '../../models';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<UserState>,
  ) {}

  @Effect({ dispatch: true })
  loadAll$ = createEffect( () => this.actions$.pipe(
    ofType<LoadAllAction>(UserActionTypes.LoadAll),
    mergeMap(() => this.userService.getAll()),
    catchError(error => of(new Array<User>())),
    concatMap(response => {
      return [
        new LoadListSuccessAction({
          users: response
        })
      ];
    }),
  ));

  @Effect({ dispatch: true })
  query$ = createEffect( () => this.actions$.pipe(
    ofType<QueryAction>(UserActionTypes.Query),
    withLatestFrom(this.store.select(getkeyWord)),
    mergeMap(([action, keyWord]) => this.userService.getQuery(keyWord)),
    catchError(error => of(null)),
    concatMap(response => {
      return [
        new LoadListSuccessAction({
          users: response ? response.data : null
        })
      ];
    }),
  ));

  @Effect({ dispatch: true })
  loadSingle$ = createEffect( () => this.actions$.pipe(
    ofType<LoadAction>(UserActionTypes.Load),
    mergeMap(action => this.userService.getSingle(action.payload.id)),
    catchError(error => of(null)),
    concatMap(response => {
      return [
        new LoadSuccessAction({
          user: response ? response.data : null
        })
      ];
    }),
  ));

  @Effect({ dispatch: true })
  create$ = createEffect( () => this.actions$.pipe(
    ofType<CreateAction>(UserActionTypes.Create),
    mergeMap(action => this.userService.post(action.payload.user)),
    catchError(error => of(null)),
    concatMap(response => {
      return [
        new CreateSuccessAction({
          user: response ? response.data : null
        }),
        new QueryAction(),
      ];
    }),
  ));

  @Effect({ dispatch: true })
  update$ = createEffect( () => this.actions$.pipe(
    ofType<UpdateAction>(UserActionTypes.Update),
    mergeMap(action => this.userService.put(action.payload.user.id.toString(), action.payload.user)),
    catchError(error => of(null)),
    concatMap(response => {
      return [
        new UpdateSuccessAction({
          user: response ? response.data : null
        }),
        new QueryAction(),
      ];
    }),
  ));

  @Effect({ dispatch: true })
  delete$ = createEffect( () => this.actions$.pipe(
    ofType<RemoveAction>(UserActionTypes.Remove),
    mergeMap(action => this.userService.delete(action.payload.id.toString())),
    catchError(error => of(null)),
    concatMap(response => {
      return [
        new RemoveSuccessAction(),
        new QueryAction(),
      ];
    }),
  ));
}

export const effects: any[] = [ UserEffects ];
