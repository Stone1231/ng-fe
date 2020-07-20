import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    // moduleId: module.id,
    providers: [AuthService],
    selector: 'app-login-after',
    template: `
        <div class="card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">get session values</h2>
            </div>
        </div>
          <div class="card-wide mdl-card mdl-shadow--2dp">
          <table>
    <tr>
        <td>Name Server:</td>
        <td>{{NameServer}} </td>
    </tr>
    <tr>
        <td>Role Server:</td>
        <td>{{RoleServer}}</td>
    </tr>
    <tr>
        <td>Name Client:</td>
        <td>{{NameClient}} </td>
    </tr>
    <tr>
        <td>Role Client:</td>
        <td>{{RoleClient}}</td>
    </tr>
</table>
          </div>
    `
})

export class LoginAfterComponent implements OnInit {

    NameServer: string;
    RoleServer: string;

    NameClient: string;
    RoleClient: string;

    constructor(
        private authService: AuthService,
        private router: Router) { }

    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        if (!this.authService.canActivate()){
            return;
        }

        let auth = this.authService.getJWTFromServer();

        auth.subscribe(
            res => {
                let r:any = res;
                this.NameServer = r.username;
                this.RoleServer = r.role;
            }
        );

        let local: any = this.authService.getJWTFromClient();
        this.NameClient = local.username;
        this.RoleClient = local.role;
    }
}
