import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import {environment} from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { UserState} from '../../store/user/user.reducer';
import {QueryAction, QueryKeyWordAction, LoadAllAction, RemoveAction} from '../../store/user/user.actions';
import { getRows } from '../../store/user/user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-plus',

  templateUrl: './users.component.html',
  providers: [UserService],
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  public rows: User[] = [];
  public vType = 0;
  public readId = 0;
  public keyWord = '';
  public imgUrl = environment.IMG_URL;
  private loadList$: Subscription;
  constructor(private store: Store<{}>, private service: UserService) {
  }

  ngOnInit() {
    this.bindData();
    this.loadList$ = this.store.select(getRows).subscribe(
      (rows: User[]) => {
      this.rows = rows;
    });
  }

  /*
   * @override
   */
  ngOnDestroy(): void {
    this.loadList$.unsubscribe();
  }

  bindData() {
    this.store.dispatch(new LoadAllAction());
  }

  queryData() {
    this.store.dispatch(new QueryKeyWordAction({ keyWord: this.keyWord }));
    this.store.dispatch(new QueryAction());
  }

  readSingle(id: number) {
    this.readId = id;
    this.vType = 1;
  }

  delSingle(userId: number) {
    if (!confirm('Are you sure you want to delete this?')) {
      return;
    }
    this.store.dispatch(new RemoveAction({id: userId}));
    this.vType = 0;
  }

  createSingle() {
    this.readId = 0;
    this.vType = 1;
  }

  public editBack(date: any): void {
    this.vType = 0;
  }

  public editSave(date: any): void {
    this.store.dispatch(new QueryAction());
    this.vType = 0;
  }
}
