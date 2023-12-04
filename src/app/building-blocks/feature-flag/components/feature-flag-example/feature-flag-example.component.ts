import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-flag-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-flag-example.component.html',
  styleUrl: './feature-flag-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureFlagExampleComponent {

}
