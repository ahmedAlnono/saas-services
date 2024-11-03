import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverLink } from '../constants/main.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUser(token: string): Observable<any> {
    return this.http.get<any>(serverLink + '/user', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
  getServiceProvider(token: string): Observable<any> {
    return this.http.get<any>(serverLink + '/service-provider', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  uploadUserPhoto(obj: any): Observable<string> {
    return this.http.post<string>(serverLink + '/files/upload-one', {
      photo: obj,
    });
  }

  updateUserNameAndEmail(
    name: string,
    email: string,
    id: number,
    token: string
  ): Observable<boolean> {
    return this.http.patch<boolean>(
      serverLink + `/user/${id}`,
      {
        name,
        email,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }
}
