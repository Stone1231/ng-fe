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
      {
        label: "Base",
        items: [
          { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
          { label: 'Error', icon: 'pi pi-times', routerLink: ['/error'] },
          { label: 'File', icon: 'pi pi-file', routerLink: ['/file'] },
          { label: 'Login', icon: 'pi pi-sign-in', routerLink: ['/login'] },
          { label: 'Login After', icon: 'pi pi-check', routerLink: ['/login-after'] },
          { label: 'User', icon: 'pi pi-user', routerLink: ['/user'] },
        ],
      },
      {
        label: "Redux",
        items: [
          { label: 'Counter', icon: 'pi pi-star', routerLink: ['/counter'] },
          { label: 'User', icon: 'pi pi-user', routerLink: ['/user-plus'] },
        ],
      },
    ];
  }
}
