import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    private readonly url: string;

    constructor(protected http: HttpClient) {
      this.url = environment.BASE_URL + '/file';
    }

    postFile(file1?: File) {
        const fData = new FormData();
        if (file1 != null) {
            fData.append('file', file1);
        }

        return this.http.post<string>(
            `${this.url}/ufile`,
            fData,
            environment.fileOptions);
    }

    postFiles(files?: File[]) {
        const fData = new FormData();
        if (files != null) {
            for (const i in files) {
                if (i != null) {
                    fData.append('files', files[i]);
                }
            }

            // files.forEach(f => {

            // })
        }

        return this.http.post<string[]>(
            `${this.url}/ufiles`,
            fData,
            environment.fileOptions
        );
    }

    postFile2(file1?: File, file2?: File) {
        const fData = new FormData();
        if (file1 != null) {
            fData.append('file1', file1);
        }
        if (file2 != null) {
            fData.append('file2', file2);
        }

        return this.http.post<string[]>(
            `${this.url}/ufile2`,
            fData,
            environment.fileOptions
        );
    }
}
