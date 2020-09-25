import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Proj } from "@app/models/proj.model";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProjService {
  private readonly url: string;

  constructor(protected http: HttpClient) {
    this.url = environment.BASE_URL + "/proj";
  }

  getAll(): Observable<Proj[]> {
    let endpointUrl = this.url;

    return this.http.get<Proj[]>(endpointUrl);
  }
}
