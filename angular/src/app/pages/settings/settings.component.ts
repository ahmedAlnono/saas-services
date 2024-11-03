import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { Message, MessageService } from 'primeng/api';
import { serverLink } from '../../constants/main.constants';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FileUploadModule, FormsModule, MessageModule],
  providers: [MessageService],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  email!: string;
  id!: number;
  name!: string;
  token: string = '';
  message: Message | undefined;
  uploadUrl: string = '';
  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ) {
    const email: string | null = sessionStorage.getItem('email');
    const id: string | null = sessionStorage.getItem('id');
    const name: string | null = sessionStorage.getItem('name');
    const token: string | null = localStorage.getItem('access_token');
    if (token) {
      this.token = token;
    }
    name ? (this.name = name) : '';
    email ? (this.email = email) : '';
    id ? (this.id = +id) : '';
    if (id) {
      this.uploadUrl = serverLink + '/user/photo/' + id;
    }
  }

  updateNameAndEmail() {
    this.userService
      .updateUserNameAndEmail(this.name, this.email, this.id, this.token)
      .subscribe((res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'the date is updated successfully',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'data not updated wron request',
          });
        }
      });
  }
}
