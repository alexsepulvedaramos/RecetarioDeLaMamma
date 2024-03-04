import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { TranslateService } from '@ngx-translate/core';
import { Dropdown } from 'primeng/dropdown';

// Interface for Dropdown options
interface dropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @ViewChild('languageDropdown') languageDropdown!: Dropdown;

  sidebarVisible: boolean = false;

  public languages: dropdownOption[] = [
    { label: '../../../../assets/en.svg', value: 'en' },
    { label: '../../../../assets/es.svg', value: 'es' }
  ];

  public selectedLanguage: string = this.languages[0].label;

  public sidebarItems = [
    { label: this.translateService.instant('SIDE_MENU.SEARCH'), icon: 'pi pi-search mr-3', url: './list' },
    { label: this.translateService.instant('SIDE_MENU.NEW'), icon: 'pi pi-plus mr-3', url: './add-recipe' }
  ];

  constructor(
    private translateService: TranslateService
  ) {
    let currentLang = this.translateService.currentLang;
    let currentLangIndex = this.languages.findIndex(lang => lang.value === currentLang);

    this.translateService.onLangChange.subscribe(() => {
      currentLang = this.translateService.currentLang;
      currentLangIndex = this.languages.findIndex(lang => lang.value === currentLang);
      this.selectedLanguage = this.languages[currentLangIndex].label;

      this.sidebarItems = [
        { label: this.translateService.instant('SIDE_MENU.SEARCH'), icon: 'pi pi-search mr-3', url: './list' },
        { label: this.translateService.instant('SIDE_MENU.NEW'), icon: 'pi pi-plus mr-3', url: './add-recipe' }
      ];
    });

    this.selectedLanguage = this.languages[currentLangIndex].label;
  }

  closeCallback(e: Event): void {
    if (this.sidebarRef) {
      this.sidebarRef.close(e);
    }
  }

  changeLanguage(event: any): void {
    if (event.value.includes('en')) {
      this.translateService.use('en');
    } else {
      this.translateService.use('es');
    }
  }
}
