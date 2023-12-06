import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {FeatureFlag} from "../types/feature-flag";
import {Observable, of} from "rxjs";
import {inject} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FeatureFlagService} from "../services/feature-flag.service";

export const requireFeatureFlag = (featureFlag: FeatureFlag): CanActivateFn => (
  _activatedRouteSnapshot: ActivatedRouteSnapshot,
  _routerStateSnapshot: RouterStateSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  if (featureFlag) {
    return inject(FeatureFlagService).isFeatureEnabled(featureFlag).pipe(takeUntilDestroyed());
  }
  inject(Router).createUrlTree(['/']);
  return of(false);
};
