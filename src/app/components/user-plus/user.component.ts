import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { Dept } from '../../models/dept.model';
import { Item, CheckItem } from '../../models/item.model';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { DeptService } from '../../services/dept.service';
import { ProjService } from '../../services/proj.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-plus',
  templateUrl: './user.component.html',
  providers: [
    UserService,
    DeptService,
    ProjService],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(
    private service: UserService,
    private deptService: DeptService,
    private projService: ProjService) {

  }

  public row: User;

  photoFile: File;

  photo: string; // 為了控制只bind1次,把這個欄位抽出來

  public imgUrl = environment.IMG_URL;

  public depts: Item[] = [];
  defItem: Item = { name: "請選擇", value: "0" };

  public projs: CheckItem[] = [];

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  id: number;

  // back() {
  //     this.onBack.emit();
  // }

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.getDeptItems();
    this.getProjItems();
    if (this.id > 0) {
      this.read(this.id);
    } else {
      this.row = {
        id: 0,
        name: '',
        hight: 0,
        dept: 0,
        projs: [],
        photo: '',
        birthday: '0000-01-01'
      };
    }
  }

  // ngOnDestroy() {
  //     // 取消訂閱
  //     let aa: Subscription = this.deptService.getAll();
  //     aa.unsubscribe();
  //   }

  read(id: number) {
    this.service.getSingle(id.toString()).subscribe(d => {
      this.row = d;
      this.photo = d.photo;
      this.projs.map(m =>
        m.checked = this.row.projs && (-1 !== this.row.projs.indexOf(m.value))
      );
    });
  }

  save() {
    // console.log(this.row);
    this.row.projs = this.projs.filter(m => m.checked).map(m => m.value);

    if (this.row.id > 0) {

      const updateOb = this.service.put(this.row.id.toString(), this.row);

      if (this.photoFile) {
        // tslint:disable-next-line:no-shadowed-variable
        const fileOb = this.service.postFile(this.photoFile);

        fileOb.subscribe(
          res => {
            this.row.photo = res;
            updateOb.subscribe(
              () => {
                this.onSave.emit();
              }
            );
          }
        );
      } else {
        updateOb.subscribe(
          res => {
            this.onSave.emit();
          }
        );
      }
    } else {
      const postOb = this.service.post(this.row);
      if (this.photoFile) {
        const fileOb = this.service.postFile(this.photoFile);
        fileOb.subscribe(
          res => {
            this.row.photo = res;
            postOb.subscribe(
              () => {
                this.onSave.emit();
              }
            );
          }
        );
      } else {
        postOb.subscribe(
          res => {
            this.onSave.emit();
          }
        );
      }
    }
  }

  getFile(e: any) {
    // let files:FileList = e.target.value;
    this.photoFile = e.target.files[0];
    // console.log(this.photoFile);
  }

  getDeptItems() {
    this.deptService.getAll().subscribe(d => {
      this.depts = d.map(m => {
        const item = new CheckItem();
        item.value = m.id;
        item.name = m.name;
        return item;
      });
    });
  }

  getProjItems() {
    this.projService.getAll().subscribe(d => {
      this.projs = d.map(m => {
        const item = new CheckItem();
        item.value = m.id;
        item.name = m.name;
        item.checked = false;
        return item;
      });
    });
  }

  selectProjAll(event) {
    const checked = event.target.checked;
    this.projs.map(m => m.checked = checked);
  }

  // constructor(private service: UserService) {

  // }

  // bindData() {
  //     this.service.getAll().subscribe(d => {
  //         //this.rows = d;
  //     })
  // }
}
