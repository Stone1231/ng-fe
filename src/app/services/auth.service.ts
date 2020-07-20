import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly url: string;

    constructor(
        protected http: HttpClient,
        private router: Router,
        public jwtHelper: JwtHelperService,
        ) {
            this.url = environment.BASE_URL + '/auth';
    }

    private tokeyKey = 'token';

    canActivate() {
        if (this.checkLogin()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }

    login(userName: string, password: string) {
        const body = JSON.stringify({ username: userName, pwd: password });
        return this.http
        .put(
            `${this.url}/login`,
            body,
            environment.httpOptions)
        .pipe(
            // tap(data => console.log(data)), // 在 map() 前先印一次資料
            map(res => {
                    const result: any = res; // res.json();
                    if (result && result.token) {
                        sessionStorage.setItem(this.tokeyKey, result.token);
                    }
                    return result;
                }),
            // tap(data => console.log(data)), // 在 map() 後再次印一次，觀察 map 內程式的結果
            catchError(this.handleError)
            );
    }

    getJWTFromServer() {
        const options = this.initAuthOptions();
        return this.http
        .get(this.url, options)
        .pipe(
            catchError(this.handleError));
    }

    getJWTFromClient() {
        const token = sessionStorage.getItem(this.tokeyKey);
        return this.jwtHelper.decodeToken(token);
    }

    private checkLogin(): boolean {
        const token = sessionStorage.getItem(this.tokeyKey);
        return token != null;
    }

    // public authPost$(url: string, body: any) {
    //     let options = this.initAuthOptions();
    //     //return this.http.post(url, body, options).map(response => response.json()).catch(this.handleError);
    //     return this.http
    //     .post(url, body, options)
    //     .pipe(
    //         catchError(this.handleError));
    // }

    private getLocalToken(): string {
        const token = sessionStorage.getItem(this.tokeyKey);
        return token ? token : '';
        // return sessionStorage.getItem(this.tokeyKey);
    }

    private initAuthOptions() {
        const token = this.getLocalToken();
        if (token == null) {
          throw 'No token';
        }

        // let httpOptions =  Object.assign({}, environment.httpOptions);
        // httpOptions.headers.append("Authorization", "Bearer " + token);

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
            })
          };
        // httpOptions.headers.append("Authorization", "Bearer " + token);
        return httpOptions;
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.error(error.ok);
        // console.error(error._body);
        // console.error(error.status);
        // console.error(errMsg);
        switch (error.status) {
            case 401:
                // ...
                break;
        }
        return throwError(errMsg);
    }
}
