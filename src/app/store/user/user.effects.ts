import { Injectable } from '@angular/core';
import { tap, withLatestFrom, concatMap, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import { UserService } from '../../services/user.service';
import { getKeyWord, getRows } from './user.selectors';
import {
  CreateAction,
  CreateSuccessAction,
  FailureAction,
  InitAction,
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
    private store: Store<AppState>, // Store<UserState>,
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
  query$ = createEffect( () => {
    return this.actions$.pipe(
      ofType<QueryAction>(UserActionTypes.Query),
      withLatestFrom(this.store.select(getKeyWord)),
      mergeMap(([action, keyWord]) => this.userService.getQuery(keyWord)),
      catchError(error => of(new Array<User>())),
      concatMap(response => {
        return [
          new LoadListSuccessAction({
            users: response ? response : null
          })
        ];
      }),
    );
  });

  @Effect({ dispatch: true })
  initSingle$ = createEffect( () => this.actions$.pipe(
    ofType<InitAction>(UserActionTypes.Init),
    catchError(error => of(new User())),
    map(response => {
      const user:User = {
        id: 0,
        name: '',
        hight: 0,
        dept: 0,
        projs: [],
        photo: '',
        birthday: '0000-01-01'
      };
      return new LoadSuccessAction({
          user: user});
    }),
  ));

  @Effect({ dispatch: true })
  loadSingle$ = createEffect( () => this.actions$.pipe(
    ofType<LoadAction>(UserActionTypes.Load),
    mergeMap(action => this.userService.getSingle(action.payload.id)),
    catchError(error => of(new User())),
    concatMap(response => {
      return [
        new LoadSuccessAction({
          user: response ? response : null
        })
      ];
    }),
  ));

  @Effect({ dispatch: true })
  create$ = createEffect( () => this.actions$.pipe(
    ofType<CreateAction>(UserActionTypes.Create),
    mergeMap(action => this.userService.post(action.payload.user)),
    catchError(error => of(new User())),
    concatMap(response => {
      return [
        new CreateSuccessAction({
          user: response ? response : null
        }),
        new QueryAction(),
      ];
    }),
  ));

  @Effect({ dispatch: true })
  update$ = createEffect( () => this.actions$.pipe(
    ofType<UpdateAction>(UserActionTypes.Update),
    mergeMap(action => this.userService.put(action.payload.user.id.toString(), action.payload.user)),
    catchError(error => of(new User())),
    concatMap(response => {
      return [
        new UpdateSuccessAction({
          user: response ? response : null
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
