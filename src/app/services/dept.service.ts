import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dept } from '../models/dept.model';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DeptService {
  private readonly url: string;
  constructor(protected http: HttpClient) {
    this.url = environment.BASE_URL + '/dept';
  }

  getAll(): Observable<Dept[]> {
    const endpointUrl = this.url;
    return this.http.get<Dept[]>(endpointUrl);
  }
}
