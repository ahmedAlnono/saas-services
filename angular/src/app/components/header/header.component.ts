import { Component, Input, signal, WritableSignal } from '@angular/core';
import { SidebarHeadless } from '../sidepar/sidepar.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { serverLink } from '../../constants/main.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SidebarHeadless,
    InputTextModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public value = new FormControl();
  showvalue() {
    console.log(this.value.value);
  }

  @Input() name!: WritableSignal<string>;
  @Input() photo!: WritableSignal<string>;
}
