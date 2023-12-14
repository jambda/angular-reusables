/* eslint-disable import/no-extraneous-dependencies */
import { Inject, Injectable } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from './language.enum';


// Add to your app.config.ts
// {
//       provide: APP_INITIALIZER,
//       useFactory: initializeLanguageAndLocale,
//       deps: [LanguageService, TranslateService],
//       multi: true,
// },


export const initializeLanguageAndLocale = (languageService: LanguageService) => () => {
  return languageService.initialise();
};

export const langLocaleMapping: { [key in Language]: string } = {
  de: 'de-ch',
  en: 'en',
  fr: 'fr-ch',
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANG_STORAGE_KEY = 'lang'
  private readonly DEFAULT_LANG = Language.de;

  private readonly currentLang$$ = new BehaviorSubject(this.DEFAULT_LANG);

  public currentLang$ = this.currentLang$$.asObservable();

  constructor(
    private readonly translateService: TranslateService,
    @Inject(MAT_DATE_LOCALE) private readonly _locale: string,
  ) {}

  public initialise() {
    if (localStorage.getItem(this.LANG_STORAGE_KEY)) {
      this.change(localStorage.getItem(this.LANG_STORAGE_KEY) as Language);
    } else if (navigator.language) {
      // The Navigator provides the language with suffix '-CH'
      this.change(navigator.language.substring(0, 2) as Language);
    } else {
      this.change(this.DEFAULT_LANG);
    }
  }

  public change(language: Language) {
    this.currentLang$$.next(language);
    this.translateService.use(language);
    this.setLocale(language);
    localStorage.setItem(this.LANG_STORAGE_KEY, language);
  }

  public setLocale(language: Language) {
    const locale = langLocaleMapping[language];
    // Change the locale of your Date-Library!
  }
}
