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
import { ErrorService } from "@app/services/error.service";
import { HomeService } from "@app/services/home.service";
import {
  GetAction,
  GetReturnAction,
  GetErrAction,
  GetBadErrAction,
  HandleAction,
  ThrowAction,
  ErrorActionTypes,
} from "./error.actions";

import { SuccessAction, FailureAction, ResultActionTypes } from "../actions";

@Injectable()
export class ErrorEffects {
  constructor(
    private actions$: Actions,
    private errService: ErrorService,
    private homeService: HomeService
  ) {}

  @Effect({ dispatch: true })
  getApiName$ = this.actions$.pipe(
    ofType<GetAction>(ErrorActionTypes.Get),
    mergeMap(() =>
      this.homeService.get().pipe(
        concatMap((response) => {
          return [
            new GetReturnAction({ msg: response.toString() }),
            new SuccessAction(),
          ];
        }),
        catchError((error) => of(new FailureAction({ err: error.message }))),
        finalize(() => console.log("getApiName$ finalize called!"))
      )
    )
  );

  @Effect({ dispatch: false })
  getReturn$ = this.actions$.pipe(
    ofType<GetReturnAction>(ErrorActionTypes.GetReturn),
    tap((response) => {
      window.alert(response.payload.msg);
    })
  );

  @Effect({ dispatch: true })
  getErr$ = this.actions$.pipe(
    ofType<GetErrAction>(ErrorActionTypes.GetErr),
    mergeMap(() =>
      this.errService.get().pipe(
        map((response) => new SuccessAction()),
        catchError((error) => {
          console.log("getErr$ catchError ...");
          // return catchError(error => of(null));
          return of(new FailureAction({ err: error.message }));
        }),
        finalize(() => console.log("getErr$ finalize called!"))
      )
    )
  );

  @Effect({ dispatch: true })
  getBadErr$ = this.actions$.pipe(
    ofType<GetErrAction>(ErrorActionTypes.GetBadErr),
    mergeMap(() => this.errService.get()),
    map((response) => new SuccessAction()),
    // catchError(error => of(null)), // 都會壞掉
    catchError((error) => of(new FailureAction({ err: error.message }))),
    finalize(() => console.log("getBadErr$ finalize called!"))
  );

  @Effect({ dispatch: true })
  handle$ = this.actions$.pipe(
    ofType<HandleAction>(ErrorActionTypes.Handle),
    switchMap(() =>
      this.errService.handle().pipe(
        map((response) => new SuccessAction()),
        catchError((error) => of(new FailureAction({ err: error }))),
        finalize(() => console.log("handle$ finalize called!"))
      )
    )
  );

  @Effect({ dispatch: true })
  throw$ = this.actions$.pipe(
    ofType<ThrowAction>(ErrorActionTypes.Throw),
    mergeMap(() =>
      this.errService.throw().pipe(
        map((response) => new SuccessAction()),
        catchError((error) => of(new FailureAction({ err: error.message }))),
        finalize(() => console.log("throw$ finalize called!"))
      )
    )
  );
}
