import { Actions, Effect, ofType } from "@ngrx/effects";
import { ResultActionTypes, FailureAction, SuccessAction } from "@app/store/actions";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class ResultEffects {

  constructor(
    private actions$: Actions,
  ) {}

  @Effect({dispatch: false})
  showAlertOnSuccess$ = this.actions$.pipe(
    ofType<SuccessAction>(ResultActionTypes.Success),
    tap(response => {
      window.alert('effects success!');
    }),
  );

  @Effect({dispatch: false})
  showAlertOnFailure$ = this.actions$.pipe(
    ofType<FailureAction>(ResultActionTypes.Failure),
    tap(response => {
      window.alert(`effects failure: ${response.payload.err}`);
    }),
  );
}
