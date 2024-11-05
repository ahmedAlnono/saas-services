import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProjectService } from '../../services/project.service';
import { serverLink } from '../../constants/main.constants';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';

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
    CheckboxModule,
    ChipsModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  constructor(private projectService: ProjectService) {}
  orders!: string[];
  uploadUrl = serverLink + '/project/photos';

  name: string = '';
  description: string = '';
  deadLine: string = '';
  stack: string = '';
  stackArray = [];
  addStack() {}
  createProject() {}
}
