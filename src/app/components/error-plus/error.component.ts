import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store";
import {
  GetAction,
  GetErrAction,
  GetBadErrAction,
  HandleAction,
  ThrowAction,
} from "@app/store/error/error.actions";

@Component({
  selector: "app-error-plus",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"],
})
export class ErrorComponent {
  constructor(private store: Store<AppState>) {}

  get() {
    this.store.dispatch(new GetAction());
  }

  getErr() {
    this.store.dispatch(new GetErrAction());
  }

  getBadErr() {
    this.store.dispatch(new GetBadErrAction());
  }

  handle() {
    this.store.dispatch(new HandleAction());
  }

  getThrow() {
    this.store.dispatch(new ThrowAction());
  }
}
