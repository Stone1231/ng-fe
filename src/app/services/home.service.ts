import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    private readonly url: string;
    constructor(protected http: HttpClient) {
        this.url = environment.BASE_URL + '/index';
    }

    get() {
        const endpointUrl = this.url;
        return this.http.get(endpointUrl);
    }
}
