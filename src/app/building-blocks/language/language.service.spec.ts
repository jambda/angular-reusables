import { TestBed } from '@angular/core/testing';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './language.enum';
import { langLocaleMapping, LanguageService } from './language.service';

const translateServiceMock = {
  use: () => {},
};

const dateAdapterMock = {
  setLocale: () => {},
};

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: DateAdapter,
          useValue: dateAdapterMock,
        },
      ],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should have default value', (done) => {
    service.currentLang$.subscribe((lang) => {
      expect(lang).toBeTruthy();
      done();
    });
  });

  it('should change language', (done) => {
    const translateServiceSpy = jest.spyOn(translateServiceMock, 'use');
    const dateAdapterSpy = jest.spyOn(dateAdapterMock, 'setLocale');

    service.change(Language.fr);

    expect(translateServiceSpy).toHaveBeenCalledWith(Language.fr);
    expect(dateAdapterSpy).toHaveBeenCalledWith(langLocaleMapping[Language.fr]);
    service.currentLang$.subscribe((lang) => {
      expect(lang).toBe(Language.fr);
      done();
    });
  });
});
