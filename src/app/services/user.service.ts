import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "@app/models/user.model";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly url: string;
  constructor(protected http: HttpClient) {
    this.url = environment.BASE_URL + "/user";
  }

  getSingle(userId?: string): Observable<User> {
    const endpointUrl = userId ? `${this.url}/${userId}` : this.url;
    return this.http.get<User>(endpointUrl);
  }

  getQuery(keyWord?: string) {
    const endpointUrl = `${this.url}/query`;
    return this.http.post<User[]>(
      endpointUrl,
      JSON.stringify(keyWord),
      environment.httpOptions
    );
  }

  public getAll(): Observable<User[]> {
    const endpointUrl = this.url;
    return this.http.get<User[]>(endpointUrl);
  }

  put(userId?: string, model?: User): Observable<User> {
    const endpointUrl = userId ? `${this.url}/${userId}` : this.url;
    return this.http.put<User>(
      endpointUrl,
      model, // JSON.stringify(model),
      environment.httpOptions
    );
  }

  postFile(file1?: File) {
    const fData = new FormData();
    if (file1 != null) {
      fData.append("file", file1);
    }
    return this.http.post<string>(
      `${this.url}/ufile`,
      fData,
      environment.fileOptions
    );
  }

  post(model: User): Observable<User> {
    const endpointUrl = this.url;
    return this.http.post<User>(
      endpointUrl,
      model, // JSON.stringify(model),
      environment.httpOptions
    );
  }

  delete(userId?: string) {
    const endpointUrl = userId ? `${this.url}/${userId}` : this.url;
    return this.http.delete(endpointUrl);
  }
}
