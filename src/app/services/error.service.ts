import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

    private readonly url: string;
    constructor(protected http: HttpClient) {
        this.url = environment.BASE_URL + '/error';
    }

    get() {
      const endpointUrl = this.url;
      return this.http.get(endpointUrl).pipe(
        catchError(this.handleError)
      );
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.error(error.ok);
        // console.error(error._body);
        // console.error(error.status);
        // console.error(errMsg);
        switch (error.status) {
            case 500:
                alert(JSON.stringify(error.error));
                console.error(error.error);
                break;
        }

        return throwError(errMsg);
    }
}
