import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from 'primeng/sidebar';
import { TreeModule } from 'primeng/tree';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  sidebarVisible: boolean = false;
}
