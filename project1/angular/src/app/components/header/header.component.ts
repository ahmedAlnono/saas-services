import { Component } from '@angular/core';
import { SidebarHeadless } from '../sidepar/sidepar.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SidebarHeadless, InputTextModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public value = new FormControl();
  showvalue() {
    console.log(this.value.value);
  }
}
