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
  getProject(id: number): Observable<any> {
    return this.http.get(serverLink + `/project/${id}`);
  }

  createProject(data: Project): Observable<any> {
    return this.http.post(serverLink + '/project', data);
  }
}
