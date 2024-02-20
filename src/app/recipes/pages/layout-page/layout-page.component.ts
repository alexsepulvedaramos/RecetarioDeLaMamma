import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

  public sidebarItems = [
    { label: 'Search recipes', icon: 'pi pi-search mr-3', url: './list' },
    { label: 'New recipe', icon: 'pi pi-plus mr-3', url: './add-recipe' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
}
