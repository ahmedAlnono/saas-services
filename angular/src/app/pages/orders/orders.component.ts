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

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
  ) {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      this.userId = +userId;
    }
  }

  checkProject() {
    if (this.projectId) {
      this.projectService.getProject(this.projectId);
    } else {
      this.messageService.add({
        summary: 'project not created',
        severity: 'error',
      });
    }
  }
  createProject(nextCallback: any) {
    if (this.userId) {
      this.projectService
        .createProject({
          name: this.name,
          description: this.description,
          deadLine: this.deadLine,
          stack: this.stackArray,
          maker: 1,
        })
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
          (e) => {
            console.log(e);
          },
          () => {
            nextCallback.emit();
          },
        );
    } else {
      this.messageService.add({
        summary: 'error',
        detail: 'project not created',
        severity: 'error',
      });
    }
  }
}
