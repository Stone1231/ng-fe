// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: false,
  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  },
  fileOptions: {
    headers: new HttpHeaders({
      'Accept':  'application/json'
    })
  },
  BASE_URL: 'http://localhost:8000/api',
  IMG_URL: 'http://localhost:8000/static'
};