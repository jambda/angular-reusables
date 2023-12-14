import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RadioSelectComponent } from '../radio-select.component';

@Component({
  selector: 'app-radio-select-page',
  standalone: true,
  imports: [RadioSelectComponent],
  templateUrl: './radio-select-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioSelectPageComponent {}
