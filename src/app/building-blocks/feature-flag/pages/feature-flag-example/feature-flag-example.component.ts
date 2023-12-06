import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeatureFlagDirective} from "../../directives/feature-flag.directive";

@Component({
  selector: 'app-feature-flag-example',
  standalone: true,
  imports: [CommonModule, FeatureFlagDirective],
  templateUrl: './feature-flag-example.component.html',
  styleUrl: './feature-flag-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureFlagExampleComponent {

  newArticle() {
    console.log('new article clicked')
  }

  newSection() {
    console.log('new article clicked')
  }
}
