import {Injectable} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {FeatureFlag} from "../types/feature-flag";

const disabledFeatures: readonly FeatureFlag[] = <const>['CREATE_SECTION'];

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {

  private readonly featureFlags$= of(disabledFeatures)

  public getDisabledFeatures(){
    return this.featureFlags$;
  }

  public isFeatureEnabled(feature: FeatureFlag | undefined): Observable<boolean> {
    if (feature === undefined) {
      return of(true);
    }
    return this.getDisabledFeatures().pipe(map((disabledFeatures) => !disabledFeatures.includes(feature)));
  }
}
