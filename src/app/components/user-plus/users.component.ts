import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from '../../models/user.model';
import {environment} from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from "../../store";
import {QueryAction, QueryKeyWordAction, LoadAllAction, RemoveAction, LoadAction, InitAction} from '../../store/user/user.actions';
import { getRows, getView } from '../../store/user/user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-plus',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  public rows: User[] = [];
  public vType = 0;
  public keyWord = '';
  public imgUrl = environment.IMG_URL;
  private loadList$: Subscription;
  private viewSub$: Subscription;
  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.bindData();
    this.loadList$ = this.store.select(getRows).subscribe(
      (rows: User[]) => {
      this.rows = rows;
    });
    this.viewSub$ = this.store.select(getView).subscribe(
      (vType: number) => {
        this.vType = vType;
      });
  }

  ngOnDestroy(): void {
    this.loadList$.unsubscribe();
    this.viewSub$.unsubscribe();
  }

  bindData() {
    this.store.dispatch(new LoadAllAction());
  }

  queryData() {
    this.store.dispatch(new QueryKeyWordAction({ keyWord: this.keyWord }));
    this.store.dispatch(new QueryAction());
  }

  readSingle(id: number) {
    // this.readId = id;
    // this.vType = 1;
    this.store.dispatch(new LoadAction({id: id.toString()}));
  }

  delSingle(userId: number) {
    if (!confirm('Are you sure you want to delete this?')) {
      return;
    }
    this.store.dispatch(new RemoveAction({id: userId}));
    // this.vType = 0;
  }

  createSingle() {
    // this.readId = 0;
    // this.vType = 1;
    this.store.dispatch(new InitAction());
  }

  // public editBack(date: any): void {
  //   this.vType = 0;
  // }
  //
  // public editSave(date: any): void {
  //   this.store.dispatch(new QueryAction());
  //   this.vType = 0;
  // }
}
