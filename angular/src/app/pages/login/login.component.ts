import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LoginDto, SignupDto } from '../../dto/login.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}
  name: string = '';
  email: string = '';
  password: string = '';
  login(e: SubmitEvent) {
    const body: LoginDto = {
      email: this.email,
      password: this.password,
    };
    const userLoggin = this.loginService.login(body);
    userLoggin.subscribe((res) => {
      localStorage.setItem('access_token', res.access_token);
    });
    e.preventDefault();
  }
  signup(e: SubmitEvent) {
    const body: SignupDto = {
      name: this.name,
      email: this.name,
      password: this.password,
    };
    const userLoggin = this.loginService.login(body);
    userLoggin.subscribe((res) => {
      localStorage.setItem('access_token', res.access_token);
    });
    e.preventDefault();
  }
}
