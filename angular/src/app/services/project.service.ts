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
  getProject(id: number): Observable<boolean> {
    return this.http.get<boolean>(serverLink + `/project/${id}`);
  }

  createProject(data: Project): Observable<number> {
    return this.http.post<number>(serverLink + '/project', data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }
}
