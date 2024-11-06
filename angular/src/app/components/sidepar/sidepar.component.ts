import { Component, model, signal, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from 'primeng/sidebar';
import { TreeModule } from 'primeng/tree';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'sidebar-headless',
  templateUrl: './sidepar.component.html',
  styleUrl: './sidepar.component.scss',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    TreeModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class SidebarHeadless {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible = model(false);

  active = signal<string>('');

  setActive(item: string) {
    this.active.set(item);
  }

  checkActive(item: string) {
    if (item == this.active()) {
      return 'sidebar-item active';
    } else {
      return 'sidebar-item';
    }
  }
}
