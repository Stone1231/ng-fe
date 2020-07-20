import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css'],
})
export class NavMenuComponent implements OnInit {
  constructor(private service: HomeService) {}
  public backend: string;
  public items: MenuItem[];

  ngOnInit() {
    this.service.get().subscribe((d) => {
      this.backend = d.toString();
    });

    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      { label: 'Error', icon: 'pi pi-times', routerLink: ['/error'] },
      { label: 'Counter', icon: 'pi pi-star', routerLink: ['/counter'] },
      { label: 'User', icon: 'pi pi-user', routerLink: ['/user'] },
      { label: 'User Redux', icon: 'pi pi-user', routerLink: ['/user-plus'] },
    ];

    // this.items = [
    //   {
    //     label: "File",
    //     items: [
    //       { label: "New", icon: "pi pi-fw pi-plus" },
    //       { label: "Download", icon: "pi pi-fw pi-download" },
    //     ],
    //   },
    //   {
    //     label: "Edit",
    //     items: [
    //       { label: "Add User", icon: "pi pi-fw pi-user-plus" },
    //       { label: "Remove User", icon: "pi pi-fw pi-user-minus" },
    //     ],
    //   },
    // ];
  }
}
