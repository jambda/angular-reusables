import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [NgClass, TranslateModule, NgIf, NgFor],
  selector: 'radio-select',
  standalone: true,
  styleUrls: ['./radio-select.component.scss'],
  templateUrl: './radio-select.component.html',
})
export class RadioSelectComponent implements OnInit, OnChanges {
  @Input() group!: string;
  @Input({ required: true }) options!: DsRadioOption[];
  @Input() preselectKey?: string;
  @Input() disabled?: boolean = false;
  @Input() showIcon?: boolean = false;
  @Input() tabNavigationDisabled?: boolean = false;
  @Input() defaultKey?: string;
  @Input() errorTranslationKey?: string;

  @Output() optionSelected = new EventEmitter<DsRadioOption>();

  public selected: string | undefined;

  hasBeenFocusedBefore = false;

  ngOnInit(): void {
    this.setDefaultKeyIfNoneIsProvided();
    this.preselectItem();
  }

  preselectItem(): void {
    if (this.preselectKey) {
      this.selectOptionInternal(this.preselectKey);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['preselect']) {
      this.selectOptionInternal(changes['preselect'].currentValue || null);
    }
  }

  selectOption(key: string): void {
    if (this.disabled) {
      return;
    }

    this.selectOptionInternal(key);
  }

  // This logic is to avoid random focus behavior of radio select group
  showFocusedOption(key: string): void {
    if (this.selected !== undefined && !this.hasBeenFocusedBefore) {
      this.focusElement(this.selected);
    } else if (this.selected === undefined) {
      this.focusElement(key);
    }
  }

  private setDefaultKeyIfNoneIsProvided(): void {
    if (!this.defaultKey && this.options?.length > 0) {
      this.defaultKey = this.options[0].key;
    }
  }

  private selectOptionInternal(key: string | null): void {
    if (key === null) {
      this.resetActualSelection();
    } else if (this.selected !== key) {
      this.updateActualSelection(key);
    }
  }

  private resetActualSelection(): void {
    this.selected = undefined;
    this.hasBeenFocusedBefore = false;
    this.optionSelected.emit(undefined);
  }

  private updateActualSelection(key: string): void {
    this.selected = key;
    const option = this.findRadioOptionWithKey(key);
    this.optionSelected.emit(option);
  }

  private findRadioOptionWithKey(key: string): DsRadioOption {
    return this.options.find((option) => option.key === key) as DsRadioOption;
  }

  private focusElement(value: string): void {
    document.getElementById(this.group + '-' + value)?.focus();
    document.getElementById(this.group + '-' + value)?.click();
    this.hasBeenFocusedBefore = true;
  }
}

export interface DsRadioOption {
  key: string;
  translationKey: string;
}
