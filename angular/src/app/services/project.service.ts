import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverLink } from '../constants/main.constants';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  getProject(id: number, token: string): Observable<object> {
    return this.http.get<object>(serverLink + `/project/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
  uplodadPhotos(
    data: FormData,
    id: number,
    token: string,
  ): Observable<boolean> {
    return this.http.post<boolean>(
      serverLink + `/project/owner/photos/${id}`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
  }

  getUncompletedProjects(token: string): Observable<any> {
    return this.http.get(serverLink + '/project/uncompleted', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getMyAllProject(token: string): Observable<any> {
    return this.http.get(serverLink + '/project', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  createProject(data: Project, token: string): Observable<number> {
    return this.http.post<number>(serverLink + '/project', data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
