import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessToken } from '../models/jwt-payload.model';
import { LoginDto, SignupDto } from '../dto/login.dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  signup(body: SignupDto): Observable<AccessToken> {
    return this.http.post<AccessToken>(
      'http://localhost:3000/auth/signup',
      body
    );
  }
  login(body: LoginDto): Observable<AccessToken> {
    return this.http.post<AccessToken>(
      'http://localhost:3000/auth/login',
      body
    );
  }
}
