import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingModel } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}
  getAllSettings(): Observable<SettingModel> {
    return this.http.get<SettingModel>('http://localhost');
  }
}
