import { MessageService } from 'primeng/api';
import { Component, signal } from '@angular/core';
import {
  FileBeforeUploadEvent,
  FileUploadEvent,
  FileUploadHandlerEvent,
  FileUploadModule,
  UploadEvent,
} from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProjectService } from '../../services/project.service';
import { serverLink } from '../../constants/main.constants';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { MessageModule } from 'primeng/message';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    FileUploadModule,
    StepperModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ButtonModule,
    ChipsModule,
    MessageModule,
  ],
  providers: [MessageService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  userId: number = 0;
  projectId!: number;
  orders!: string[];
  uploadUrl = serverLink + '/project/owner/photos/' + this.userId;
  name: string = '';
  description: string = '';
  deadLine!: Date;
  stack: string = '';
  stackArray = [];
  photos: string[] = [];
  access_token!: string;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
  ) {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      this.userId = +userId;
    }
    const token = localStorage.getItem('access_token');
    if (token) {
      this.access_token = token;
    }
    this.messageService.add({
      severity: 'success',
      data: 'test message',
    });
  }

  createProject(nextCallback: any) {
    if (this.userId) {
      this.projectService
        .createProject(
          {
            name: this.name,
            description: this.description,
            deadLine: this.deadLine,
            stack: this.stackArray,
            maker: 1,
          },
          this.access_token,
        )
        .subscribe(
          (res) => {
            if (res == 0) {
              this.messageService.add({
                summary: 'error',
                detail: 'project not created',
                severity: 'error',
              });
            } else {
              this.projectId = res;
            }
          },
          (e: HttpErrorResponse) => {
            if (e.error.message) {
              this.messageService.add({
                summary: e.error.error,
                detail: `${e.error.message?.toString()}`,
                severity: 'error',
              });
            } else {
              this.messageService.add({
                detail: ' server not response',
                severity: 'error',
              });
            }
          },
          () => {
            nextCallback.emit();
          },
        );
    } else {
      this.messageService.add({
        summary: 'error: => (wrong userId)',
        detail: 'be sure that you are logged in',
        severity: 'error',
      });
    }
  }
  uploadFiles(e: FileUploadHandlerEvent) {
    const form: FormData = new FormData();
    e.files.forEach((file) => {
      form.append('photos', file);
    });
    this.projectService
      .uplodadPhotos(form, this.projectId, this.access_token)
      .subscribe((res) => {
        console.log(res);
      });
  }
  checkProject() {
    if (this.projectId) {
      this.projectService
        .getProject(this.projectId, this.access_token)
        .subscribe((res) => {
          if (res) {
            this.messageService.add({
              summary: 'success upload',
              severity: 'success',
            });
          }
        });
    } else {
      this.messageService.add({
        summary: 'project not created',
        severity: 'error',
      });
    }
  }
}
