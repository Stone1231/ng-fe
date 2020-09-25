import { Injectable } from "@angular/core";
import {
  tap,
  withLatestFrom,
  concatMap,
  map,
  mergeMap,
  catchError,
  switchMap,
  finalize,
} from "rxjs/operators";
import { of } from "rxjs";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../index";
import { UserService } from "@app/services/user.service";
import { getKeyWord, getRows } from "./user.selectors";
import {
  CreateAction,
  CreateSuccessAction,
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
  UserActionTypes,
} from "./user.actions";
import { User } from "@app/models";
import { FailureAction } from "@app/store/actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState> // Store<UserState>,
  ) {}

  @Effect({ dispatch: true })
  loadAll$ = this.actions$.pipe(
    ofType<LoadAllAction>(UserActionTypes.LoadAll),
    mergeMap(() =>
      this.userService.getAll().pipe(
        concatMap((response) => {
          return [
            new LoadListSuccessAction({
              users: response,
            }),
          ];
        }),
        catchError((error) => of(new FailureAction({ err: error.message })))
      )
    )
  );

  @Effect({ dispatch: true })
  query$ = this.actions$.pipe(
    ofType<QueryAction>(UserActionTypes.Query),
    withLatestFrom(this.store.select(getKeyWord)),
    mergeMap(([action, keyWord]) =>
      this.userService.getQuery(keyWord).pipe(
        concatMap((response) => {
          return [
            new LoadListSuccessAction({
              users: response ? response : null,
            }),
          ];
        }),
        catchError((error) => of(new FailureAction({ err: error.message })))
      )
    )
  );

  @Effect({ dispatch: true })
  initSingle$ = this.actions$.pipe(
    ofType<InitAction>(UserActionTypes.Init),
    map((response) => {
      const user: User = {
        id: 0,
        name: "",
        hight: null,
        dept: 0,
        projs: [],
        photo: "",
        birthday: "0000-01-01",
      };
      return new LoadSuccessAction({
        user: user,
      });
    })
  );

  @Effect({ dispatch: true })
  loadSingle$ = this.actions$.pipe(
    ofType<LoadAction>(UserActionTypes.Load),
    mergeMap((action) =>
      this.userService.getSingle(action.payload.id).pipe(
        map(
          (response) =>
            new LoadSuccessAction({ user: response ? response : null })
        ),
        catchError((error) => of(new FailureAction({ err: error.message })))
      )
    )
  );

  @Effect({ dispatch: true })
  create$ = this.actions$.pipe(
    ofType<CreateAction>(UserActionTypes.Create),
    mergeMap((action) =>
      this.userService.post(action.payload.user).pipe(
        concatMap((response) => {
          return [
            new CreateSuccessAction({
              user: response ? response : null,
            }),
            new QueryAction(),
          ];
        }),
        catchError((error) => of(new FailureAction({ err: error.message }))),
        finalize(() => console.log("create$ finalize called!"))
      )
    )
  );

  @Effect({ dispatch: true })
  update$ = this.actions$.pipe(
    ofType<UpdateAction>(UserActionTypes.Update),
    mergeMap((action) =>
      this.userService
        .put(action.payload.user.id.toString(), action.payload.user)
        .pipe(
          concatMap((response) => {
            return [
              new UpdateSuccessAction({
                user: response ? response : null,
              }),
              new QueryAction(),
            ];
          }),
          catchError((error) => of(new FailureAction({ err: error.message })))
        )
    )
  );

  @Effect({ dispatch: true })
  delete$ = this.actions$.pipe(
    ofType<RemoveAction>(UserActionTypes.Remove),
    mergeMap((action) =>
      this.userService.delete(action.payload.id.toString()).pipe(
        concatMap((response) => {
          return [new RemoveSuccessAction(), new QueryAction()];
        }),
        catchError((error) => of(new FailureAction({ err: error.message })))
      )
    )
  );

  @Effect({ dispatch: false })
  showAlertOnSuccess$ = this.actions$.pipe(
    ofType(
      UserActionTypes.CreateSuccess,
      UserActionTypes.UpdateSuccess,
      UserActionTypes.RemoveSuccess
    ),
    tap((response) => {
      window.alert("Success!");
    })
  );
}
