import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    // moduleId: module.id,
    providers: [],
    selector: 'app-login',
    template: `
        <div class="card-wide mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">login</h2>
            </div>
        </div>
        <div class="card-wide mdl-card mdl-shadow--2dp">
        <table>
  <tr>
      <td>user name:</td>
      <td><input [(ngModel)]="userName" placeholder="user" /></td>
  </tr>
  <tr>
      <td>password:</td>
      <td><input [(ngModel)]="password" placeholder="pwd" /></td>
  </tr>
  <tr>
      <td></td>
      <td><input type="button" (click)="login()" value="Login" /></td>
  </tr>
</table>
        </div>
    `
})

export class LoginComponent implements OnDestroy {
    userName: string;
    password: string;

    private postStream$: Subscription;

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        if (this.postStream$) { this.postStream$.unsubscribe }

        this.postStream$ = this.authService.login(this.userName, this.password).subscribe(
            result => {
                // if (result.state == 1) {
                //     this.router.navigate(["home"]);
                // } else {
                //     alert(result.msg);
                // }

                this.router.navigate(['login-after']);
            }
        );
    }

    ngOnDestroy() {
        if (this.postStream$) { this.postStream$.unsubscribe(); }
    }
}
