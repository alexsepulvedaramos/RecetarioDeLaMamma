import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(
    private translateService: TranslateService,
    private config: PrimeNGConfig,
  ) { }

  initializeTranslation() {
    this.translateService.addLangs(['en', 'es', 'de']);
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang() || 'en';
    this.translateService.use(browserLang.match(/en|es|de/) ? browserLang : 'en');

    // Optionally, set translations for PrimeNG components here
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
