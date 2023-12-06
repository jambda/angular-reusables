import {Routes} from '@angular/router';
import {requireFeatureFlag} from "./building-blocks/feature-flag/guards/feature-flag.guard";

export const routes: Routes = [
  {
    path: 'feature-flags',
    loadComponent: () => import('./building-blocks/feature-flag/pages/feature-flag-example/feature-flag-example.component').then((comp) => comp.FeatureFlagExampleComponent),
    canActivate: [requireFeatureFlag('ARTICLE_PAGE')],
  },
  {
    path: '**',
    redirectTo: 'feature-flags'
  }
];
