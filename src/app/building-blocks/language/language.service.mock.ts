import { BehaviorSubject } from 'rxjs';
import {LanguageService} from "./language.service";
import {Language} from "./language.enum";

export const buildLanguageServiceMockProvider = (currentLang$$ = new BehaviorSubject(Language.de)) => {
  return {
    provide: LanguageService,
    useValue: {
      currentLang$$,
      currentLang$: currentLang$$.asObservable(),
      change: (lang: Language) => {
        currentLang$$.next(lang);
      },
    } as unknown as LanguageService,
  };
};

export const languageServiceMockProvider = buildLanguageServiceMockProvider();
