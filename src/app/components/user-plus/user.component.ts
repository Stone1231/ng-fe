import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { User } from "@app/models/user.model";
import { Dept } from "@app/models/dept.model";
import { Item, CheckItem } from "@app/models/item.model";
import { environment } from "@environments/environment";
import { UserService } from "@app/services/user.service";
import { DeptService } from "@app/services/dept.service";
import { ProjService } from "@app/services/proj.service";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store";
import { getRow } from "@app/store/user/user.selectors";
import {
  BackListAction,
  UpdateAction,
  CreateAction,
} from "@app/store/user/user.actions";
import { cloneDeep } from "lodash";

@Component({
  selector: "app-user-plus",
  templateUrl: "./user.component.html",
  providers: [UserService, DeptService, ProjService],
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(
    private service: UserService,
    private deptService: DeptService,
    private projService: ProjService,
    private store: Store<AppState>
  ) {}

  public row: User = new User();
  photoFile: File;
  photo: string; // 為了控制只bind1次,把這個欄位抽出來
  public imgUrl = environment.IMG_URL;
  public depts: Item[] = [];
  defItem: Item = { name: "請選擇", value: "0" };
  public projs: CheckItem[] = [];
  private loadSingle$: Subscription;

  async ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    await this.getDeptItems();
    await this.getProjItems();
    this.loadSingle$ = this.store.select(getRow).subscribe((row: User) => {
      this.row = cloneDeep(row); // row (ps: error!無法修改);
      this.photo = this.row.photo;
      this.projs.map(
        (m) =>
          (m.checked = this.row.projs && -1 !== this.row.projs.indexOf(m.value))
      );
    });
    console.log("ngOnInit");
  }

  ngOnDestroy(): void {
    this.loadSingle$.unsubscribe();
  }

  async save() {
    this.row.projs = [];
    console.log(this.projs.length);
    this.row.projs = this.projs.filter((m) => m.checked).map((m) => m.value);
    if (this.photoFile) {
      const fileName = await this.service.postFile(this.photoFile).toPromise();
      this.row.photo = fileName;
    }

    // 這邊使用cloneDeep, 因為萬一有error this.row已經跟store綁定會無法修改
    // todo 以後再調整成透過url params call api取this.row
    if (this.row.id > 0) {
      this.store.dispatch(new UpdateAction({ user: cloneDeep(this.row) }));
    } else {
      this.store.dispatch(new CreateAction({ user: cloneDeep(this.row) }));
    }
  }

  back() {
    this.store.dispatch(new BackListAction());
  }

  getFile(e: any) {
    // let files:FileList = e.target.value;
    this.photoFile = e.target.files[0];
  }

  async getDeptItems() {
    let res = await this.deptService.getAll().toPromise();
    this.depts = res.map((m) => {
      const item = new CheckItem();
      item.value = m.id;
      item.name = m.name;
      return item;
    });
  }

  async getProjItems() {
    let res = await this.projService.getAll().toPromise();
    this.projs = res.map((m) => {
      const item = new CheckItem();
      item.value = m.id;
      item.name = m.name;
      item.checked = false;
      return item;
    });
  }

  selectProjAll(event) {
    const checked = event.target.checked;
    this.projs.map((m) => (m.checked = checked));
  }
}
