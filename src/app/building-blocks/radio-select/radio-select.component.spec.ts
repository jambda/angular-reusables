import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DsRadioOption, RadioSelectComponent } from './radio-select.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('RadioSelectComponent', () => {
  let component: RadioSelectComponent;
  let fixture: ComponentFixture<RadioSelectComponent>;

  const testOption: DsRadioOption = {
    key: '300',
    translationKey: 'MY_TRANSLATION',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioSelectComponent);
    component = fixture.componentInstance;
    component.options = [testOption];
    fixture.detectChanges();
    spyOn(component.optionSelected, 'emit');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should preselect item on initialization', () => {
    component.preselectKey = testOption.key;

    component.ngOnInit();

    expect(component.selected).toEqual('300');
  });

  describe('preselectItem()', () => {
    it('should select the set preselect item', () => {
      component.preselectKey = testOption.key;

      component.preselectItem();

      expect(component.selected).toEqual('300');
      expect(component.optionSelected.emit).toHaveBeenCalledWith(testOption);
    });

    it('should not select preselection if preselect is not set', () => {
      component.selected = '300';

      component.preselectItem();

      expect(component.selected).toEqual('300');
      expect(component.optionSelected.emit).not.toHaveBeenCalled();
    });
  });

  describe('selectOption()', () => {
    it('should select the provided option if another option is selected', () => {
      component.selected = '1000';

      component.selectOption(testOption.key);

      expect(component.selected).toEqual('300');
      expect(component.optionSelected.emit).toHaveBeenCalledWith(testOption);
    });

    it('should select the provided option if no option is selected yet', () => {
      component.selectOption(testOption.key);

      expect(component.selected).toEqual('300');
      expect(component.optionSelected.emit).toHaveBeenCalledWith(testOption);
    });

    it('should not emit new selection if the provided item was already selected', () => {
      component.selected = '300';
      component.preselectKey = testOption.key;

      component.selectOption(testOption.key);

      expect(component.selected).toEqual('300');
      expect(component.optionSelected.emit).not.toHaveBeenCalled();
    });
  });
});
